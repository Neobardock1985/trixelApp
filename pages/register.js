import React, { Component } from 'react';
import { Alert, Button, TextInput, Picker, View, StyleSheet } from 'react-native';

let instance;

export default class Register extends Component
{
    constructor(props) {
        super(props);
        
        this.state = {
          username: '',
          password: '',
          documento: '',
          tipo: "CC",
          telefono: '',
          codigo: '',
          balance: '100.00'
        };

        instance = this;
      }
      
    async onRegister() {
      const { username, password, documento, tipo, telefono, codigo, balance  } = this.state;

      if(username != '' && password !='' && documento !='' && telefono !='' && codigo !='' )
      {
        let url = 'https://trixel-api.herokuapp.com/api/crear-usuario/';
  
        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
  
            body: JSON.stringify({
                username: username,
                password: password,
                profile: {
                    documento: documento,
                    tipo: tipo,
                    telefono: telefono,
                    codigo: codigo,
                    balance: balance
                }
            })
            
        }).then(function(response) {
            if(response.status == 201)
            {
              instance.clearFields();
              Alert.alert("Registro",'El usuario ha sido registrado');
              return response.json();
            }
  
          })

      }else
      {
        Alert.alert("Error",'Debe diligenciar todo el formulario');
      }


    }


    clearFields()
    {
        this.setState({
            username: '',
            password: '',
            documento: '',
            tipo: "CC",
            telefono: '',
            codigo: '',
            balance: '100.00'
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

            <TextInput
              value={this.state.documento}
              onChangeText={(documento) => this.setState({ documento })}
              placeholder={'Documento'}
              style={styles.input}
            />

            <Picker
              selectedValue={this.state.tipo}
              onValueChange={tipo => this.setState({ tipo })}
              style={{ width: 220 }}
              mode="dropdown">
              <Picker.Item label="Cédula de ciudadanía" value="CC" />
              <Picker.Item label="Cédula de extranjería" value="CE" />
              <Picker.Item label="Pasaporte" value="PA" />
           </Picker>

            <TextInput
              value={this.state.telefono}
              onChangeText={(telefono) => this.setState({ telefono })}
              placeholder={'Telefono'}
              style={styles.input}
            />

            <TextInput
              value={this.state.codigo}
              onChangeText={(codigo) => this.setState({ codigo })}
              placeholder={'Codigo del país'}
              style={styles.input}
            />

            <TextInput
              value={this.state.balance}
              keyboardType={'numeric'}
              onChangeText={(balance) => this.setState({ balance })}
              placeholder={'Balance'}
              style={styles.input}
            />

            <Button
              title={'GUARDAR'}
              style={styles.input}
              onPress={this.onRegister.bind(this)}
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
