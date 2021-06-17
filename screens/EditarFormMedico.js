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
import MedicoRepository from '../repositories/medico';
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
  const [id] = useState(route.params.id);
 
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [crm, setCrm] = useState('');

  const editMedico = () => {

    const repository = new MedicoRepository();
    repository.Edit({nome, sobrenome, especialidade, crm, id}, () => {
      alert('Editado com Sucesso');
      
      props.navigation.replace('TelaInicial');
    }, (e) => {
      alert('Erro durante a edição');
      console.log(e);
    });
  };

  const saveMedico = () => {

    const repository = new MedicoRepository();
    
    repository.Save({nome, sobrenome, crm, especialidade}, () => {
      alert('Salvo com Sucesso');

      const navigation = props.navigation;
      navigation.replace('TelaInicial');
    }, (e) => {
      alert('Erro durante salvamento');
    });
  };

  return (
    <StyleProvider style={getTheme(Custom)}>
      <SafeAreaView style={styles.safeArea}>
        <Container style={styles.container}>
          <Header>
            <Body>
              <Title>Cadastro de médico</Title>
            </Body>
          </Header>
          <Content style={styles.content}>
            <ScrollView style={styles.scrollView}>
              <Form>
                <Item>
                  <Input
                    value={nome}
                    onChangeText={(text) => setNome(text)}
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
                    value={crm}
                    onChangeText={(text) => setCrm(text)}
                    placeholder={route.params.crm || "CRM"}
                  />
                </Item>
                <Item>
                  <Input
                    value={especialidade}
                    onChangeText={(text) => setEspecialidade(text)}
                    placeholder={route.params.especialidade || "Especialidade"}
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
            onPress={editMedico}>
            <Icon type="FontAwesome" name="edit" />
          </Button>
        </View>
      </SafeAreaView>
    </StyleProvider>
  );
}
