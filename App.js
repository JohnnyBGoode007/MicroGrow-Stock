// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductCreationScreen from './ProductCreationScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import ProductsListScreen from './ProductsListScreen';
import QRCodeScannerScreen from './QRCodeScannerScreen';
import EditProductScreen from './EditProductScreen';
import VideoPageScreen from './VideoPageScreen'; // Certifique-se de importar a nova tela

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VideoPageScreen">
        <Stack.Screen name="VideoPageScreen" component={VideoPageScreen} options={{ title: 'Vídeo' }} />
        <Stack.Screen name="ProductCreationScreen" component={ProductCreationScreen} options={{ title: 'Criar Produto' }} />
        <Stack.Screen name="ProductsListScreen" component={ProductsListScreen} options={{ title: 'Lista de Produtos' }} />
        <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{ title: 'Detalhes do Produto' }} />
        <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{ title: 'Editar Produto' }} />
        <Stack.Screen name="QRCodeScannerScreen" component={QRCodeScannerScreen} options={{ title: 'Escanear QR Code' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
