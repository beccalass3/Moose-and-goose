import { listings } from '@/data/listings';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ShopScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Shop</Text>

      <View style={styles.grid}>
        {listings.map((item) => (
          <View key={item.id} style={styles.tile}>
            <View style={styles.tileImage} />
            <Text style={styles.tileBrand}>{item.brand}</Text>
            <Text style={styles.tileMeta}>
              ${item.price} · {item.size}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FAF6EE' },
  content: { paddingTop: 80, paddingHorizontal: 24, paddingBottom: 60 },
  heading: { fontSize: 22, fontWeight: '600', color: '#332A20', marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    width: '31%',
  },
  tileImage: {
    height: 100,
    backgroundColor: '#F3E3B8',
    borderRadius: 12,
    marginBottom: 6,
  },
  tileBrand: { fontSize: 11.5, fontWeight: '800', color: '#332A20' },
  tileMeta: { fontSize: 11, color: '#8A7F70' },
});