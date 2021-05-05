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
import PersonRepository from '../repositories/person';
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
  const [people, setPeople] = useState([]);

  const retrieveData = () => {
    const repository = new PersonRepository();
    repository.Retrieve((tx, results) => {
      
      let data = [];

      for (let i = 0; i < results.rows.length; i++) {
        data.push(results.rows.item(i));
      }

      setPeople(data);
    });
  };

  React.useEffect(() => {
    retrieveData();
  }, []);

  return (
    <Container>
      <Header hasTabs />
      <Tabs>
        <Tab heading="Pacientes cadastrados">
            <ScrollView style={styles.scrollView}>
              <List> 
                {people.map((person, index) => (
                  <ListItem key={`person-${index}`}>
                    <Body>
                      <Text>{`Paciente ${person.id}`}</Text>
                      <Text>{`nome: ${person.name}`}</Text>
                      <Text>{`sobrenome: ${person.sobrenome}`}</Text>
                      <Text>{`cpf: ${person.cpf}`}</Text>
                      <Text>{`data de nascimento: ${person.dataNascimento}`}</Text>
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
        <Tab heading="Consultas marcadas">
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
      </Tabs>
      <Footer />
    </Container>
  );
}

export default TelaInicial;
