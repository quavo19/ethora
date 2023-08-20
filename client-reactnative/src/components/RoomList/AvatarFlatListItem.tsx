import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';

// Define the type for the data item
type AvatarData = {
  id: string;
  name: string;
  imageUrl: string;
};

type AvatarListProps = {
  data: AvatarData[];
};

const AvatarList: React.FC<AvatarListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      horizontal
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 2,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    borderColor: "gray",
    backgroundColor: "rgba(50,50,50,0.7)"
  },
  
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    color: "white"
  },
});

export default AvatarList;
