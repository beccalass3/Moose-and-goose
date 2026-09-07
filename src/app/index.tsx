import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
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

  return (
    <View style={styles.home}>
      <Text style={styles.homeTitle}>Good morning.</Text>
      <Text style={styles.homeSub}>Welcome to your closet.</Text>
    </View>
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
  home: {
    flex: 1,
    backgroundColor: '#FAF6EE',
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  homeTitle: { fontSize: 24, fontWeight: '600', color: '#332A20', marginBottom: 4 },
  homeSub: { fontSize: 14, color: '#8A7F70' },
});