import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';

let instance;

export default class Login extends Component
{
    constructor(props) {
        super(props);
        
        this.state = {
          username: '',
          password: '',
        };

        instance = this;
      }
      
    async onLogin() {
      const { username, password } = this.state;

      let redirect = false;

      if(this.state.username != '' && this.state.password !='')
      {
        let url = 'https://trixel-api.herokuapp.com/api/login/';
      
        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
  
            body: JSON.stringify({
                username: username,
                password: password
            })
            
        }).then(function(response) {
            if(response.status == 200)
            {
              instance.clearFields();
              redirect = true
              return response.json();
            }else
            {
              Alert.alert("Error",'Verifique sus credenciales');
            }
          })
          .then(function(myJson) {

             if(redirect)
             {
               instance.props.navigation.navigate('Balance',{ token: myJson.token, username: myJson.user.username, balance: myJson.user.profile.balance });
             }
          })

      }else
      {
        Alert.alert("Error",'Debe diligenciar todo el formulario');
      }

      
      
    }

    onPressText()
    {
      instance.props.navigation.navigate('Registro');
    }

    clearFields()
    {
        this.setState({
          username: '',
          password: ''
        });
    }

    render() {
        return (
          <View style={styles.container}>
            <TextInput
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              placeholder={'Usuario'}
              style={styles.input}
            />
            
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder={'Contraseña'}
              secureTextEntry={true}
              style={styles.input}
            />
            
            <Button
              title={'INICIA SESIÓN'}
              style={styles.input}
              onPress={this.onLogin.bind(this)}
            />

             <Text style={styles.text} onPress={this.onPressText}>Tap para ir al registro de cuenta</Text>
          </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    text:
    {
        textAlign: 'center',
        height: 44,
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 25,
    },
  });