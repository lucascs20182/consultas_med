import * as React from 'react';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import List from './screens/List';
import Splash from './screens/Splash';
import Form from './screens/Form';
import EditarForm from './screens/EditarForm';
import FormMedico from './screens/FormMedico';
import EditarFormMedico from './screens/EditarFormMedico';
import FormConsulta from './screens/FormConsulta';
import EditarFormConsulta from './screens/EditarFormConsulta';
import TelaInicial from './screens/TelaInicial';
import store from './redux/store';
import Login from './screens/Login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="TelaInicial" component={TelaInicial} />
          <Stack.Screen name="Form" component={Form} />
          <Stack.Screen name="EditarForm" component={EditarForm} />
          <Stack.Screen name="FormMedico" component={FormMedico} />
          <Stack.Screen name="EditarFormMedico" component={EditarFormMedico} />
          <Stack.Screen name="FormConsulta" component={FormConsulta} />
          <Stack.Screen name="EditarFormConsulta" component={EditarFormConsulta} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
