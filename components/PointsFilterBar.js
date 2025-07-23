import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function PointsFilterBar({ filters, setFilters }) {
  // filters = { verre:bool, piles:bool, papier:bool, plastique:bool }
  const toggle = key => setFilters(f => ({ ...f, [key]: !f[key] }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtres :</Text>
      {Object.keys(filters).map(key => (
        <View key={key} style={styles.switchContainer}>
          <Text style={{marginRight:4}}>{key.charAt(0).toUpperCase()+key.slice(1)}</Text>
          <Switch
            value={filters[key]}
            onValueChange={() => toggle(key)}
            trackColor={{ false: "#ccc", true: "#b9f43e" }}
            thumbColor={filters[key] ? "#228B22" : "#eee"}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection:'row', alignItems:'center', marginBottom:8, flexWrap:'wrap' },
  label: { fontWeight:'bold', color:'#228B22', marginRight:8 },
  switchContainer: { flexDirection:'row', alignItems:'center', marginHorizontal:6 }
});
