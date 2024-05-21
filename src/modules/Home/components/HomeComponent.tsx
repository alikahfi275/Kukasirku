import React, {FC} from 'react';
import {CIcon, CSearch, CText, CView} from '../../../components';
import {StyleSheet} from 'react-native';
import {colors} from '../../../property';

const HomeComponent: FC = () => {
  return (
    <CView style={styles.container}>
      <CView style={styles.wapperHeader}>
        <CSearch
          icon={true}
          placeholder="Search ..."
          iconStyle={{color: colors.teal}}
        />
        <CIcon
          name="cart"
          size={25}
          style={styles.iconCart}
          color={colors.teal}
        />
      </CView>
      <CText fontSize={20} weight={300}>
        HomeComponent
      </CText>
    </CView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  wapperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCart: {
    marginLeft: 20,
  },
});

export default HomeComponent;
