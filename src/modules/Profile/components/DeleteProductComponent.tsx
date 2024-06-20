import React from 'react';
import {CHeader, CView, ListProduct} from '../../../components';
import {DeleteProductComponentProps} from '../store/type';
import Route from '../../../app/routes/Routes';

const DeleteProductComponent: React.FC<DeleteProductComponentProps> = props => {
  const {products} = props;
  return (
    <CView flex={1}>
      <CHeader
        iconLeft="arrow-left"
        titleHeader="Delete Product"
        onPressLeft={() => Route.navigate(Route.Profile)}
      />
      <ListProduct products={products} isDelete />
    </CView>
  );
};

export default DeleteProductComponent;
