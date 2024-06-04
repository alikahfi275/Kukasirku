import {Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import CSearch from './CSearch';
import {CIcon, CStatusbar, CText, CView} from '../atoms';
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
  } = props;
  return (
    <>
      {typeHeader === 'search' ? (
        <CView backgroundColorStatusBar={colors.white} barStyle="dark-content">
          <CView
            marginRight={15}
            marginLeft={15}
            style={styles.wapperHeaderSearch}>
            <CStatusbar
              backgroundColor={colors.white}
              barStyle="dark-content"
            />
            <CSearch
              icon={true}
              placeholder="Search ..."
              iconStyle={{color: colors.teal}}
              onSearch={props.onSearch}
              value={props.value}
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
        <CView paddingTop={5} paddingBottom={5} style={styles.wapperHeader}>
          <CStatusbar backgroundColor={colors.teal} barStyle="light-content" />
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
            style={styles.text}
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
  wapperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.teal,
  },
  text: {
    color: colors.white,
    flex: 1,
  },
});

export default CHeader;
