import React from 'react';
import {
  CButton,
  CLoading,
  CModal,
  CScrolView,
  CText,
  CView,
  ListItemsCheckout,
} from '../../../components';
import {Grayscale} from 'react-native-image-filter-kit';
import {Image} from 'react-native';
import {
  DefaulStore,
  LineDashed,
  colors,
  formatRupiah,
  sizeScale,
} from '../../../property';
import moment from 'moment';
import ViewShot from 'react-native-view-shot';
import Route from '../../../app/routes/Routes';

const StrukComponent = (props: any) => {
  const {
    photoUrl,
    storePhone,
    storeAddress,
    checkoutLatest,
    captureView,
    viewShotRefStruk,
    printLabel,
    showModalCetak,
    setShowModalCetak,
    storeName,
    loading,
  } = props;

  return (
    <CView flex={1}>
      <CLoading visible={loading} />
      <CModal
        visible={showModalCetak}
        onConfirm={() => {
          Route.navigate(Route.BluetoothPrint);
          setShowModalCetak(false);
        }}
        onClose={() => setShowModalCetak(false)}
        Title="Harap Koneksikan Ke Printer Bluetooth"
      />
      <CView flex={1} marginTop={20}>
        <ViewShot ref={viewShotRefStruk} style={{backgroundColor: 'white'}}>
          <CScrolView
            paddingTop={20}
            paddingRight={20}
            paddingLeft={20}
            paddingBottom={20}>
            <CView alignItems="center">
              <Grayscale
                image={
                  <Image
                    source={photoUrl ? {uri: photoUrl} : DefaulStore}
                    style={{width: sizeScale(100), height: sizeScale(100)}}
                  />
                }
              />
              {storeName && (
                <CText weight={400} fontSize={12} marginTop={2}>
                  {storeName}
                </CText>
              )}

              {storeAddress && (
                <CText weight={400} fontSize={12}>
                  {storeAddress}
                </CText>
              )}

              {storePhone && (
                <CText weight={400} fontSize={12} marginTop={2}>
                  {storePhone}
                </CText>
              )}
            </CView>
            <LineDashed marginTop={5} />
            <CView>
              <CText
                weight={400}
                fontSize={14}
                marginTop={2}
                color={colors.black}>
                {checkoutLatest?.orderId}
              </CText>
              <CText
                weight={400}
                fontSize={14}
                marginTop={2}
                color={colors.black}>
                {moment(checkoutLatest?.date).format('DD MMMM YYYY HH:mm')}
              </CText>
            </CView>
            <LineDashed marginTop={5} />
            <ListItemsCheckout checkoutId={checkoutLatest?.id} />
            <LineDashed marginTop={5} />
            <CView flex={1} flexDirection="row">
              <CView flex={1}>
                <CText
                  weight={600}
                  fontSize={16}
                  marginTop={2}
                  color={colors.black}
                  style={{textAlign: 'right'}}>
                  Total :
                </CText>
              </CView>
              <CView flex={1} alignItems="flex-end">
                <CText
                  weight={600}
                  fontSize={16}
                  marginTop={2}
                  color={colors.black}
                  marginRight={15}>
                  {formatRupiah(checkoutLatest?.totalPrice)}
                </CText>
              </CView>
            </CView>
            <LineDashed marginTop={5} />
            <CText
              weight={400}
              fontSize={12}
              marginTop={15}
              style={{textAlign: 'center'}}>
              Powered By Akael Xd Project
            </CText>
            <CText
              weight={400}
              fontSize={16}
              marginTop={10}
              style={{textAlign: 'center'}}>
              Terimakasih
            </CText>
          </CScrolView>
        </ViewShot>
      </CView>
      <CView
        flexDirection="row"
        marginBottom={20}
        marginRight={20}
        marginLeft={20}>
        <CButton
          title="Simpan"
          onPress={captureView}
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: colors.teal,
          }}
          color={colors.teal}
          marginRight={15}
        />
        <CButton
          title="Cetak"
          onPress={() => printLabel()}
          style={{flex: 1}}
          marginLeft={15}
        />
      </CView>
    </CView>
  );
};

export default StrukComponent;
