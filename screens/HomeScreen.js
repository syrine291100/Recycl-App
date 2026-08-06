import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUser } from '../util/storage';

const actions = [
  { label: 'Scanner ou rechercher', screen: 'Scan', icon: '🔎' },
  { label: 'Voir mon historique', screen: 'History', icon: '🕘' },
  { label: 'Points de collecte', screen: 'Map', icon: '🗺️' },
  { label: 'Classement', screen: 'Ranking', icon: '🏆' },
];

export default function HomeScreen({ navigation, route }) {
  const username = route.params?.username;
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getUser(username).then((value) => active && setUser(value));
      return () => {
        active = false;
      };
    }, [username]),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>MON ESPACE</Text>
      <Text style={styles.title}>Bonjour {username} 👋</Text>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Éco-score</Text>
        <Text style={styles.score}>{user?.score ?? 0} points</Text>
        <Text style={styles.level}>{user?.level ?? 'Débutant du tri ♻️'}</Text>
      </View>

      <View style={styles.grid}>
        {actions.map((action) => (
          <Pressable
            key={action.screen}
            style={styles.actionCard}
            onPress={() => navigation.navigate(action.screen, { username })}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.logout} onPress={() => navigation.replace('Login')}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8F2', padding: 24, paddingTop: 64 },
  eyebrow: { color: '#15803D', fontWeight: '800', fontSize: 12, letterSpacing: 1.5 },
  title: { fontSize: 28, fontWeight: '800', color: '#14532D', marginTop: 6, marginBottom: 22 },
  scoreCard: { backgroundColor: '#166534', borderRadius: 20, padding: 22, marginBottom: 20 },
  scoreLabel: { color: '#DCFCE7', fontWeight: '600' },
  score: { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginTop: 5 },
  level: { color: '#BBF7D0', marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  actionCard: { width: '48%', minHeight: 125, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 14, justifyContent: 'space-between' },
  actionIcon: { fontSize: 30 },
  actionLabel: { color: '#1F2937', fontWeight: '700', lineHeight: 20 },
  logout: { alignItems: 'center', marginTop: 'auto', padding: 14 },
  logoutText: { color: '#B91C1C', fontWeight: '700' },
});
