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
  List,
  ListItem,
  Text,
  Title,
  Left
} from 'native-base';

import store from '../redux/store';
import {SafeAreaView, StyleSheet, ScrollView, View,   Image} from 'react-native';
import PersonRepository from '../repositories/person';
import {useState} from 'react';

const styles = StyleSheet.create({
  
});

export default function Lista(props) {
  const [people, setPeople] = useState([]);

  const retrieveData = () => {
    const repository = new PersonRepository();
    repository.Retrieve((tx, results) => {
      
      let data = [];

      for (let i = 0; i < results.rows.length; i++) {
        data.push(results.rows.item(i));
      }

      // accordion?
      // console.log(data); //array de objetos

      setPeople(data);
    });
  };

  React.useEffect(() => {
    retrieveData();
  }, []);

  return (
      <Content style={styles.safeArea}>
        <StyleProvider style={getTheme(Custom)}>
      {/* <SafeAreaView style={styles.safeArea}> */}
        <Container style={styles.container}>
          <Content style={styles.content}>
            <ScrollView style={styles.scrollView}>
              <List>
                {people.map((person, index) => (
                  <ListItem key={`person-${index}`}>
                    <Body>
                      <Text>{person.name}</Text>
                    </Body>
                  </ListItem>
                ))}
              </List>
            </ScrollView>
          </Content>
        </Container>

        <View
          style={{
            position: 'absolute',
            bottom: 150,
            right: 25,
          }}>
          <Button
            rounded
            dark
            style={{
              height: 50,
              width: 50,
            }}
            onPress={() => {             
              const navigation = props.navigation;
              navigation.navigate('Form');

            }}>
            <Icon type="FontAwesome" name="plus" />
          </Button>
        </View>
        {/* </SafeAreaView> */}
        </StyleProvider>
      </Content>
  );
}
