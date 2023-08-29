import React from 'react';
import { Image, View, Text, StyleSheet } from "react-native";
import { faker } from '@faker-js/faker';

const ImageCmp = ({ overlay = false }) => {
  const imgUrl = faker.image.avatar();

  return (
    <View>
      <Image
        source={{ uri: imgUrl }}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
};

export const People = ({ members }) => {
  const count = Math.min(members, 3);
  
  return (
    <View style={styles.container}>
            {Array(count).fill(null).map((_, index) => (
                <View key={`People-${index}`} style={[styles.imageContainer]}>
                    <ImageCmp />
                    {index === count - 1 && members > 3 && (
                        <View style={styles.overlayContainer}>
                            <Text style={styles.overlayText}>+{members - 3}</Text>
                        </View>
                    )}
                    {(index === count - 1 && members <= 3) && (
                        <View style={styles.overlayContainer}>
                            <Text style={styles.overlayText}>{members}</Text>
                        </View>
                    )}
                </View>
            ))}
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
imageContainer: {
    position: 'relative',
    marginLeft: -10,
},
image: {
    width: 20,
    height: 20,
    marginLeft: -1,
    borderRadius: 24,
},
overlayContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    marginLeft: -6,
    borderRadius: 50,
    width: 30,
    right: 0,
    backgroundColor: 'rgba(65, 65, 65, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
},

  overlayText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: "800",
  },
});
