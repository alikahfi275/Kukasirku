import {Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import CSearch from './CSearch';
import {CIcon, CStatusbar, CText, CView} from '../atoms';
import {colors} from '../../property';

interface HeaderProps extends TextInputProps {
  onSearch?: (query: string) => void;
  onPressCart?: () => void;
  value?: string;
  typeHeader?: string;
  titleHeader?: string;
}

const CHeader: React.FC<HeaderProps> = props => {
  const {typeHeader} = props;
  return (
    <>
      {typeHeader === 'search' ? (
        <CView>
          <CView style={styles.wapperHeaderSearch}>
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
                style={styles.iconCart}
                color={colors.teal}
              />
            </Pressable>
          </CView>
          <CView
            style={{
              backgroundColor: colors.teal,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              marginHorizontal: 20,
            }}>
            <Image
              source={require('../../property/assets/images/kukasirkuLogo.png')}
              style={{
                width: 100,
                height: 40,
                resizeMode: 'contain',
              }}
            />
            <CText color={colors.white} weight={800}>
              Order
            </CText>
          </CView>
        </CView>
      ) : (
        <CView style={styles.wapperHeader}>
          <CStatusbar backgroundColor={colors.teal} barStyle="light-content" />
          <CText style={styles.text} weight={500} fontSize={20}>
            {props.titleHeader}
          </CText>
          <CIcon
            name="cart"
            size={25}
            style={styles.iconCart}
            color={colors.white}
          />
        </CView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wapperHeaderSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  wapperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.teal,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconCart: {
    marginLeft: 20,
  },
  text: {
    color: colors.white,
    marginVertical: 50,
    flex: 1,
  },
});

export default CHeader;
