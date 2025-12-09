import AsyncStorage from '@react-native-async-storage/async-storage';
import { RelativePathString, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { ROUTES } from '~/constants/routes';
import Logo from '../../assets/icons/logo.svg';
import { login } from '../../src/api/auth';
import { AuthContext } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const { setLoginToken } = useContext(AuthContext);
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={200} height={82} fill='#fff' color='#fff' />
      </View>
      <TextInput
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button
        title='Login'
        onPress={handleLogin}
        disabled={!username || !password}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
});
