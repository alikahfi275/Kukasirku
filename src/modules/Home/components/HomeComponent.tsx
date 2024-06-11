import React, {FC} from 'react';
import {CView, CHeader, ListProduct} from '../../../components';
import {EmptyPage, sizeScale} from '../../../property';
import {Image} from 'react-native';

interface item {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}
interface HomeComponentProps {
  products: item[];
}

const HomeComponent: FC<HomeComponentProps> = ({products}) => {
  return (
    <CView flex={1}>
      <CHeader typeHeader="search" />
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
        <ListProduct products={products} onPressDetail={true} />
      )}
    </CView>
  );
};

export default HomeComponent;
