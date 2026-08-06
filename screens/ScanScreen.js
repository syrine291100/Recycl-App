import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { addHistoryEntry, updateUserScore } from '../util/storage';
import triRules from '../data/tri_rules.json';
import { fetchProductByBarcode } from '../util/api';

const normalize = (value = '') =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default function ScanScreen({ navigation, route }) {
  const username = route.params?.username;
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveSuccess = async ({ query, label, instruction }) => {
    await updateUserScore(username, 1);
    await addHistoryEntry(username, { query, label, instruction, points: 1 });
    setResult({ type: 'success', label, instruction });
  };

  const handleSearch = async () => {
    const query = input.trim();
    if (!query) {
      setResult({ type: 'error', instruction: 'Saisis un objet, un matériau ou un code-barres.' });
      return;
    }

    setLoading(true);
    try {
      if (/^\d{8,14}$/.test(query)) {
        const product = await fetchProductByBarcode(query);
        const packaging = product?.packaging_materials;
        const material = Array.isArray(packaging) ? packaging[0] : packaging;
        const rule = material
          ? triRules.find((item) => normalize(item.materiau) === normalize(material))
          : null;

        if (rule) {
          await saveSuccess({
            query,
            label: product?.product_name || material,
            instruction: rule.consigne,
          });
        } else {
          setResult({ type: 'error', instruction: 'Produit trouvé, mais aucune consigne fiable n’est disponible.' });
        }
        return;
      }

      const normalizedQuery = normalize(query);
      const rule = triRules.find(
        (item) =>
          normalize(item.objet).includes(normalizedQuery) ||
          normalize(item.materiau) === normalizedQuery,
      );

      if (rule) {
        await saveSuccess({
          query,
          label: `${rule.objet} · ${rule.materiau}`,
          instruction: rule.consigne,
        });
      } else {
        setResult({ type: 'error', instruction: 'Objet ou matériau absent de la base locale.' });
      }
    } catch {
      setResult({ type: 'error', instruction: 'Une erreur est survenue. Réessaie dans quelques instants.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Que veux-tu trier ?</Text>
      <Text style={styles.subtitle}>Recherche par objet, matériau ou code-barres.</Text>
      <TextInput
        placeholder="Ex. canette, verre, 3017620422003"
        style={styles.input}
        onChangeText={setInput}
        value={input}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <Pressable style={styles.button} onPress={handleSearch} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Recherche…' : 'Afficher la consigne'}</Text>
      </Pressable>

      {result ? (
        <View style={[styles.resultCard, result.type === 'error' && styles.errorCard]}>
          {result.label ? <Text style={styles.resultLabel}>{result.label}</Text> : null}
          <Text style={styles.resultText}>{result.instruction}</Text>
          {result.type === 'success' ? <Text style={styles.points}>+1 point</Text> : null}
        </View>
      ) : null}

      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Retour à l’accueil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8F2', padding: 24, paddingTop: 70 },
  title: { fontSize: 28, fontWeight: '800', color: '#14532D' },
  subtitle: { color: '#4B5563', marginTop: 8, marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12 },
  button: { backgroundColor: '#15803D', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
  resultCard: { backgroundColor: '#DCFCE7', borderRadius: 16, padding: 20, marginTop: 24 },
  errorCard: { backgroundColor: '#FEE2E2' },
  resultLabel: { fontWeight: '800', color: '#14532D', marginBottom: 8 },
  resultText: { fontSize: 18, color: '#1F2937' },
  points: { color: '#15803D', fontWeight: '800', marginTop: 12 },
  back: { alignItems: 'center', marginTop: 'auto', padding: 14 },
  backText: { color: '#166534', fontWeight: '700' },
});
