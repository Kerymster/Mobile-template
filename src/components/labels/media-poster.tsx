import { Image, StyleSheet } from 'react-native';

export default function MediaPoster({ poster }: { poster: string }) {
  return <Image source={{ uri: poster }} style={styles.mediaPoster} />;
}

const styles = StyleSheet.create({
  mediaPoster: {
    width: 120,
    height: 180,
    marginRight: 12,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
});
