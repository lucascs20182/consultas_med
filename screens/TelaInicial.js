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
import { SafeAreaView, StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import PacienteRepository from '../repositories/paciente';
import MedicoRepository from '../repositories/medico';
import ConsultaRepository from '../repositories/consulta';
import { useState } from 'react';

const styles = StyleSheet.create({
  viewAddButton: {
    position: 'absolute',
    bottom: 25,
    right: 20
  },

  addButton: {
    height: 50,
    width: 50
  },

  editPaciente: {
    width: 70,
    height: 38,
    bottom: 25,
    tintColor: "#000",
    backgroundColor: 'rgb(232, 218, 58)',
    resizeMode: 'contain',
    borderRadius: 20,
    justifyContent: 'center'
  },
  delPaciente: {
    width: 70,
    height: 38,
    bottom: 25,
    left: 10,
    resizeMode: 'contain',
    backgroundColor: 'rgb(245, 105, 105)',
    borderRadius: 20,
    justifyContent: 'center',
    // marginTop: 20
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

  const deleteData = (id) => {
    const repository = new PacienteRepository();

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaainiciando delete")
    
      repository.Delete({id}, function() {
      console.log("depois delete")

      retrieveData(PacienteRepository, setPaciente);
      // console.log(paciente)

      // setPaciente(paciente)
      // alert('deletado com Sucesso');

    }, function(erro) {
      // alert('Erro durante a remoção');
      console.log(erro)
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
              {paciente.map((value, index) => (
                <ListItem key={index}>
                  <Body>
                    <Text>{`Paciente ${value.id}`}</Text>
                    <Text>{`nome: ${value.nome}`}</Text>
                    <Text>{`sobrenome: ${value.sobrenome}`}</Text>
                    <Text>{`cpf: ${value.cpf}`}</Text>
                    <Text>{`data de nascimento: ${value.dataNascimento}`}</Text>
                  </Body>

                  <View style={{flexDirection: 'row'}}>
                    <Button style={styles.editPaciente} >
                      <TouchableOpacity>
                        <Text style={{ width: "100%", color: '#000', fontSize: 12 }}>Editar</Text>
                      </TouchableOpacity>
                    </Button>

                    <Button style={styles.delPaciente} onPress={() => deleteData(value.id)}>
                      <TouchableOpacity>
                        <Text style={{ width: "100%", color: 'white', fontSize: 12 }}>Excluir</Text>
                      </TouchableOpacity>
                    </Button>
                  </View>
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

                <View>
                  <Button style={styles.editPaciente}>
                    <TouchableOpacity>
                      <Text style={{ width: "100%", color: '#000', fontSize: 12 }}>Editar</Text>
                    </TouchableOpacity>
                  </Button>

                  <Button style={styles.delPaciente}>
                    <TouchableOpacity>
                      <Text style={{ width: "100%", color: 'white', fontSize: 12 }}>Excluir</Text>
                    </TouchableOpacity>
                  </Button>
                </View>
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
            {consulta.map((valor, index) => (
              <ListItem key={index}>
                <Body>
                  <Text>{`Paciente: ${valor.idPaciente}`}</Text>
                  <Text>{`Médico ${valor.idMedico}`}</Text>
                  <Text>{`Data da consulta: ${valor.dataConsulta}`}</Text>
                </Body>

                <View>
                  <Button style={styles.editPaciente}>
                    <TouchableOpacity>
                      <Text style={{ width: "100%", color: '#000', fontSize: 12 }}>Editar</Text>
                    </TouchableOpacity>
                  </Button>

                  <Button style={styles.delPaciente}>
                    <TouchableOpacity>
                      <Text style={{ width: "100%", color: 'white', fontSize: 12 }}>Excluir</Text>
                    </TouchableOpacity>
                  </Button>
                </View>
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
