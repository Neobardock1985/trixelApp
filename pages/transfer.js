import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

let token;
let instance;

export default class Transfer extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            telefono: '',
            monto: ''
          };

        token = this.props.route.params.token

        instance = this;
        
    }

    onTransfer()
    {
       if(this.state.telefono != '' && this.state.monto !='')
       {
           let url = `https://trixel-api.herokuapp.com/api/enviarMonto/${this.state.telefono}/${this.state.monto}`
    
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
                     instance.clearFields();
                     Alert.alert("Información",'El monto ha sido enviado');
                     return response.json();
                   }

               })
               .then(function(myJson) {

                   if(myJson == undefined)
                   {
                     Alert.alert("Error",'El telefono ingresado no esta registrado');
                   }
               });
       }else
       {
         Alert.alert("Error",'Debe diligenciar todo el formulario');
       }
    }


    clearFields()
    {
        this.setState({
            telefono: '',
            monto: ''
        });
    }

    render() {
        return (
          <View style={styles.container}>
                <TextInput
                    value={this.state.telefono}
                    onChangeText={(telefono) => this.setState({ telefono })}
                    placeholder={'Telefono'}
                    style={styles.input}
                />

                <TextInput
                    value={this.state.monto}
                    keyboardType={'numeric'}
                    onChangeText={(monto) => this.setState({ monto })}
                    placeholder={'Monto'}
                    style={styles.input}
                />
                
                <Button
                    title={'ENVIAR'}
                    style={styles.input}
                    onPress={this.onTransfer.bind(this)}
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
    text:
    {
        textAlign: 'center',
        height: 44,
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 25,
    },
  });
