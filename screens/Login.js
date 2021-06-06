import React, {useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';

import {StyleSheet, Text, View, Image, 
    TouchableWithoutFeedback, StatusBar, TextInput, 
    SafeAreaView, Keyboard, TouchableOpacity, 
    KeyboardAvoidingView, Animated, } from 'react-native';

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

export default function Login(props) {
    const navigation = props.navigation;

    const [opacity] = useState(new Animated.Value(0));
    useEffect(()=> {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
        }).start();

    }, []);

    const goToList = () => {
        navigation.replace('Login');
      };
    return (
        <KeyboardAvoidingView style={styles.background}>
            <StatusBar backgroundColor='#14207e' barStyle='light-content'/>

            <View style={styles.containerLogo}>
                <Animated.Image
                style={[
                    styles.Logo,
                     {
                        opacity: opacity,
                     }]}
                source={require('../resources/logo.png')}
                />
            </View>

            <Animatable.View 
            style={styles.container}
            animation = "fadeInUpBig"
            >

            <Animated.Image
                style={
                    styles.coiso
                }
                source={require('../resources/coiso.png')}
            
            />    

            <TextInput
            style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={()=> {}}
            />

            <TextInput
            style={styles.input}
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={()=> {}}
            />

            <TouchableOpacity style={styles.btnSubmit}>
                <Text style={styles.submitText}>Acessar</Text>
            </TouchableOpacity>

            <View style={styles.viewCriarButton}>
                    <Button style={styles.btnRegister} onPress={() => props.navigation.navigate('CriarConta')}>
                      <TouchableOpacity>
                        <Text style={styles.registerText}>Criar conta</Text>
                      </TouchableOpacity>
                    </Button>
            
            </View>


            </Animatable.View>
        </KeyboardAvoidingView>
    );
}
    
const styles = StyleSheet.create({
    background:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#14207e'
    },

    container:{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        
        paddingHorizontal: 30,
        
    },

    input:{
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        width: '90%',
        marginBottom: 15,
        color: 'grey',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        
    },

    btnSubmit: {
        marginBottom: 15,
        backgroundColor: '#117a6d',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },

    submitText:{
        color: 'white',
        fontSize: 18,

    },

    btnRegister:{
        //margin: 14,
        backgroundColor: 'white',
        borderColor: '#117a6d',
        borderWidth: 1,
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,

        //width: 70,
        //height: 38,
        //bottom: 25,
        //tintColor: "#000",
        //backgroundColor: 'rgb(232, 218, 58)',
        resizeMode: 'contain',
        //borderRadius: 20,
        //justifyContent: 'center'
        
    },

    registerText:{
        color: '#117a6d',
        fontSize: 18,
    },

    containerLogo:{
        
        justifyContent: 'center',
    },

    Logo:{
        width: 350,
        height: 350,
        resizeMode: 'contain',
    },

    coiso:{
        width: 80,
        height: 80,
        marginBottom: 25,
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

    viewCriarButton: {
        flexDirection: 'row'
      },

});


