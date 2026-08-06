import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { addUser, checkUser } from '../util/storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!username.trim()) return 'Saisis un nom d’utilisateur.';
    if (password.length < 4) return 'Le mot de passe doit contenir au moins 4 caractères.';
    return '';
  };

  const handleLogin = async () => {
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError('');
    try {
      const user = await checkUser(username, password);
      if (!user) return setError('Nom d’utilisateur ou mot de passe incorrect.');
      navigation.replace('Home', { username: user.username });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError('');
    try {
      const user = await addUser(username, password);
      navigation.replace('Home', { username: user.username });
    } catch (err) {
      setError(
        err.message === 'USERNAME_EXISTS'
          ? 'Ce nom d’utilisateur existe déjà.'
          : 'Impossible de créer le compte.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>♻️</Text>
      <Text style={styles.title}>Recycl’App</Text>
      <Text style={styles.subtitle}>Apprendre à mieux trier, un objet à la fois.</Text>

      <TextInput
        autoCapitalize="none"
        placeholder="Nom d’utilisateur"
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="Mot de passe"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Pressable style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
        <Text style={styles.primaryButtonText}>{loading ? 'Patiente…' : 'Se connecter'}</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={handleSignup} disabled={loading}>
        <Text style={styles.secondaryButtonText}>Créer un compte</Text>
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.notice}>Démo locale : les comptes restent uniquement sur l’appareil.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 28, backgroundColor: '#F4F8F2' },
  logo: { fontSize: 54, textAlign: 'center' },
  title: { fontSize: 32, textAlign: 'center', color: '#166534', fontWeight: '800', marginTop: 8 },
  subtitle: { textAlign: 'center', color: '#4B5563', marginTop: 8, marginBottom: 28 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', padding: 14, marginBottom: 12, borderRadius: 12 },
  primaryButton: { backgroundColor: '#15803D', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 4 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
  secondaryButton: { borderWidth: 1, borderColor: '#15803D', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  secondaryButtonText: { color: '#166534', fontWeight: '700' },
  error: { color: '#B91C1C', textAlign: 'center', marginTop: 14 },
  notice: { color: '#6B7280', textAlign: 'center', fontSize: 12, marginTop: 18 },
});
