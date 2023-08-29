import { Input } from 'native-base';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/MaterialIcons';

type AvatarData = {
  id: string;
  name: string;
  imageUrl: string;
};

type AvatarListProps = {
  data: AvatarData[];
};

const AvatarList: React.FC<AvatarListProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isInputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    setFilteredData(
      searchTerm
        ? data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : data
    );
  }, [searchTerm, data]);

  const handleInputFocus = () => {
    setInputFocused(true);
  };
  const handleChangeText = (text: string) => {
    setSearchTerm(text);
    if (text) {
      setInputFocused(true);
    } else {
      setInputFocused(false);
    }
  };

  const handleClose = () => {
    setInputFocused(false);
    setSearchTerm('');
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search avatar..."
        onChangeText={handleChangeText}
        value={searchTerm}
        onFocus={handleInputFocus}
        style={styles.input}
      />
      <Icon style={styles.closeIcon} name='close' onPress={handleClose} />
      {isInputFocused && (
        <View style={styles.FlatContainer}>
          <ScrollView>
            <View style={styles.flexContainer}>
              {filteredData.map(item => (
                <View key={item.id} style={styles.itemContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: hp("45%"),
    position: 'relative',
  },
  input: {
    marginBottom: 10,
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: "white",
    fontSize: 25,
    backgroundColor: "black",
    borderRadius: 12,
  },
  flexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  itemContainer: {
    margin: 2,
    alignItems: 'center',
    paddingTop: 10,
    width: 90,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    color: "white",
  },
  FlatContainer: {
    position: "absolute",
    top: 60, // Adjusted position to account for Input and Icon height
    width: '100%',
    borderRadius: 12,
    backgroundColor: "rgba(30,30,30, 1)",
    zIndex: 10,
    maxHeight: hp('40%'), // This ensures the list is not too long
  },
  
});

export default AvatarList;
