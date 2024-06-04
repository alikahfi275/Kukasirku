import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {DefaulProfile, colors, sizeScale} from '../../property';
import {CText, CView} from '../atoms';
import ImageCropPicker from 'react-native-image-crop-picker';

const CImageProfile = () => {
  const [profile, setProfile] = React.useState<any>([]);
  const openFile = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(imageResult => {
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
            : DefaulProfile
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
