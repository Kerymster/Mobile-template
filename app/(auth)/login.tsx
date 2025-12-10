import AsyncStorage from '@react-native-async-storage/async-storage';
import { RelativePathString, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ROUTES } from '~/constants/routes';
import Logo from '../../assets/icons/logo.svg';
import VisibilityOffIcon from '../../assets/icons/visibility-off.svg';
import VisibilityOnIcon from '../../assets/icons/visibility-on.svg';
import { login } from '../../src/api/auth';
import { AuthContext } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const { setLoginToken } = useContext(AuthContext);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      setLoginToken(data.access_token);
      await AsyncStorage.setItem('loginToken', data.access_token);

      router.push(ROUTES.PROFILES as RelativePathString);
    } catch {
      Alert.alert('Login failed', 'Please check your credentials.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.container}
      resizeMode='cover'
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Logo width={200} height={82} fill='#fff' color='#fff' />
        </View>

        <Text style={styles.heading}>TekŞifre ile Giriş</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Cep Telefonu Numarası'
            placeholderTextColor='#999'
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Şifre'
            placeholderTextColor='#999'
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <VisibilityOnIcon width={24} height={24} />
            ) : (
              <VisibilityOffIcon width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            (!username || !password) && styles.primaryButtonDisabled,
          ]}
          onPress={handleLogin}
          disabled={!username || !password}
        >
          <Text
            style={[
              styles.primaryButtonText,
              (!username || !password) && styles.primaryButtonTextDisabled,
            ]}
          >
            Devam Et
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Şifremi Değiştir</Text>
        </TouchableOpacity>

        <Text style={styles.signUpPrompt}>Henüz Tivibu üyeliğiniz yok mu?</Text>

        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Üye Ol</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#fff',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 30,
    marginBottom: 50,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonTextDisabled: {
    color: '#999',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  secondaryButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpPrompt: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  signUpButton: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
