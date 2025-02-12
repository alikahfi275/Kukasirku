import React from 'react';
import {CScrolView, CText, CView} from '../atoms';
import {colors, formatRupiah} from '../../property';
import {useRekapStore} from '../../modules/Rekap/store/useRekapStore';
import moment from 'moment';
import ViewShot from 'react-native-view-shot';

const ListRekap = ({month, viewShotRef}: any) => {
  const {productCounts, totalProducts, totalPrice} = useRekapStore();
  return (
    <ViewShot
      ref={viewShotRef}
      style={{backgroundColor: 'white', padding: 5, paddingHorizontal: 5}}>
      <CScrolView
        paddingTop={30}
        paddingRight={20}
        paddingLeft={20}
        paddingBottom={20}>
        <CView>
          <CView
            marginTop={5}
            marginBottom={5}
            style={{
              borderTopWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.secondary2,
            }}
          />
          <CText weight={600} style={{textAlign: 'center'}} fontSize={18}>
            REKAP BULAN {month.toUpperCase()}
          </CText>
          <CView
            marginTop={5}
            style={{
              borderTopWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.secondary2,
            }}
          />
        </CView>
        <CView marginTop={5} flexDirection="row">
          <CView flexDirection="row">
            <CText
              weight={600}
              style={{textAlign: 'center', width: 50}}
              fontSize={16}>
              Qty
            </CText>
            <CText>|</CText>
          </CView>
          <CView flexDirection="row" justifyContent="space-around" flex={1}>
            <CText weight={600} style={{textAlign: 'center'}} fontSize={16}>
              Name
            </CText>
            <CText>|</CText>
            <CText weight={600} style={{textAlign: 'center'}} fontSize={16}>
              Total
            </CText>
          </CView>
        </CView>
        <CView
          marginTop={5}
          style={{
            borderTopWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.secondary2,
          }}
        />

        {totalProducts === 0 ? (
          <CView
            marginTop={30}
            marginBottom={30}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CText>Tidak Ada Data</CText>
          </CView>
        ) : (
          Object.entries(productCounts).map(([name, details]) => (
            <CView key={name} flexDirection="row" marginTop={5}>
              <CView flexDirection="row">
                <CText
                  style={{textAlign: 'center'}}
                  fontSize={16}
                  marginRight={10}
                  marginLeft={20}>
                  {details.count}
                </CText>
              </CView>
              <CView
                flexDirection="row"
                justifyContent="space-between"
                flex={1}
                marginRight={5}
                marginLeft={5}>
                <CView>
                  <CText
                    style={{textAlign: 'left', maxWidth: 165}}
                    fontSize={16}>
                    {name}
                  </CText>
                </CView>
                <CView>
                  <CText style={{textAlign: 'center'}} fontSize={16}>
                    {formatRupiah(details.totalPrice)}
                  </CText>
                </CView>
              </CView>
            </CView>
          ))
        )}
        <CView
          marginTop={5}
          style={{
            borderTopWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.secondary2,
          }}
        />
        <CView flexDirection="row" marginTop={5} justifyContent="space-around">
          <CView flex={1}>
            <CText
              fontSize={16}
              style={{textAlign: 'right'}}
              weight={600}
              marginRight={10}>
              Total Product
            </CText>
          </CView>
          <CText>|</CText>
          <CView flex={1}>
            <CText fontSize={16} weight={600} marginLeft={10}>
              {totalProducts}
            </CText>
          </CView>
        </CView>

        <CView
          marginTop={5}
          style={{
            borderTopWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.secondary2,
          }}
        />

        <CView flexDirection="row" marginTop={5} justifyContent="space-around">
          <CView flex={1}>
            <CText
              fontSize={16}
              style={{textAlign: 'right'}}
              weight={600}
              marginRight={10}>
              Total Pendapatan
            </CText>
          </CView>
          <CText>|</CText>
          <CView flex={1}>
            <CText fontSize={16} weight={600} marginLeft={10}>
              {formatRupiah(totalPrice)}
            </CText>
          </CView>
        </CView>
        <CView
          marginTop={5}
          style={{
            borderTopWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.secondary2,
          }}
        />
        <CText style={{textAlign: 'center'}} marginTop={5}>
          Print: {moment().format('DD MMMM YYYY HH:mm')}
        </CText>
        <CView
          marginTop={5}
          marginBottom={5}
          style={{
            borderTopWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.secondary2,
          }}
        />
        <CText weight={400} fontSize={10} style={{textAlign: 'center'}}>
          Powered By Akael Xd Project
        </CText>
        <CView
          marginTop={5}
          marginBottom={5}
          style={{
            borderTopWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.secondary2,
          }}
        />
      </CScrolView>
    </ViewShot>
  );
};

export default ListRekap;
