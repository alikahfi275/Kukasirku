import React from 'react';
import {CHeader, CModal, CView, ListMenuProfile} from '../../../components';
import {Image, Linking} from 'react-native';
import {DefaulStore, sizeScale} from '../../../property';
import {ProfileComponentProps} from '../store/type';
import {useProfileStore} from '../store/useProfileStore';

const ProfileComponent: React.FC<ProfileComponentProps> = (props: any) => {
  const {
    permissionLocation,
    permissionBluetooth,
    showModalValidation,
    setShowModalValidation,
  } = useProfileStore();
  const {photoUrl} = props;
  return (
    <CView flex={1}>
      <CHeader titleHeader="Profile" isProfile />
      <CModal
        isOneButton
        visible={showModalValidation}
        Title="Berikan Izin Akses Perangkat Disekitar dan Lokasi Terlebih Dahulu"
        onOneButton={() => {
          setShowModalValidation(false);
          Linking.openSettings();
        }}
        titleOneButton="Ke Pengaturan"
      />
      <CView
        style={{alignItems: 'center', justifyContent: 'center'}}
        marginTop={15}>
        <Image
          source={photoUrl ? {uri: photoUrl} : DefaulStore}
          style={{
            width: sizeScale(150),
            height: sizeScale(150),
            borderRadius: sizeScale(5),
          }}
        />
      </CView>
      <ListMenuProfile
        permissionLocation={permissionLocation}
        permissionBluetooth={permissionBluetooth}
        setShowModalValidation={setShowModalValidation}
      />
    </CView>
  );
};

export default ProfileComponent;
