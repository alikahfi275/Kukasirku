import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DefaulProfile, DefaulStore, colors, sizeScale} from '../../property';
import {CText, CView} from '../atoms';
import ImageCropPicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CImageProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Function to retrieve data from AsyncStorage when the app is opened
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem('profileImage');
        if (value !== null) {
          setProfile(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage', error);
      }
    };

    loadData();
  }, []);

  const handleSave = async imageResult => {
    try {
      const imageData = {
        mime: imageResult.mime,
        data: imageResult.data,
      };
      await AsyncStorage.setItem('profileImage', JSON.stringify(imageData));
      setProfile(imageData); // Update the profile state with new image data
      console.log('Successfully saved data to AsyncStorage');
    } catch (error) {
      console.error('Error saving data to AsyncStorage', error);
    }
  };

  const openFile = () => {
    ImageCropPicker.openPicker({
      cropping: true,
      width: 500,
      height: 500,
      cropperCircleOverlay: false,
      includeBase64: true,
    }).then(imageResult => {
      handleSave(imageResult);
    });
  };

  return (
    <CView
      marginTop={50}
      style={{alignItems: 'center', justifyContent: 'center'}}>
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
