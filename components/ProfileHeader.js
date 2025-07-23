import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileHeader({ username, score, level }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>👤 {username}</Text>
      <Text style={styles.score}>🌱 Score : {score} | {level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems:'center', marginVertical:12, backgroundColor:'#eaffd0', padding:10, borderRadius:12 },
  name: { fontSize:20, fontWeight:'bold', color:'#228B22', marginBottom:2 },
  score: { fontSize:16, color:'#45842c' }
});
