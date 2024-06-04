import React from 'react';
import {Pressable, TouchableOpacity, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {sizeScale} from '../../property';

interface Props {
  name: String;
  solid?: boolean;
  size: number;
  style?: ViewStyle;
  color?: string;
  type?: string;
  onPress?: () => void;
}

const CIcon: React.FC<Props> = props => {
  switch (props.type) {
    case 'FontAwesome5':
      return <FontAwesome5 {...props} size={sizeScale(props.size)} />;
    case 'AntDesign':
      return <AntDesign {...props} size={sizeScale(props.size)} />;
    case 'Ionicons':
      return <Ionicons {...props} size={sizeScale(props.size)} />;

    case 'Feather':
      return <Feather {...props} size={sizeScale(props.size)} />;

    case 'MaterialIcons':
      return <MaterialIcons {...props} size={sizeScale(props.size)} />;

    case 'Entypo':
      return <Entypo {...props} size={sizeScale(props.size)} />;

    default:
      return <MaterialCommunityIcons {...props} size={sizeScale(props.size)} />;
  }
};

export default CIcon;
