import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message || "Aucune donnée à afficher."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin:32, alignItems:'center' },
  text: { color:'#aaa', fontStyle:'italic', fontSize:16 }
});
