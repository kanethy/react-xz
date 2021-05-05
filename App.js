// In App.js in a new project
​
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "./screen/LoginScreen";
import MainScreen from "./screen/MainScreen";
import ProductsScreen from "ProductsScreen.js";
import DetailScreen from "DetailScreen.js";

​
const Stack = createStackNavigator();
​
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
​
export default App;