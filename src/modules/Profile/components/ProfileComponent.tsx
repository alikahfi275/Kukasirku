import React from 'react';
import {CHeader, CView, ListMenuProfile} from '../../../components';
import {Image} from 'react-native';
import {DefaulStore, sizeScale} from '../../../property';
import {ProfileComponentProps} from '../store/type';

const ProfileComponent: React.FC<ProfileComponentProps> = (props: any) => {
  const {photoUrl} = props;
  return (
    <CView flex={1}>
      <CHeader iconLeft="arrow-left" titleHeader="Profile" />
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
      <ListMenuProfile />
    </CView>
  );
};

export default ProfileComponent;
