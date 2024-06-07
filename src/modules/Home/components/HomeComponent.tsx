import React, {FC} from 'react';
import {CView, CHeader, ListProduct} from '../../../components';
import {colors} from '../../../property';

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
    <CView
      flex={1}
      backgroundColorStatusBar={colors.white}
      barStyle="dark-content">
      <CHeader typeHeader="search" />
      <ListProduct products={products} />
    </CView>
  );
};

export default HomeComponent;
