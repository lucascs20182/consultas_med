import React, {useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';

import {StyleSheet, Text, View, Image, 
    TouchableWithoutFeedback, StatusBar, TextInput, 
    SafeAreaView, Keyboard, TouchableOpacity, 
    KeyboardAvoidingView, Animated, } from 'react-native';

export default function CriarConta(props) {
    const navigation = props.navigation;

    const [opacity] = useState(new Animated.Value(0));
    useEffect(()=> {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
        }).start();

    }, []);

    const goToList = () => {
        navigation.replace('CriarConta');
      };

    return(
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

            <View style={styles.header}>
                <Text style={styles.headerText}>Insira seus dados</Text>
            </View> 

            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>  
                

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

                <TextInput
                style={styles.input}
                placeholder="Repetir senha"
                autoCorrect={false}
                onChangeText={()=> {}}
                />

                <TouchableOpacity style={styles.btnSubmit}>
                    <Text style={styles.submitText}>Salvar</Text>
                </TouchableOpacity>

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
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        
        paddingHorizontal: 30,
        
    },

    input:{
        //flex: 1,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        width: 300,
        margin: 20,
        color: 'grey',
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        height: 50,
        
    },

    btnSubmit: {
        //flex: 1,
        margin: 20,
        backgroundColor: '#117a6d',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },

    submitText:{
        color: 'white',
        fontSize: 20,

    },


    containerLogo:{
        flex: 1,
        justifyContent: 'center',
    },

    Logo:{
        width: 350,
        height: 350,
        resizeMode: 'contain',
    },


    header:{
        //flex: 1,
        //flexDirection: 'row',
        justifyContent: 'center',
        //marginBottom: 15,
        top: 50,
        
        
    },

    headerText:{
        color: '#117a6d',
        fontWeight: 'bold',
        fontSize: 40,
    },
});