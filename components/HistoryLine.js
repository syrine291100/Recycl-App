import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HistoryLine({ date, input, result }) {
  return (
    <View style={styles.container}>
      <Text style={styles.input}>{input}</Text>
      <Text style={styles.result}>{result}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding:8, marginVertical:3, backgroundColor:'#f1ffe7', borderRadius:8, width:'95%' },
  input: { fontWeight:'bold', fontSize:15, color:'#228B22' },
  result: { color:'#666', marginTop:2 },
  date: { fontSize:12, color:'#aaa', marginTop:2 }
});
