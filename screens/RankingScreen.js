import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getRanking } from '../util/storage';

export default function RankingScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getRanking().then(setUsers);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classement</Text>
      <Text style={styles.subtitle}>Les meilleurs éco-scores enregistrés sur cet appareil.</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.username}
        contentContainerStyle={users.length ? styles.list : styles.emptyList}
        renderItem={({ item, index }) => (
          <View style={[styles.row, index === 0 && styles.firstRow]}>
            <Text style={styles.position}>{index + 1}</Text>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.level}>{item.level}</Text>
            </View>
            <Text style={styles.score}>{item.score} pts</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucun utilisateur pour le moment.</Text>}
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
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, marginBottom: 10 },
  firstRow: { backgroundColor: '#FEF3C7' },
  position: { width: 34, fontSize: 20, fontWeight: '800', color: '#166534' },
  userInfo: { flex: 1 },
  username: { fontWeight: '800', color: '#1F2937' },
  level: { color: '#6B7280', fontSize: 12, marginTop: 3 },
  score: { color: '#15803D', fontWeight: '800' },
  empty: { textAlign: 'center', color: '#6B7280' },
  back: { alignItems: 'center', padding: 14 },
  backText: { color: '#166534', fontWeight: '700' },
});
