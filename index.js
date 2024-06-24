/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

// Konfigurasi WDYR
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

AppRegistry.registerComponent(appName, () => App);
