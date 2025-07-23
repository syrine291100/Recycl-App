import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addUser, checkUser } from '../utils/storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const user = await checkUser(username, password);
    if (user) navigation.replace('Home', { username });
    else setError('Nom d’utilisateur ou mot de passe incorrect');
  };

  const handleSignup = async () => {
    const user = await checkUser(username, password);
    if (user) setError('Ce nom existe déjà');
    else {
      await addUser(username, password);
      navigation.replace('Home', { username });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>♻️ Recycl’App</Text>
      <TextInput placeholder="Nom d'utilisateur" style={styles.input} onChangeText={setUsername} value={username} />
      <TextInput placeholder="Mot de passe" style={styles.input} secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Connexion" onPress={handleLogin} />
      <Button title="Créer un compte" onPress={handleSignup} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#f6ffe5' },
  title: { fontSize:26, marginBottom:24, color:'#228B22', fontWeight:'bold' },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, marginVertical:8, width:220, borderRadius:8 },
  error: { color:'red', marginTop:10 }
});
