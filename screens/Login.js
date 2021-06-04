import React, {useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';

import {StyleSheet, Text, View, Image, 
    TouchableWithoutFeedback, StatusBar, TextInput, 
    SafeAreaView, Keyboard, TouchableOpacity, 
    KeyboardAvoidingView, Animated, } from 'react-native';

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
                    styles.dedo
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

            <TouchableOpacity style={styles.btnRegister}>
                <Text style={styles.registerText}>Criar conta</Text>
            </TouchableOpacity>
            

            </Animatable.View>
        </KeyboardAvoidingView>
    );
}
    
const styles = StyleSheet.create({
    background:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#324291'
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
        marginTop: 10,
        
    },

    registerText:{
        color: 'black',
    },

    containerLogo:{
        
        justifyContent: 'center',
    },

    Logo:{
        width: 350,
        height: 350,
        resizeMode: 'contain',
    },

    dedo:{
        width: 80,
        height: 80,
        //position: 'absolute',
        marginBottom: 30,
        //flexDirection: "column",
        //justifyContent: "center",
        //alignItems: "center",
    },
});


