import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getUser } from '../utils/storage';

export default function HomeScreen({ navigation, route }) {
  const username = route.params?.username;
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(username).then(setUser);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue, {username} !</Text>
      <Text style={styles.score}>Score : {user?.score ?? 0} | {user?.level ?? ''}</Text>
      <Button title="Scanner un objet" onPress={() => navigation.navigate('Scan', { username })} />
      <Button title="Historique" onPress={() => navigation.navigate('History', { username })} />
      <Button title="Carte" onPress={() => navigation.navigate('Map', { username })} />
      <Button title="Classement" onPress={() => navigation.navigate('Ranking')} />
      <Button title="Déconnexion" onPress={() => navigation.replace('Login')} color="#e74c3c" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#f6ffe5' },
  title: { fontSize:24, fontWeight:'bold', color:'#228B22', marginBottom:30 },
  score: { fontSize:18, marginBottom:30 }
});
