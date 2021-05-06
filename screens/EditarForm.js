import * as React from 'react';
import getTheme from '../native-base-theme/components';
import Custom from '../native-base-theme/variables/custom';
import {
  Container,
  Content,
  Body,
  StyleProvider,
  Icon,
  Button,
  Header,
  Form,
  Item,
  Input,
  Title,
  Toast
} from 'native-base';

import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import PacienteRepository from '../repositories/paciente';
import store from '../redux/store';
import {ADD_PERSON} from '../redux/actions';
import {useState} from 'react';
import { useRoute } from '@react-navigation/native';


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
  },
});

export default function Lista(props) {
  const route = useRoute();
 
  const [nome, setName] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [id, setId] = useState(route.params.id);
  
  const editPaciente = () => {

    const repository = new PacienteRepository();
    
    repository.Edit({nome, sobrenome, cpf, dataNascimento, id}, () => {
      alert('Editado com Sucesso');
      
      props.navigation.replace('TelaInicial');
    }, (e) => {
      alert('Erro durante a edição');
      console.log(e);
    });
  };

  return (
    <StyleProvider style={getTheme(Custom)}>
      <SafeAreaView style={styles.safeArea}>
        <Container style={styles.container}>
          <Header>
            <Body>
              <Title>Edição de paciente</Title>
            </Body>
          </Header>
          <Content style={styles.content}>
            <ScrollView style={styles.scrollView}>
              <Form>
                <Item>
                  <Input
                    value={nome}
                    onChangeText={(text) => setName(text)}
                    placeholder={route.params.nome || "Nome"}
                  />
                </Item>
                <Item>
                  <Input
                    value={sobrenome}
                    onChangeText={(text) => setSobrenome(text)}
                    placeholder={route.params.sobrenome || "Sobrenome"}
                  />
                </Item>
                <Item>
                  <Input
                    value={cpf}
                    onChangeText={(text) => setCpf(text)}
                    placeholder={route.params.cpf || "CPF"}
                  />
                </Item>
                <Item>
                  <Input
                    value={dataNascimento}
                    onChangeText={(text) => setDataNascimento(text)}
                    placeholder={route.params.dataNascimento || "Data de nascimento"}
                  />
                </Item>
              </Form>
            </ScrollView>
          </Content>
        </Container>

        <View
          style={{
            position: 'absolute',
            bottom: 25,
            right: 25,
          }}>
          <Button
            rounded
            dark
            style={{
              height: 50,
              width: 50,
            }}
            onPress={editPaciente}>
            <Icon type="FontAwesome" name="edit" />
          </Button>
        </View>
      </SafeAreaView>
    </StyleProvider>
  );
}
