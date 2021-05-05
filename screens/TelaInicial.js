import React from 'react';
import { Container, Header, Footer, Text, Tab, Tabs } from 'native-base';

// import getTheme from '../native-base-theme/components';
// import Custom from '../native-base-theme/variables/custom';
import {
  Content,
  Body,
  StyleProvider,
  Icon,
  Button,
  List,
  ListItem,
  Title,
  Left
} from 'native-base';

// import store from '../redux/store';
import {SafeAreaView, StyleSheet, ScrollView, View, Image} from 'react-native';
import PacienteRepository from '../repositories/paciente';
import MedicoRepository from '../repositories/medico';
import ConsultaRepository from '../repositories/consulta';
import {useState} from 'react';

const styles = StyleSheet.create({
  viewAddButton: {
    position: 'absolute',
    bottom: 25,
    right: 25
  },
  
  addButton: {
    height: 50,
    width: 50
  },
});

// import List from '../screens/List';

const TelaInicial = (props) => {
  const [paciente, setPaciente] = useState([]);
  const [medico, setMedico] = useState([]);
  const [consulta, setConsulta] = useState([]);

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

  React.useEffect(() => {
    retrieveData(PacienteRepository, setPaciente);
    retrieveData(MedicoRepository, setMedico);
    retrieveData(ConsultaRepository, setConsulta);
  }, []);

  return (
    <Container>
      <Header hasTabs />
      <Tabs>
        <Tab heading="Pacientes cadastrados">
            <ScrollView style={styles.scrollView}>
              <List> 
                {paciente.map((paciente, index) => (
                  <ListItem key={index}>
                    <Body>
                      <Text>{`Paciente ${paciente.id}`}</Text>
                      <Text>{`nome: ${paciente.nome}`}</Text>
                      <Text>{`sobrenome: ${paciente.sobrenome}`}</Text>
                      <Text>{`cpf: ${paciente.cpf}`}</Text>
                      <Text>{`data de nascimento: ${paciente.dataNascimento}`}</Text>
                    </Body>
                  </ListItem>
                ))}
              </List>
            </ScrollView>

            <View
              style={styles.viewAddButton}>
              <Button
                rounded
                dark
                style={styles.addButton}
                onPress={() => {             
                  props.navigation.navigate('Form');

                }}>
                <Icon type="FontAwesome" name="plus" />
              </Button>
            </View>
        </Tab>
        <Tab heading="Médicos/Funcionários">
            <List> 
              {medico.map((medico, index) => (
                <ListItem key={index}>
                  <Body>
                    <Text>{`Médico ${medico.id}`}</Text>
                    <Text>{`nome: ${medico.nome}`}</Text>
                    <Text>{`sobrenome: ${medico.sobrenome}`}</Text>
                    <Text>{`crm: ${medico.crm}`}</Text>
                    <Text>{`especialidade: ${medico.especialidade}`}</Text>
                  </Body>
                </ListItem>
              ))}
            </List>

            <View
              style={styles.viewAddButton}>
              <Button
                rounded
                dark
                style={styles.addButton}
                onPress={() => {             
                  props.navigation.navigate('FormMedico');

                }}>
                <Icon type="FontAwesome" name="plus" />
              </Button>
            </View>
        </Tab>
        <Tab heading="Consultas marcadas">
            <List> 
              {consulta.map((consulta, index) => (
                <ListItem key={index}>
                  <Body>
                    <Text>{`Paciente: ${consulta.paciente_nome}`}</Text>
                    <Text>{`Médico ${consulta.medico_id}`}</Text>
                    <Text>{`Data da consulta: ${consulta.dataConsulta}`}</Text>
                  </Body>
                </ListItem>
              ))}
            </List>

            <View
              style={styles.viewAddButton}>
              <Button
                rounded
                dark
                style={styles.addButton}
                onPress={() => {             
                  props.navigation.navigate('FormConsulta');

                }}>
                <Icon type="FontAwesome" name="plus" />
              </Button>
            </View>
        </Tab>
      </Tabs>
      <Footer />
    </Container>
  );
}

export default TelaInicial;
