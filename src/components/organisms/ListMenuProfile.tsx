import {View, Text, Pressable, BackHandler} from 'react-native';
import React from 'react';
import {CText, CView} from '../atoms';
import {colors, horizontalScale, verticalScale} from '../../property';
import Route from '../../app/routes/Routes';

const ListMenuProfile = () => {
  const ListMenuProfile = [
    {id: '1', title: 'Bluetooth', action: () => {}},
    {
      id: '2',
      title: 'Tambah Product',
      action: () => Route.navigate(Route.AddProduct),
    },
    {
      id: '3',
      title: 'Edit Product',
      action: () => Route.navigate(Route.EditProduct),
    },
    {
      id: '4',
      title: 'Delete Product',
      action: () => Route.navigate(Route.DeleteProduct),
    },
    {id: '5', title: 'Support', action: () => {}},
    {id: '6', title: 'Close Application', action: () => BackHandler.exitApp()},
  ];

  const isConnectedBluetooth = false;

  return (
    <CView
      backgroundColorStatusBar={colors.teal}
      barStyle="light-content"
      marginTop={10}>
      {ListMenuProfile.map((item, index) => (
        <Pressable key={index} onPress={item.action}>
          <CView
            backgroundColorStatusBar={colors.teal}
            barStyle="light-content"
            key={index}
            marginTop={15}
            paddingTop={5}
            paddingBottom={5}
            paddingRight={10}
            paddingLeft={10}
            marginRight={10}
            marginLeft={10}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: colors.lightgray,
            }}>
            <CView
              backgroundColorStatusBar={colors.teal}
              barStyle="light-content"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {index === 0 && (
                <CView
                  style={{
                    width: horizontalScale(12),
                    height: verticalScale(10),
                    borderRadius: 50,
                    backgroundColor: isConnectedBluetooth
                      ? colors.teal
                      : colors.red1,
                  }}
                  marginRight={10}
                />
              )}
              <CText
                style={{flex: 1}}
                color={
                  item.title === 'Bluetooth'
                    ? isConnectedBluetooth
                      ? colors.teal
                      : colors.red1
                    : colors.teal
                }
                fontSize={16}
                weight={600}>
                {item.title}
              </CText>
              {item.title === 'Bluetooth' && (
                <CText
                  color={isConnectedBluetooth ? colors.teal : colors.red1}
                  fontSize={16}
                  weight={600}>
                  {isConnectedBluetooth ? 'Connected' : 'Not Connected'}
                </CText>
              )}
            </CView>
          </CView>
        </Pressable>
      ))}
    </CView>
  );
};

export default ListMenuProfile;
