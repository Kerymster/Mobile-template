import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
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
      setLoginToken(data.token);
      await AsyncStorage.setItem('loginToken', data.token);

      router.push('/(auth)/profiles'); // navigate to Profile Selection
    } catch (err) {
      Alert.alert('Login failed', 'Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title='Login' onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
});
