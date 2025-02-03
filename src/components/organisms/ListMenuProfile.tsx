import {View, Text, Pressable, BackHandler} from 'react-native';
import React, {useState} from 'react';
import {CText, CView} from '../atoms';
import {colors} from '../../property';
import Route from '../../app/routes/Routes';
import {CModal} from '../molecules';

const ListMenuProfile = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {permissionLocation, permissionBluetooth, setShowModalValidation} =
    props;
  const ListMenuProfile = [
    {
      id: '1',
      title: 'Bluetooth',
      action: () => {
        if (permissionLocation && permissionBluetooth) {
          Route.navigate(Route.BluetoothPrint);
        } else {
          setShowModalValidation(true);
        }
      },
    },
    {
      id: '2',
      title: 'Edit Profile',
      action: () => Route.navigate(Route.EditProfile),
    },
    {
      id: '3',
      title: 'Tambah Product',
      action: () => Route.navigate(Route.AddProduct),
    },
    {
      id: '4',
      title: 'Edit Product',
      action: () => Route.navigate(Route.EditProduct),
    },
    {
      id: '5',
      title: 'Delete Product',
      action: () => Route.navigate(Route.DeleteProduct),
    },
    {
      id: '6',
      title: 'Contribution Developer',
      action: () => Route.navigate(Route.ContributionDeveloper),
    },
    {id: '7', title: 'Close Application', action: () => openModal()},
  ];

  const isConnectedBluetooth = false;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <CView marginTop={10}>
      {ListMenuProfile.map((item, index) => (
        <Pressable key={index} onPress={item.action}>
          <CView
            key={index}
            marginTop={15}
            paddingTop={5}
            paddingBottom={5}
            paddingRight={10}
            paddingLeft={10}
            marginRight={15}
            marginLeft={15}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: colors.lightgray,
            }}>
            <CView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CText
                style={{flex: 1}}
                color={colors.teal}
                fontSize={16}
                weight={600}>
                {item.title}
              </CText>
            </CView>
          </CView>
        </Pressable>
      ))}
      <CModal
        visible={modalVisible}
        onClose={closeModal}
        Title="Apakah Anda yakin ingin Keluar ?"
        onConfirm={() => BackHandler.exitApp()}
      />
    </CView>
  );
};

export default ListMenuProfile;
