import React, { Component } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

let token;
let username;
let balance;

export default class Balance extends Component
{
    constructor(props) {
        super(props);

        token = this.props.route.params.token
        username = this.props.route.params.username
        balance = this.props.route.params.balance
    }

    goToTranfer()
    {
      this.props.navigation.navigate('Transferir',{ token: token});
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{username} tu saldo actual es: {balance}</Text>
                <Button
                  title={'DILIGENCIAR ENVÍO'}
                  style={styles.input}
                  onPress={this.goToTranfer.bind(this)}
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
    text:{
        textAlign: 'center',
        height: 44,
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 25,
    },
});
