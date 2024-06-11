import React, {FC, useState} from 'react';
import {CView, CHeader, ListProduct} from '../../../components';
import {EmptyPage, sizeScale} from '../../../property';
import {Image} from 'react-native';
import {useHomeStore} from '../store/useHomeStore';
import {HomeProps} from '../store/type';
import Route from '../../../app/routes/Routes';

const HomeComponent: FC<HomeProps> = props => {
  const {products, searchQuery, setSearchQuery} = useHomeStore();
  const {filteredProducts} = props;

  return (
    <CView flex={1}>
      <CHeader
        typeHeader="search"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onPressCart={() => Route.navigate(Route.Cart)}
      />
      {products.length === 0 ? (
        <CView
          flex={1}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={EmptyPage}
            style={{
              width: sizeScale(300),
              height: sizeScale(300),
            }}
          />
        </CView>
      ) : (
        <ListProduct products={filteredProducts} onPressDetail={true} />
      )}
    </CView>
  );
};

export default HomeComponent;
