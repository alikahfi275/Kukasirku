import React from 'react';
import {
  CButton,
  CHeader,
  CScrolView,
  CText,
  CTextInput,
  CView,
} from '../../../components';
import Route from '../../../app/routes/Routes';
import {Image, Pressable} from 'react-native';
import {DefaulFood, colors, sizeScale} from '../../../property';

const EditProfileComponent = (props: any) => {
  const {
    openFile,
    handleSave,
    photoUrl,
    storeName,
    storePhone,
    storeAddress,
    setStoreName,
    setStorePhone,
    setStoreAddress,
  } = props;

  return (
    <CView flex={1}>
      <CHeader
        iconLeft="arrow-left"
        titleHeader="Edit Profile"
        onPressLeft={() => Route.navigate(Route.Profile)}
      />
      <CScrolView marginRight={15} marginLeft={15} paddingTop={10} flex={1}>
        <CView
          style={{alignItems: 'center', justifyContent: 'center'}}
          marginTop={10}
          marginBottom={10}>
          <Image
            source={photoUrl ? {uri: photoUrl} : DefaulFood}
            style={{
              width: sizeScale(200),
              height: sizeScale(200),
              borderRadius: sizeScale(5),
            }}
          />
          <Pressable onPress={openFile}>
            <CText color={colors.lightblue} weight={400} marginTop={10}>
              Ganti Foto Toko
            </CText>
          </Pressable>
        </CView>
        <CView marginTop={5}>
          <CTextInput
            placeholder="Nama Toko"
            label="Nama Toko"
            value={storeName}
            onChangeText={setStoreName}
          />
          <CTextInput
            placeholder="Handphone Toko"
            label="Handphone Toko"
            keyboardType="phone-pad"
            value={storePhone}
            onChangeText={setStorePhone}
          />
          <CTextInput
            placeholder="Alamat Toko"
            label="Alamat Toko"
            numberOfLines={4}
            multiline
            typeMultiline
            value={storeAddress}
            onChangeText={setStoreAddress}
          />
          <CButton
            title="Simpan"
            onPress={handleSave}
            marginTop={20}
            marginBottom={20}
          />
        </CView>
      </CScrolView>
    </CView>
  );
};

export default EditProfileComponent;
