import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale, Colors } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  storyWrapper: {
    flex: 1,
    // marginTop: verticalScale(53),
    marginHorizontal: moderateScale(5)
  },
  separator: {
    marginHorizontal: moderateScale(-2)
  }
});

export default styles;
