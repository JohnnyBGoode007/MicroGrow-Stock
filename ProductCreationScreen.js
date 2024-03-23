import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgQRCode from 'react-native-qrcode-svg';
import logoImg from './logo.png'; // Certifique-se de que o caminho está correto

const ProductCreationScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const saveProduct = async () => {
    if (!title || !description || !price || !quantity || !imageUrl) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const newProduct = { title, description, price, quantity, imageUrl };
    const productDetails = JSON.stringify(newProduct);

    try {
      const storedProducts = await AsyncStorage.getItem('products');
      const products = storedProducts ? JSON.parse(storedProducts) : [];
      products.push(newProduct);
      await AsyncStorage.setItem('products', JSON.stringify(products));
      await AsyncStorage.setItem(`qrData_${newProduct.title}`, productDetails);
      Alert.alert('Sucesso', 'Produto e QR Code adicionados com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao gravar o produto.');
      console.error(error);
    }

    setTitle('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setImageUrl('');
  };

  return (
    <ImageBackground
      source={require('./background.jpg')}
      style={styles.fullScreenBackground}
      resizeMode="cover">
      <ScrollView contentContainerStyle={styles.outerContainer}>
        <Image source={logoImg} style={styles.logo} />
        <SvgQRCode value={JSON.stringify({ title, description, price, quantity, imageUrl })} size={105} style={styles.qrCode} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.textLabel}>Título:</Text>
            <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
            <Text style={styles.textLabel}>Descrição:</Text>
            <TextInput style={styles.input} placeholder="Descrição" value={description} onChangeText={setDescription} multiline />
            <Text style={styles.textLabel}>Preço:</Text>
            <TextInput style={styles.input} placeholder="Preço" value={price} onChangeText={setPrice} keyboardType="numeric" />
            <Text style={styles.textLabel}>Quantidade:</Text>
            <TextInput style={styles.input} placeholder="Quantidade" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
            <Text style={styles.textLabel}>URL da imagem:</Text>
            <TextInput style={styles.input} placeholder="URL da imagem" value={imageUrl} onChangeText={setImageUrl} />
          </View>
          <TouchableOpacity style={styles.button} onPress={saveProduct}><Text style={styles.buttonText}>Guardar Produto</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductsListScreen')}><Text style={styles.buttonText}>Ver Produtos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QRCodeScannerScreen')}><Text style={styles.buttonText}>Scanear QR Code</Text></TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Estilos ajustados para aplicar o zoom out de 70%
  fullScreenBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  outerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Aumentado o espaço vertical
  },
  container: {
    width: '60%', // Reduzindo a largura para 70% do valor original
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 14, // Reduzindo o padding para ajustar ao zoom
    borderRadius: 14, // Ajustando o raio das bordas proporcionalmente
marginBottom: 20, // Espaço abaixo do card ajustado
alignItems: 'center',
},
logo: {
width: 126, // Largura do logo ajustada para 70% do valor original
height: 94.5, // Altura do logo ajustada para 70% do valor original
resizeMode: 'contain',
marginBottom: 10,
},
qrCode: {
marginBottom: 20, // Espaço abaixo do QR Code ajustado
},
input: {
width: '100%', // Mantém a largura relativa ao card
backgroundColor: 'rgba(0, 0, 0, 0.6)', // Mantém a transparência e cor
color: '#32FF00', // Cor do texto dos inputs
marginBottom: 7, // Espaçamento entre inputs reduzido
padding: 14, // Padding ajustado para 70% do valor original
borderRadius: 10.5, // Raio das bordas ajustado
fontSize: 14, // Tamanho da fonte ajustado
},
button: {
width: '60%', // Largura dos botões ajustada para 70% do valor original
backgroundColor: '#32FF00', // Mantém a cor de fundo
padding: 5.6, // Padding ajustado
borderRadius: 10.5, // Raio das bordas ajustado
alignItems: 'center',
justifyContent: 'center',
marginTop: 7, // Espaçamento entre botões ajustado
},
buttonText: {
color: 'black', // Mantém a cor do texto
fontSize: 14, // Tamanho da fonte dos botões ajustado
},
textLabel: {
color: '#FFFFFF', // Mantém a cor branca para as descrições
alignSelf: 'flex-start', // Alinha o texto à esquerda
marginBottom: 5, // Espaço antes dos inputs
fontSize: 14, // Tamanho da fonte das descrições ajustado
},
});

export default ProductCreationScreen;
