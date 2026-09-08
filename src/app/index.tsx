import { useSaved } from '@/context/saved-context';
import { listings } from '@/data/listings';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [feedView, setFeedView] = useState('magazine');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { savedIds, toggleSaved } = useSaved();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splash}>
        <Text style={styles.title}>Moose & Goose</Text>
        <Text style={styles.tagline}>they grow. their things go on.</Text>
      </View>
    );
  }

  const selectedListing = listings.find((item) => item.id === selectedId);

  if (selectedListing) {
    return (
      <ScrollView style={styles.home} contentContainerStyle={styles.homeContent}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedId(null)}>
          <Text style={styles.backBtnText}>‹ Back</Text>
        </TouchableOpacity>

        <View style={styles.detailImage} />
        <Text style={styles.cardBrand}>{selectedListing.brand}</Text>
        <Text style={styles.detailTitle}>{selectedListing.title}</Text>
        <Text style={styles.detailPrice}>${selectedListing.price}</Text>
        <Text style={styles.cardMeta}>{selectedListing.size}</Text>
        <Text style={styles.cardFrom}>From {selectedListing.closetName}</Text>

        <TouchableOpacity style={styles.shopBtn}>
          <Text style={styles.shopBtnText}>Buy for ${selectedListing.price}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.home} contentContainerStyle={styles.homeContent}>
      <Text style={styles.homeTitle}>Good morning.</Text>
      <Text style={styles.homeSub}>they grow. their things go on.</Text>

      <View style={styles.switchRow}>
        {['magazine', 'classic', 'grid'].map((view) => (
          <TouchableOpacity
            key={view}
            style={[styles.switchBtn, feedView === view && styles.switchBtnActive]}
            onPress={() => setFeedView(view)}
          >
            <Text style={[styles.switchLabel, feedView === view && styles.switchLabelActive]}>
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {listings.map((item) => (
        <TouchableOpacity key={item.id} style={styles.card} onPress={() => setSelectedId(item.id)}>
          <View style={styles.cardImage} />
          <TouchableOpacity
  style={styles.heartBtn}
  onPress={() => toggleSaved(item.id)}
>
  <Text style={styles.heartIcon}>{savedIds.includes(item.id) ? '♥' : '♡'}</Text>
</TouchableOpacity>
          <View style={styles.cardBody}>
            <Text style={styles.cardBrand}>{item.brand}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>
              {item.size} · ${item.price}
            </Text>
            <Text style={styles.cardFrom}>From {item.closetName}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#FAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: { fontSize: 28, fontWeight: '600', color: '#332A20' },
  tagline: { fontSize: 14, fontStyle: 'italic', color: '#8A7F70' },
  home: { flex: 1, backgroundColor: '#FAF6EE' },
  homeContent: { paddingTop: 80, paddingHorizontal: 24, paddingBottom: 60 },
  homeTitle: { fontSize: 24, fontWeight: '600', color: '#332A20', marginBottom: 4 },
  homeSub: { fontSize: 13, fontStyle: 'italic', color: '#8A7F70', marginBottom: 24 },
  switchRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFDF8',
    borderRadius: 14,
    padding: 4,
    gap: 4,
    borderWidth: 1,
    borderColor: '#EAE2D3',
    marginBottom: 24,
  },
  switchBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  switchBtnActive: { backgroundColor: '#332A20' },
  switchLabel: { fontSize: 13, fontWeight: '700', color: '#8A7F70' },
  switchLabelActive: { color: '#FFFFFF' },
  card: {
    backgroundColor: '#FFFDF8',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EAE2D3',
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardImage: { height: 180, backgroundColor: '#F3E3B8' , position: 'relative'},
      heartBtn: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#FFFDF8',
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heartIcon: { fontSize: 15, color: '#A9522E' },
  cardBody: { padding: 16 },
  cardBrand: { fontSize: 11, fontWeight: '800', color: '#5E4E3D', marginBottom: 2 },
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#332A20', marginBottom: 4 },
  cardMeta: { fontSize: 13, color: '#8A7F70', marginBottom: 4 },
  cardFrom: { fontSize: 12, fontStyle: 'italic', color: '#8A7F70', marginBottom: 12 },
  shopBtn: {
    backgroundColor: '#332A20',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  shopBtnText: { color: '#FFFFFF', fontSize: 14.5, fontWeight: '800' },
  backBtn: { marginBottom: 16 },
  backBtnText: { fontSize: 15, fontWeight: '700', color: '#332A20' },
  detailImage: { height: 260, backgroundColor: '#F3E3B8', borderRadius: 18, marginBottom: 16 },
  detailTitle: { fontSize: 21, fontWeight: '600', color: '#332A20', marginBottom: 4 },
  detailPrice: { fontSize: 17, fontWeight: '800', color: '#5E4E3D', marginBottom: 10 },
});