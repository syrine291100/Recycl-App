import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { getUser, updateUserScore } from '../utils/storage';
import triRules from '../data/tri_rules.json';
import { fetchProductByBarcode } from '../utils/api';

export default function ScanScreen({ navigation, route }) {
  const username = route.params?.username;
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    // Code-barres numérique ?
    if (/^\d+$/.test(input.trim())) {
      const product = await fetchProductByBarcode(input.trim());
      if (product && product.packaging_materials) {
        const mat = Array.isArray(product.packaging_materials) ? product.packaging_materials[0] : product.packaging_materials;
        const rule = triRules.find(r => r.materiau.toLowerCase() === mat.toLowerCase());
        if (rule) {
          setResult(`${mat} → ${rule.consigne}`);
          await updateUserScore(username, 1);
        } else {
          setResult(`Matériau inconnu dans la base`);
        }
      } else {
        setResult('Produit non trouvé ou matériau inconnu');
      }
    } else {
      // Recherche objet/matériau localement
      const rule = triRules.find(
        r =>
          r.objet.toLowerCase() === input.trim().toLowerCase() ||
          r.materiau.toLowerCase() === input.trim().toLowerCase()
      );
      if (rule) {
        setResult(`${rule.objet} (${rule.materiau}) → ${rule.consigne}`);
        await updateUserScore(username, 1);
      } else {
        setResult('Objet ou matériau inconnu');
      }
    }
    setUser(await getUser(username));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔎 Scanner / Rechercher</Text>
      <TextInput placeholder="Code-barres, objet ou matériau" style={styles.input} onChangeText={setInput} value={input} />
      <Button title="Chercher" onPress={handleSearch} />
      {result ? <Text style={styles.result}>{result}</Text> : null}
      <Button title="Retour" onPress={() => navigation.goBack()} color="#228B22" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#f6ffe5' },
  title: { fontSize:22, fontWeight:'bold', marginBottom:24, color:'#228B22' },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, marginVertical:12, width:220, borderRadius:8 },
  result: { fontSize:17, color:'#555', margin:16 }
});
