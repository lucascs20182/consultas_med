import * as React from 'react';
import {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image, View} from 'react-native';
import {StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import Custom from '../native-base-theme/variables/custom';
//import FesoLogo from '../resources/feso-logo.png';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  logo: {
    resizeMode: 'center',
  },
});

export default function Splash(props) {
  const navigation = props.navigation;

  const goToList = () => {
    navigation.replace('Login');
  };

  //Use Effect é executado quando o componente é montado
  //Usamos a função setTimeOut para executar outra função
  //após 2000 milisegundos.
  //No caso estamos chamando a função goToList que navega até
  //a tela de lista
  useEffect(() => {
    setTimeout(goToList, 2000);
  });

  return (
    <StyleProvider style={getTheme(Custom)}>
      <SafeAreaView style={styles.safeArea}>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </SafeAreaView>
    </StyleProvider>
  );
}

//<Image style={styles.logo} source={FesoLogo} />
