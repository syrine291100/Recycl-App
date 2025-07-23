import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Points de collecte (démo)</Text>
      <MapView
        style={{ width: '90%', height: 350 }}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        <Marker coordinate={{ latitude: 48.8566, longitude: 2.3522 }} title="Collecte Paris Centre" />
        {/* Tu peux ajouter d'autres points ou charger depuis une API */}
      </MapView>
      <Text style={{margin:16}} onPress={() => navigation.goBack()}>Retour</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', backgroundColor:'#f6ffe5', paddingTop:24 },
  title: { fontSize:22, fontWeight:'bold', marginBottom:18, color:'#228B22' }
});
