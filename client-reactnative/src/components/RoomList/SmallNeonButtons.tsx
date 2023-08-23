import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';

interface NeonButtonProps {
  title: ImageSourcePropType;
  onPress: () => void;
}

const SmallNeonButton: React.FC<NeonButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ height: 70 }}>
      <Image 
       source={title}
       style={{
        width: 130,
        height: 70,
        position: "absolute"
       }}
      />
    </TouchableOpacity>
  );
};

export default SmallNeonButton;
