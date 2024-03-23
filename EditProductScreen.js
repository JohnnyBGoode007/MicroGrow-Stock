import React, { useState, useEffect } from 'react';
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
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgQRCode from 'react-native-qrcode-svg';
import logo from './logo.png'; // Caminho para o logo
import background from './background.jpg'; // Caminho para o background

const EditProductScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [imageUrl, setImageUrl] = useState(product.imageUrl);

  const productDetailsForQR = JSON.stringify({ title, description, price, quantity, imageUrl });

  const updateProduct = async () => {
    if (!title || !description || !price || !quantity || !imageUrl) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const updatedProduct = { ...product, title, description, price: parseFloat(price), quantity: parseInt(quantity), imageUrl };
    const storedProducts = await AsyncStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    const productIndex = products.findIndex(p => p.title === product.title);

    if (productIndex !== -1) {
      products[productIndex] = updatedProduct;
      await AsyncStorage.setItem('products', JSON.stringify(products));
      await AsyncStorage.setItem(`qrData_${updatedProduct.title}`, productDetailsForQR);
      Alert.alert('Sucesso', 'Produto atualizado com sucesso.');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Produto não encontrado.');
    }
  };

return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={background} style={styles.imageBackground} resizeMode="cover">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.fullScreen}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.contentContainer}>
              <Image source={logo} style={styles.logo} />
              <SvgQRCode value={productDetailsForQR} size={200} /><View style={{ marginBottom: 20 }}/>
              
              <Image source={{ uri: imageUrl }} style={styles.productImagePreview} />

              <View style={styles.inputGroup}>
                <LabelledInput label="Título:" value={title} onChangeText={setTitle} />
                <LabelledInput label="Descrição:" value={description} onChangeText={setDescription} multiline />
                <LabelledInput label="Preço:" value={price} onChangeText={setPrice} keyboardType="numeric" />
                <LabelledInput label="Quantidade:" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
                <LabelledInput label="URL da imagem:" value={imageUrl} onChangeText={setImageUrl} />
              </View>

              <TouchableOpacity style={styles.button} onPress={updateProduct}>
                <Text style={styles.buttonText}>Atualizar Produto</Text>
              </TouchableOpacity>
               </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Component for labelled input to reduce repetition
const LabelledInput = ({ label, ...props }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.subtitle}>{label}</Text>
    <TextInput style={styles.input} {...props} />
  </View>
);

// Ajuste no estilo para simular o zoom out
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '80%', // Reduzido para simular zoom out
    alignItems: 'center',
    padding: 16, // Ajustado proporcionalmente
   backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  logo: {
    width: 140, // Ajustado proporcionalmente
    height: 70, // Ajustado proporcionalmente
    resizeMode: 'contain',
    marginBottom: 15,
  },
  productImagePreview: {
    width: 140, // Ajustado proporcionalmente
    height: 140, // Ajustado proporcionalmente
    resizeMode: 'contain',
    marginBottom: 15,
  },
  inputGroup: {
    width: '80%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 8,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  subtitle: {
    color: '#FFFFFF',
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 14, // Tamanho da fonte reduzido
  },
  input: {
    width: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#32FF00',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14, // Tamanho da fonte reduzido
    alignContent: 'center',
  },
  button: {
    width: '60%',
    backgroundColor: '#32FF00',
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  buttonText: {
    color: 'black',
    fontSize: 14, // Tamanho da fonte ajustado
},
});

export default EditProductScreen;

