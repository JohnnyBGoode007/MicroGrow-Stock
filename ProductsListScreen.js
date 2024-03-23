import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const ProductsListScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  const fetchProducts = async () => {
    const storedProducts = await AsyncStorage.getItem('products');
    const productsList = storedProducts ? JSON.parse(storedProducts) : [];
    const productsWithQr = await Promise.all(productsList.map(async (product) => {
      const qrData = await AsyncStorage.getItem(`qrData_${product.title}`);
      return { ...product, qrData };
    }));
    setProducts(productsWithQr);
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  return (
    <ImageBackground source={require('./background.jpg')} style={styles.imageBackground} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('./logo.png')} style={styles.logo} />
        {products.map((product, index) => (
          <TouchableOpacity key={index} style={styles.productItem} onPress={() => navigation.navigate('ProductDetailsScreen', { product })}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{product.title}</Text>
              {product.qrData && (
                <Image source={{ uri: `data:image/png;base64,${product.qrData}` }} style={styles.qrCode} />
              )}
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.addButton]} onPress={() => navigation.navigate('ProductCreationScreen')}>
            <Text style={styles.buttonText}>Adicionar Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.scanButton]} onPress={() => navigation.navigate('QRCodeScannerScreen')}>
            <Text style={styles.buttonText}>Scanear QR Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.videoPageButton]} onPress={() => navigation.navigate('VideoPageScreen')}>
            <Text style={styles.buttonText}>Página de Vídeo</Text>
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
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    alignContent: 'center',
  },
  logo: {
    width: windowWidth - 40,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    marginVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FF00',
    textDecorationLine: 'underline',
    flex: 1,
  },
  qrCode: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '60%',
    backgroundColor: '#32FF00',
    marginBottom: 10,
  },
  addButton: {},
  scanButton: {},
  videoPageButton: {}, // Estilo adicional caso necessário
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ProductsListScreen;
