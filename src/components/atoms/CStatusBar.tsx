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
  backgroundColorDarkMode?: string | false;
  barStyleDarkMode?: 'default' | 'light-content' | 'dark-content';
  translucentDarkMode?: boolean;
  dynamicContentInsets?: number;
}

const CStatusbar: React.FC<CustomStatusBarProps> = ({
  backgroundColor,
  barStyle,
  hidden,
  translucent,
  animated,
  networkActivityIndicatorVisible,
  showHideTransition,
  backgroundColorDarkMode,
  barStyleDarkMode,
  translucentDarkMode,
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
      backgroundColorDarkMode={backgroundColorDarkMode}
      barStyleDarkMode={barStyleDarkMode}
      translucentDarkMode={translucentDarkMode}
    />
  );
};

export default CStatusbar;
