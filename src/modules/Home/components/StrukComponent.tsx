import React from 'react';
import {
  CButton,
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

const StrukComponent = (props: any) => {
  const {
    photoUrl,
    storePhone,
    storeAddress,
    checkoutLatest,
    captureView,
    viewShotRefStruk,
  } = props;

  return (
    <CView flex={1}>
      <CView flex={1}>
        <ViewShot ref={viewShotRefStruk} style={{backgroundColor: 'white'}}>
          <CScrolView
            paddingTop={30}
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
              <CText weight={400} fontSize={12} marginTop={2}>
                {storePhone}
              </CText>
              <CText weight={400} fontSize={12}>
                {storeAddress}
              </CText>
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
              <CView flex={1.5}>
                <CText
                  weight={600}
                  fontSize={16}
                  marginTop={2}
                  color={colors.black}
                  style={{textAlign: 'right'}}
                  marginRight={20}>
                  Total
                </CText>
              </CView>
              <CView flex={1}>
                <CText
                  weight={600}
                  fontSize={16}
                  marginTop={2}
                  color={colors.black}>
                  {formatRupiah(checkoutLatest?.totalPrice)}
                </CText>
              </CView>
            </CView>
            <LineDashed marginTop={5} />
            <CText
              weight={400}
              fontSize={16}
              marginTop={10}
              style={{textAlign: 'center'}}>
              Terimakasih Atas Kunjungan Anda
            </CText>
            <CText
              weight={400}
              fontSize={10}
              marginTop={10}
              style={{textAlign: 'center'}}>
              Powerd By Akael Project
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
          onPress={() => {}}
          style={{flex: 1}}
          marginLeft={15}
        />
      </CView>
    </CView>
  );
};

export default StrukComponent;
