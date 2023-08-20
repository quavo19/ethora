import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';

interface NeonButtonProps {
  title: ImageSourcePropType;
  onPress: () => void;
}

const NeonButton: React.FC<NeonButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ height: 55 }}>
      <Image 
       source={title}
       style={{
        width: 290,
        height: 90,
       }}
      />
    </TouchableOpacity>
  );
};

export default NeonButton;
