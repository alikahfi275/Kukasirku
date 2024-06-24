import React from 'react';
import {CScrolView, CText, CView} from '../atoms';
import moment from 'moment';
import ListItemsCheckout from './ListItemsCheckout';
import {colors, formatRupiah} from '../../property';

const ListHistory = ({checkouts}: {checkouts: any[]}) => {
  return (
    <CScrolView paddingBottom={30} paddingTop={10}>
      {checkouts.map(checkout => (
        <CView
          key={checkout.id}
          marginBottom={20}
          padding={8}
          marginRight={20}
          marginLeft={20}
          marginTop={2}
          backgroundColor="white"
          style={{
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}>
          <CText fontSize={16} weight={600}>
            {checkout.orderId}
          </CText>
          <CText>{moment(checkout.date).format('DD MMMM YYYY HH:mm')}</CText>
          <CView
            marginTop={5}
            style={{
              borderTopWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.secondary2,
            }}
          />
          <ListItemsCheckout checkoutId={checkout.id} />
          <CView
            marginTop={5}
            style={{
              borderTopWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.secondary2,
            }}
          />
          <CView flexDirection="row" marginTop={5}>
            <CView flex={1}>
              <CText
                fontSize={16}
                style={{textAlign: 'right'}}
                weight={600}
                marginRight={10}>
                Total
              </CText>
            </CView>
            <CView style={{justifyContent: 'flex-start'}} flex={0.5}>
              <CText fontSize={16} weight={600}>
                {formatRupiah(checkout.totalPrice)}
              </CText>
            </CView>
          </CView>
        </CView>
      ))}
    </CScrolView>
  );
};

export default ListHistory;
