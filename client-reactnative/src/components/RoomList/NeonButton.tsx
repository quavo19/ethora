import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';

interface NeonButtonProps {
  title: ImageSourcePropType;
  onPress: () => void;
}

const NeonButton: React.FC<NeonButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ height: 150, width: 200 }}>
      <Image 
       source={title}
       style={{
        width: 200,
        height: 150,
       }}
      />
    </TouchableOpacity>
  );
};

export default NeonButton;
