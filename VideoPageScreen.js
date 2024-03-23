// Importações necessárias
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  Linking, // Import Linking from react-native
} from 'react-native';
import logoImg from './logo.png'; // Verifique o caminho do seu logo

const VideoPageScreen = ({ navigation }) => {
  // Função para abrir o link
  const handlePress = () => {
    Linking.openURL("https://www.youtube.com/embed/dtvuMNVLISo");
  };

  return (
    <ImageBackground
      source={require('./background.jpg')}
      style={styles.fullScreenBackground}
      resizeMode="cover">
      <View style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        {/* TouchableOpacity envolvendo a imagem */}
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('./MicroGreensVideo.png')} // Ajuste o caminho conforme necessário
            style={styles.explicitVideo} // Using explicitVideo for testing
          />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductCreationScreen')}>
            <Text style={styles.buttonText}>Adicionar Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductsListScreen')}>
            <Text style={styles.buttonText}>Ver Produtos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QRCodeScannerScreen')}>
            <Text style={styles.buttonText}>Scanear QR Code</Text>
          </TouchableOpacity>
        </View>
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
    width: 280,
    height: 335,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  explicitVideo: {
    width: 300, // Explicit width for testing
    height: 200, // Explicit height for testing
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
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
});

export default VideoPageScreen;
