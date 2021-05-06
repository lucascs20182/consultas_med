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

  viewEditRemoveButton: {
    flexDirection: 'row'
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

      // console.log(data)
      setItem(data);
    });
  };

  const deletePaciente = (id) => {
    const repository = new PacienteRepository();
    
      repository.Delete({id}, function() {

      retrieveData(PacienteRepository, setPaciente);
    }, function(erro) {
      alert('Erro durante a remoção');
      console.log(erro)
    });
  };

  const deleteMedico = (id) => {
    const repository = new MedicoRepository();
    
      repository.Delete({id}, function() {

      retrieveData(MedicoRepository, setMedico);
    }, function(erro) {
      alert('Erro durante a remoção');
      console.log(erro)
    });
  };

  const deleteConsulta = (id) => {
    const repository = new ConsultaRepository();
    
      repository.Delete({id}, function() {

      retrieveData(ConsultaRepository, setConsulta);
    }, function(erro) {
      alert('Erro durante a remoção');
      console.log(erro)
    });
  };

  const editaPaciente = (paciente) => {
    props.navigation.navigate('EditarForm', paciente);
  };

  const editaMedico = (medico) => {
    props.navigation.navigate('EditarFormMedico', medico);
  };

  const editaConsulta = (consulta) => {
    props.navigation.navigate('EditarFormConsulta', consulta);
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

                  <View style={styles.viewEditRemoveButton}>
                    <Button style={styles.editPaciente} onPress={() => editaPaciente(value)}>
                      <TouchableOpacity>
                        <Text style={{ width: "100%", color: '#000', fontSize: 12 }}>Editar</Text>
                      </TouchableOpacity>
                    </Button>

                    <Button style={styles.delPaciente} onPress={() => deletePaciente(value.id)}>
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
            {medico.map((value, index) => (
              <ListItem key={index}>
                <Body>
                  <Text>{`Médico ${value.id}`}</Text>
                  <Text>{`nome: ${value.nome}`}</Text>
                  <Text>{`sobrenome: ${value.sobrenome}`}</Text>
                  <Text>{`crm: ${value.crm}`}</Text>
                  <Text>{`especialidade: ${value.especialidade}`}</Text>
                </Body>

                <View style={styles.viewEditRemoveButton}>
                  <Button style={styles.editPaciente} onPress={() => editaMedico(value)}>
                    <TouchableOpacity>
                      <Text style={{ width: "100%", color: '#000', fontSize: 12 }}>Editar</Text>
                    </TouchableOpacity>
                  </Button>

                  <Button style={styles.delPaciente} onPress={() => deleteMedico(value.id)}>
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
            {consulta.map((value, index) => (
              <ListItem key={index}>
                <Body>
                {
                    paciente.map((v, i) => {
                      if(v.id == value.idPaciente) {
                        return <Text>{`Paciente: ${v.nome}`}</Text>
                      }
                    })
                  }

                  {
                    medico.map((v, i) => {
                      if(v.id == value.idMedico) {
                        return <Text>{`Médico: ${v.nome}`}</Text>
                      }
                    })
                  }

                  <Text>{`Data da consulta: ${value.dataConsulta}`}</Text>
                </Body>

                <View style={styles.viewEditRemoveButton}>
                  <Button style={styles.editPaciente} onPress={() => editaConsulta(value)}>
                    <TouchableOpacity>
                      <Text style={{ width: "100%", color: '#000', fontSize: 12 }}>Editar</Text>
                    </TouchableOpacity>
                  </Button>

                  <Button style={styles.delPaciente} onPress={() => deleteConsulta(value.id)}>
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
