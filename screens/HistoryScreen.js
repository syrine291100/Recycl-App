import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getHistory } from '../util/storage';

export default function HistoryScreen({ navigation, route }) {
  const username = route.params?.username;
  const [history, setHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getHistory(username).then(setHistory);
    }, [username]),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique de tri</Text>
      <Text style={styles.subtitle}>Tes 50 dernières recherches réussies.</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={history.length ? styles.list : styles.emptyList}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.points}>+{item.points ?? 1}</Text>
            </View>
            <Text style={styles.instruction}>{item.instruction}</Text>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleString('fr-FR')}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🗂️</Text>
            <Text style={styles.emptyTitle}>Aucune recherche enregistrée</Text>
            <Text style={styles.emptyText}>Tes consignes de tri apparaîtront ici.</Text>
          </View>
        }
      />

      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Retour</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8F2', padding: 24, paddingTop: 64 },
  title: { fontSize: 28, fontWeight: '800', color: '#14532D' },
  subtitle: { color: '#4B5563', marginTop: 6, marginBottom: 18 },
  list: { paddingBottom: 20 },
  emptyList: { flexGrow: 1, justifyContent: 'center' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  label: { flex: 1, fontWeight: '800', color: '#1F2937' },
  points: { color: '#15803D', fontWeight: '800' },
  instruction: { color: '#374151', marginTop: 8 },
  date: { color: '#9CA3AF', fontSize: 12, marginTop: 10 },
  empty: { alignItems: 'center' },
  emptyIcon: { fontSize: 46 },
  emptyTitle: { fontWeight: '800', color: '#1F2937', marginTop: 12 },
  emptyText: { color: '#6B7280', marginTop: 6 },
  back: { alignItems: 'center', padding: 14 },
  backText: { color: '#166534', fontWeight: '700' },
});
