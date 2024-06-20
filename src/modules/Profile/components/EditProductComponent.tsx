import React from 'react';
import {CHeader, CView, ListProduct} from '../../../components';
import Route from '../../../app/routes/Routes';
import {EditProductComponentProps} from '../store/type';

const EditProductComponent: React.FC<EditProductComponentProps> = props => {
  const {products} = props;
  return (
    <CView flex={1}>
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
