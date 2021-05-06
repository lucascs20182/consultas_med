import * as React from 'react';
import { useState } from 'react';

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
    // Picker,
    //   Toast
} from 'native-base';

import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import store from '../redux/store';
import {ADD_PERSON} from '../redux/actions';

import PacienteRepository from '../repositories/paciente';
import MedicoRepository from '../repositories/medico';
import ConsultaRepository from '../repositories/consulta';

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

    const [paciente, setPaciente] = useState([]);
    const [medico, setMedico] = useState([]);

    const [idPaciente, setIdPaciente] = useState(0);
    const [idMedico, setIdMedico] = useState(0);
    const [dataConsulta, setDataConsulta] = useState('');

    const retrieveData = (Repository, setItem) => {
      const repository = new Repository();
      repository.Retrieve((tx, results) => {
        
        let data = [];
  
        for (let i = 0; i < results.rows.length; i++) {
          data.push(results.rows.item(i));
        }
  
        setItem(data);
      });
    };

    const editConsulta = () => {

      const repository = new ConsultaRepository();
      repository.Edit({idPaciente, idMedico, dataConsulta, id}, () => {
        alert('Editado com Sucesso');
        
        props.navigation.replace('TelaInicial');
      }, (e) => {
        alert('Erro durante a edição');
        console.log(e);
      });
    };
  
    React.useEffect(() => {
      retrieveData(PacienteRepository, setPaciente);
      retrieveData(MedicoRepository, setMedico);
    }, []);

    function listarItens(lista) {
      return (
          lista.map((p, index) => (
              <Picker.Item key={index} label={p.nome} value={p.id}  />
          ))
      )
    }

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
                <Picker selectedValue={paciente} 
                    onValueChange={(item) => setIdPaciente(item)}>
                        {listarItens(paciente)}
                </Picker>

                <Picker selectedValue={medico} 
                    onValueChange={(item) => setIdMedico(item)}>
                        {listarItens(medico)}
                </Picker>
                
                <Item>
                    <Input
                        value={dataConsulta}
                        onChangeText={(text) => setDataConsulta(text)}
                        placeholder={route.params.dataConsulta || "Data da consulta"}
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
            onPress={editConsulta}>
            <Icon type="FontAwesome" name="edit" />
          </Button>
        </View>
      </SafeAreaView>
    </StyleProvider>
  );
}
