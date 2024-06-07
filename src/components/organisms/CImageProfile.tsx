import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {DefaulProfile, DefaulStore, colors, sizeScale} from '../../property';
import {CText, CView} from '../atoms';
import ImageCropPicker from 'react-native-image-crop-picker';

const CImageProfile = () => {
  const [profile, setProfile] = useState(null);
  const openFile = () => {
    ImageCropPicker.openPicker({
      cropping: true,
      width: 500,
      height: 500,
      cropperCircleOverlay: false,
      includeBase64: true,
    }).then((imageResult: any) => {
      setProfile(imageResult);
    });
  };
  return (
    <CView
      marginTop={50}
      style={{alignItems: 'center', justifyContent: 'center'}}
      backgroundColorStatusBar={colors.teal}
      barStyle="light-content">
      <Image
        source={
          profile
            ? {uri: `data:${profile.mime};base64,${profile.data}`}
            : DefaulStore
        }
        style={{
          width: sizeScale(150),
          height: sizeScale(150),
          backgroundColor: colors.lightgray,
          borderRadius: sizeScale(5),
        }}
      />
      <Pressable onPress={openFile}>
        <CText color={colors.lightblue} weight={400} marginTop={10}>
          Ganti Profile
        </CText>
      </Pressable>
    </CView>
  );
};

export default CImageProfile;
