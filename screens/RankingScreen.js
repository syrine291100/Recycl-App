import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getRanking } from '../utils/storage';

export default function RankingScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getRanking().then(setUsers);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📊 Classement</Text>
      {users.length === 0 ? (
        <Text style={styles.empty}>Aucun utilisateur pour le moment.</Text>
      ) : (
        users.map((u, i) => (
          <Text key={i} style={styles.line}>
            {i+1}. {u.username} — {u.score} pts — {u.level}
          </Text>
        ))
      )}
      <Text style={{margin:16}} onPress={() => navigation.goBack()}>Retour</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flexGrow:1, alignItems:'center', backgroundColor:'#f6ffe5', padding:22 },
  title: { fontSize:22, fontWeight:'bold', marginBottom:18, color:'#228B22' },
  empty: { color:'#999', fontStyle:'italic', marginTop:50 },
  line: { fontSize:16, marginBottom:6 }
});
