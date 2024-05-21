import React from 'react';
import {Pressable, TouchableOpacity, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  name: String;
  solid?: boolean;
  size: number;
  style?: ViewStyle;
  color?: string;
  type?: string;
}

const CIcon: React.FC<Props> = props => {
  switch (props.type) {
    case 'FontAwesome5':
      return <FontAwesome5 {...props} />;
    case 'AntDesign':
      return <AntDesign {...props} />;
    case 'Ionicons':
      return <Ionicons {...props} />;

    case 'Feather':
      return <Feather {...props} />;

    case 'MaterialIcons':
      return <MaterialIcons {...props} />;

    case 'Entypo':
      return <Entypo {...props} />;

    default:
      return <MaterialCommunityIcons {...props} />;
  }
};

export default CIcon;
