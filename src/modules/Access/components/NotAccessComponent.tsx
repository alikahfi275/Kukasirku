import React from 'react';
import {CButton, CIcon, CText, CView} from '../../../components';
import {colors} from '../../../property';
import {BackHandler} from 'react-native';

const NotAccessComponent = () => {
  return (
    <CView flex={1} justifyContent="center" alignItems="center">
      <CIcon
        name="circle-with-cross"
        type="Entypo"
        size={200}
        color={colors.red}
      />
      <CText weight={600} fontSize={30} color={colors.teal}>
        Akses Anda
      </CText>
      <CText weight={600} fontSize={30} color={colors.teal}>
        Tidak Resmi
      </CText>
      <CButton
        title="Keluar"
        paddingRight={20}
        paddingLeft={20}
        onPress={() => BackHandler.exitApp()}
        marginTop={20}
        textStyle={{color: colors.teal}}
      />
    </CView>
  );
};

export default NotAccessComponent;
