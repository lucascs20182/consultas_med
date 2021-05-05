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
 
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [crm, setCrm] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  const saveMedico = () => {

    const repository = new MedicoRepository();
    
    //Adicionando nova pessoa
    repository.Save({nome, sobrenome, crm, especialidade}, () => {
      //Informando que o cadastro foi feito com sucesso
      alert('Salvo com Sucesso');

      //Retornando a tela inicial
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
                    placeholder="Nome"
                  />
                </Item>
                <Item>
                  <Input
                    value={sobrenome}
                    onChangeText={(text) => setSobrenome(text)}
                    placeholder="Sobrenome"
                  />
                </Item>
                <Item>
                  <Input
                    value={crm}
                    onChangeText={(text) => setCrm(text)}
                    placeholder="CRM"
                  />
                </Item>
                <Item>
                  <Input
                    value={especialidade}
                    onChangeText={(text) => setEspecialidade(text)}
                    placeholder="Especialidade"
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
            onPress={saveMedico}>
            <Icon type="FontAwesome" name="save" />
          </Button>
        </View>
      </SafeAreaView>
    </StyleProvider>
  );
}
