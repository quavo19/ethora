import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface NeonBigButtonProps {
  title: ImageSourcePropType;
  onPress: () => void;
}

const NeonBigButton: React.FC<NeonBigButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ height: 150 }}>
      <Image 
       source={title}
       style={{
        width: 150,
        height: 150
       }}
      />
    </TouchableOpacity>
  );
};

export default NeonBigButton;
