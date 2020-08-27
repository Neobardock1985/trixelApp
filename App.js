import React from 'react';
import { StyleSheet } from 'react-native';

//react-navigation 5
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

//'react-navigation-header-buttons'
import {
  HeaderButtons,
  HeaderButton,
  Item,

} from 'react-navigation-header-buttons';

import Icon from 'react-native-vector-icons/Ionicons';


//importando pantallas. 
import Login from './pages/login';
import Register from './pages/register';
import Balance from './pages/balance';
import Transfer from './pages/transfer';
import Logout from './pages/logout';



const IoniconsHeaderButton = (props) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton {...props} IconComponent={Icon} iconSize={23} color="white" />
);
 


const Stack = createStackNavigator();


function StackScreen() {
  return (
    <Stack.Navigator       
     initialRouteName="Login"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: "#2196F3" }
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="Registro" component={Register} />
      <Stack.Screen name="Balance" component={Balance}  options={({ navigation, route }) => ({
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                <Item  title="search" iconName="ios-log-out"  onPress={() => navigation.navigate('Logout',{token: route.params.token})} /> 
              </HeaderButtons>
            ),
        })/*,{headerLeft: null}*/ } />
      <Stack.Screen name="Transferir" component={Transfer} />
    </Stack.Navigator>
  );
}


export default function App() {

  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
