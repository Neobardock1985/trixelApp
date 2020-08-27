import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet } from 'react-native';


let token;
let instance;

export default class Logout extends Component
{

    constructor(props) {
        super(props);

        token = this.props.route.params.token

        instance = this;
    }

    onLogout()
   {
      let url = 'https://trixel-api.herokuapp.com/api/logout/';

      fetch(url,{
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
      
        },
    })
        .then(function(response) {
            if(response.status == 200)
            {
                instance.props.navigation.navigate('Login');
            }
            
        });
  
   }

   render(){
        return (
            <View style={styles.container}>
                <Button
                  title={'CERRAR SESIÓN'}
                  style={styles.input}
                  onPress={this.onLogout.bind(this)}
                />
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
  });
