import {Image} from 'react-native';
import React from 'react';
import {CFlatList, CIcon, CText, CView} from '../atoms';
import {
  DefaulFood,
  colors,
  horizontalScale,
  verticalScale,
  capitalizeFirstLetter,
  formatRupiah,
} from '../../property';
import {useCartStore} from '../../modules/Home/store/useHomeStore';

const ListCart = () => {
  const {cart, removeFromCart, incrementQuantity, decrementQuantity} =
    useCartStore();
  return (
    <CFlatList
      data={cart}
      renderItem={({item}) => (
        <CView
          flexDirection="row"
          marginRight={15}
          marginLeft={15}
          marginTop={10}
          paddingBottom={10}
          marginBottom={10}
          alignItems="center"
          style={{
            borderBottomColor: colors.secondary1,
            borderBottomWidth: 1,
          }}>
          <CView
            marginRight={10}
            alignItems="center"
            style={{
              borderRadius: 5,
              borderWidth: 2,
              borderColor: colors.secondary1,
            }}>
            <Image
              source={item ? {uri: item.imageUrl} : DefaulFood}
              style={{
                width: horizontalScale(60),
                height: verticalScale(60),
                borderRadius: 4,
              }}
            />
          </CView>
          <CView flex={1}>
            <CView flexDirection="row" justifyContent="space-between">
              <CText weight={500} color={colors.black} fontSize={20}>
                {capitalizeFirstLetter(item.name)}
              </CText>

              <CIcon
                name="trash"
                type="Ionicons"
                size={25}
                color={colors.secondary2}
                onPress={() => removeFromCart(item.id)}
              />
            </CView>
            <CText weight={500} color={colors.gray} fontSize={16}>
              {formatRupiah(item.price)}
            </CText>

            <CView
              flexDirection="row"
              justifyContent="space-between"
              marginTop={10}>
              <CView
                style={{
                  backgroundColor: colors.secondary1,
                  padding: 5,
                  borderRadius: 5,
                }}
                flexDirection="row"
                alignItems="center">
                <CIcon
                  name="remove"
                  type="MaterialIcons"
                  size={20}
                  color={colors.black}
                  onPress={() =>
                    item.quantity === 1 ? null : decrementQuantity(item.id)
                  }
                  style={{
                    backgroundColor:
                      item.quantity === 1 ? colors.lightgray : colors.white,
                    padding: 5,
                    margin: 5,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,

                    elevation: 2,
                  }}
                />
                <CText
                  weight={500}
                  color={colors.black}
                  fontSize={18}
                  marginRight={5}
                  marginLeft={5}>
                  {item.quantity}
                </CText>
                <CIcon
                  name="add"
                  type="MaterialIcons"
                  size={20}
                  color={colors.black}
                  onPress={() => incrementQuantity(item.id)}
                  style={{
                    backgroundColor: colors.white,
                    padding: 5,
                    margin: 5,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}
                />
              </CView>
              <CText weight={600} color={colors.black} fontSize={18}>
                {formatRupiah(item.price * item.quantity)}
              </CText>
            </CView>
          </CView>
        </CView>
      )}
    />
  );
};

export default ListCart;
