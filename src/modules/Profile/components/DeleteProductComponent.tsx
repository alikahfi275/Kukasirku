import React from 'react';
import {CHeader, CView, ListProduct} from '../../../components';
import {colors} from '../../../property';
import {DeleteProductComponentProps} from '../store/type';
import Route from '../../../app/routes/Routes';

const DeleteProductComponent: React.FC<DeleteProductComponentProps> = props => {
  const {products} = props;
  return (
    <CView
      flex={1}
      backgroundColorStatusBar={colors.teal}
      barStyle="light-content">
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