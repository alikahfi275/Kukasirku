import {Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import CSearch from './CSearch';
import {CIcon, CText, CView} from '../atoms';
import {colors, horizontalScale, verticalScale} from '../../property';

interface HeaderProps extends TextInputProps {
  onSearch?: (query: string) => void;
  onPressCart?: () => void;
  value?: string;
  typeHeader?: string;
  titleHeader?: string;
  iconRight?: string;
  iconLeft?: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  sizeIconRight?: number;
  sizeIconLeft?: number;
  onChangeText?: (text: string) => void;
  badge?: number;
}

const CHeader: React.FC<HeaderProps> = props => {
  const {
    typeHeader,
    iconRight,
    iconLeft,
    onPressLeft,
    onPressRight,
    sizeIconRight = 20,
    sizeIconLeft = 20,
    badge = 0,
  } = props;
  return (
    <>
      {typeHeader === 'search' ? (
        <CView paddingTop={20}>
          <CView
            marginRight={15}
            marginLeft={15}
            style={styles.wapperHeaderSearch}>
            <CSearch
              icon={true}
              placeholder="Search ..."
              iconStyle={{color: colors.teal}}
              onSearch={props.onSearch}
              value={props.value}
              onChangeText={props.onChangeText}
            />
            <Pressable onPress={props.onPressCart}>
              <CIcon
                name="cart"
                size={25}
                style={{
                  marginRight: horizontalScale(10),
                  marginLeft: horizontalScale(10),
                }}
                color={colors.teal}
              />
              <CView
                style={{
                  position: 'absolute',
                  top: -5,
                  right: 0,
                  backgroundColor: colors.red1,
                  width: 15,
                  height: 15,
                  borderRadius: 15 / 2,
                }}>
                <CText
                  color={colors.white}
                  weight={500}
                  fontSize={10}
                  style={{textAlign: 'center'}}>
                  {badge}
                </CText>
              </CView>
            </Pressable>
          </CView>
          <CView
            marginTop={5}
            backgroundColor={colors.teal}
            paddingRight={15}
            paddingLeft={15}
            marginRight={15}
            marginLeft={15}
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../property/assets/images/kukasirkuLogo.png')}
              style={{
                width: horizontalScale(100),
                height: verticalScale(35),
                resizeMode: 'contain',
              }}
            />
            <CText color={colors.white} weight={800}>
              Order
            </CText>
          </CView>
        </CView>
      ) : (
        <CView
          paddingTop={25}
          paddingBottom={5}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: typeHeader === 'cart' ? colors.white : colors.teal,
            borderBottomColor:
              typeHeader === 'cart' ? colors.secondary1 : colors.teal,
            borderBottomWidth: typeHeader === 'cart' ? 1 : 0,
          }}>
          {iconLeft && (
            <CIcon
              name={iconLeft}
              size={sizeIconLeft}
              style={{
                marginRight: horizontalScale(10),
                marginLeft: horizontalScale(10),
              }}
              color={colors.white}
              onPress={onPressLeft}
            />
          )}
          <CText
            marginTop={5}
            marginBottom={5}
            style={{
              color: typeHeader === 'cart' ? colors.teal : colors.white,
              flex: 1,
              textAlign: typeHeader === 'cart' ? 'center' : 'left',
            }}
            weight={500}
            fontSize={20}>
            {props.titleHeader}
          </CText>
          {iconRight && (
            <CIcon
              name={iconRight}
              size={sizeIconRight}
              style={{
                marginRight: horizontalScale(10),
                marginLeft: horizontalScale(10),
              }}
              color={colors.white}
              onPress={onPressRight}
            />
          )}
        </CView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wapperHeaderSearch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CHeader;
