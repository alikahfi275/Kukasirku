import React from 'react';
import {CHeader, CView, ListProduct} from '../../../components';
import {colors} from '../../../property';
import Route from '../../../app/routes/Routes';

interface item {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}

interface EditProductComponentProps {
  products: item[];
}
const EditProductComponent: React.FC<EditProductComponentProps> = props => {
  const {products} = props;
  return (
    <CView
      flex={1}
      backgroundColorStatusBar={colors.teal}
      barStyle="light-content">
      <CHeader
        iconLeft="arrow-left"
        titleHeader="Edit Product"
        onPressLeft={() => Route.navigate(Route.Profile)}
      />
      <ListProduct products={products} isEdit />
    </CView>
  );
};

export default EditProductComponent;
