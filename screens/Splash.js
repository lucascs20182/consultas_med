import * as React from 'react';
import {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image, View} from 'react-native';
import {StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import Custom from '../native-base-theme/variables/custom';

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

