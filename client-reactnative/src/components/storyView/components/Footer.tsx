import React from 'react';
import { Alert, Keyboard, Text, View } from 'react-native';
import { Footer as StoryFooter } from 'react-native-story-view';
import { Strings } from '../constants';
import { FooterProps } from './types';

const Footer = ({ userStories, story, progressIndex }: FooterProps) => (
  <View>
    <Text style={{color: "white"}}>send</Text>
  </View>
);

export default Footer;
