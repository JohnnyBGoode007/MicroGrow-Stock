import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoImg from './logo.png'; // Certifique-se de que o caminho está correto
import backgroundImg from './background.jpg'; // Certifique-se de que o caminho está correto

const QRCodeScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      "QR Code Scaneado",
      "Deseja visualizar os detalhes do produto ou Scanear outro QR Code?",
      [
        { text: "Ver detalhes", onPress: () => navigation.navigate('ProductDetailsScreen', { product: data }) },
        { text: "Scanear novamente", onPress: () => setScanned(false) }
      ]
    );
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.fullScreenBackground} resizeMode="stretch">
      <View style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        {hasPermission === null && <Text style={styles.text}>A pedir permissão para a câmera</Text>}
        {hasPermission === false && <Text style={styles.text}>Sem acesso à câmera</Text>}
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
        {scanned && (
          <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.buttonText}>Escanear Novamente</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductCreationScreen')}>
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductsListScreen')}>
          <Text style={styles.buttonText}>Ver Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VideoPageScreen')}>
          <Text style={styles.buttonText}>Voltar para a página de vídeo</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 380,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  scanner: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    width: '60%',
    backgroundColor: '#32FF00',
    padding: 8,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
  },
  text: {
    color: "#32FF00", // Define a cor padrão do texto para #32FF00
    marginBottom: 10,
  },
});

export default QRCodeScannerScreen;
