import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcoScoreBar({ score }) {
  const width = Math.min(score * 8, 200); // Barre max 200px
  let color = '#9be84d';
  if (score >= 25) color = '#ffe100';
  else if (score >= 10) color = '#37ce51';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Éco-score :</Text>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width, backgroundColor:color }]} />
      </View>
      <Text style={styles.score}>{score} pts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems:'center', marginVertical:10 },
  text: { fontSize:15, color:'#228B22' },
  barContainer: { height:18, width:200, backgroundColor:'#e6e6e6', borderRadius:10, marginVertical:6, overflow:'hidden' },
  bar: { height:18, borderRadius:10 },
  score: { fontSize:14, color:'#45842c', marginTop:2 }
});
