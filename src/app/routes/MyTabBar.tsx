import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {CText, CIcon} from '../../components';
import Route from './Routes';
import {colors} from '../../property';

export function MyTabBar({state, descriptors, navigation}: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#EEEEEE',
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Define icon names for each tab or pass it as a prop
        let iconName;
        let type;
        let title;
        let size;
        let badge;
        switch (route.name) {
          default:
            iconName = 'home';
            type = 'AntDesign';
            title = 'Home';
            size = 22;
            badge = 0;
            break;
          case Route.History:
            iconName = 'history';
            type = 'MaterialIcons';
            title = 'History';
            size = 22;
            badge = 0;
            break;
          case Route.Rekap:
            iconName = 'document-attach-outline';
            type = 'Ionicons';
            title = 'Rekap';
            size = 22;
            badge = 0;
            break;
          case Route.Profile:
            iconName = 'user';
            type = 'AntDesign';
            title = 'Profile';
            size = 22;
            badge = 0;
            break;
          // Provide a default icon name
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <CIcon
              name={iconName}
              type={type}
              size={size}
              color={isFocused ? colors.teal : colors.darkgray}
            />
            <CText
              fontSize={10}
              weight={300}
              color={isFocused ? colors.teal : colors.darkgray}
              style={{marginTop: 4}}>
              {title}
            </CText>

            <View
              style={{
                position: 'absolute',
                backgroundColor: '#009EE0',
                paddingHorizontal: 3,
                paddingVertical: 2,
                borderRadius: 10,
                top: -5,
                right: 13,
                borderWidth: 2,
                borderColor: '#fff',
                opacity: badge > 0 ? 1 : 0,
                minWidth: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CText
                style={{
                  fontSize: 10,
                  color: '#fff',
                  textAlign: 'center',
                }}>
                {badge > 99 ? '99+' : badge}
              </CText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
