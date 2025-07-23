import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChangeText, onSearch, placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || "Rechercher..."}
      />
      <Button title="Chercher" onPress={onSearch} color="#228B22" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection:'row', alignItems:'center', marginVertical:10 },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:7, padding:10, flex:1, marginRight:12 }
});
