import React, { useState, useEffect, useCallback } from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgQRCode from 'react-native-qrcode-svg';
import { useFocusEffect } from '@react-navigation/native';

import logo from './logo.png';
import background from './background.jpg';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product: initialProduct } = route.params;
  const [product, setProduct] = useState(initialProduct);
  const [qrData, setQrData] = useState('');

  const fetchProductDetails = async () => {
    const storedProducts = await AsyncStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    const updatedProduct = products.find(p => p.title === initialProduct.title);
    if (updatedProduct) {
      setProduct(updatedProduct);
      const storedQrData = await AsyncStorage.getItem(`qrData_${updatedProduct.title}`);
      setQrData(storedQrData);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProductDetails();
    }, [initialProduct.title])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.updated) {
        fetchProductDetails();
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.updated, fetchProductDetails]);

  const deleteProduct = async () => {
    const storedProducts = await AsyncStorage.getItem('products');
    let products = storedProducts ? JSON.parse(storedProducts) : [];
    const filteredProducts = products.filter(p => p.title !== product.title);
    
    await AsyncStorage.setItem('products', JSON.stringify(filteredProducts));
    await AsyncStorage.removeItem(`qrData_${product.title}`);
    
    Alert.alert('Produto Excluído', 'O produto foi excluído com sucesso.');
    navigation.goBack();
  };

  return (
    <ImageBackground source={background} style={styles.imageBackground} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>{product.title}</Text>
          <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
          {qrData ? <SvgQRCode value={qrData} size={200} /> : <Text>No QR code available</Text>}
          <Text style={styles.detail}>Descrição: {product.description}</Text>
          <Text style={styles.detail}>Preço: €{product.price}</Text>
          <Text style={styles.detail}>Quantidade em stock: {product.quantity}</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProductScreen', { product })}>
            <Text style={styles.buttonText}>Editar Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteProduct}>
            <Text style={styles.buttonText}>Apagar Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Voltar à Lista de Produtos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};



const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  logo: {
    width: 250, // Reduzido para ser mais compacto
    height: 112.5, // Mantendo a proporção do logo
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productImage: {
    width: '80%', // Reduzido para ser mais compacto
    height: 160, // Ajustado proporcionalmente
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 20, // Ligeiramente menor
    fontWeight: 'bold',
    marginBottom: 10, // Espaçamento reduzido
    color: '#00FF00',
  },
  detail: {
    fontSize: 16, // Ligeiramente menor
    marginVertical: 4, // Espaçamento reduzido
    color: '#00FF00',
  },
  button: {
    width: '55%', // Largura reduzida para os botões serem menores
    backgroundColor: '#32FF00',
    padding: 8, // Padding reduzido
    borderRadius: 15, // Bordas arredondadas, mas menores
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, // Menor espaço entre os botões
  },
  buttonText: {
    color: 'black',
    fontSize: 12, // Ligeiramente menor
  },
  deleteButton: {
    backgroundColor: '#32FF00', // Cor de destaque para ação de deletar
  },
  backButton: {
    backgroundColor: '#32FF00', // Cor de destaque para ação de voltar
  },
    text: {
    color: "#32FF00", // Define a cor padrão do texto para #32FF00
    marginBottom: 10,
  },
});


export default ProductDetailsScreen;