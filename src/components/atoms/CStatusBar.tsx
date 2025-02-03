import React from 'react';
import {StatusBar} from 'react-native';

interface CustomStatusBarProps {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  hidden?: boolean;
  translucent?: boolean;
  animated?: boolean;
  networkActivityIndicatorVisible?: boolean;
  showHideTransition?: 'fade' | 'slide';
}

const CStatusbar: React.FC<CustomStatusBarProps> = ({
  backgroundColor,
  barStyle,
  hidden,
  translucent,
  animated = true,
  networkActivityIndicatorVisible,
  showHideTransition,
}) => {
  return (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      hidden={hidden}
      translucent={translucent}
      animated={animated}
      networkActivityIndicatorVisible={networkActivityIndicatorVisible}
      showHideTransition={showHideTransition}
    />
  );
};

export default CStatusbar;
