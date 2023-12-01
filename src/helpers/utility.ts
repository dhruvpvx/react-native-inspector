import { Dimensions } from 'react-native';

class utility {
  static deviceWidth = Dimensions.get('window').width;
  static deviceHeight = Dimensions.get('window').height;
}

export default utility;
