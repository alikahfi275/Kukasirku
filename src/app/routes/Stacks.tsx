import React from 'react';
import Routes, {navigation} from './Routes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useModal} from 'react-native-modalfy';

// Bottom Tab
import BottomTab from './BottomTab';

// Screens
import AddProductContainer from '../../modules/Profile/containers/AddProductContainer';
import DeleteProductContainer from '../../modules/Profile/containers/DeleteProductContainer';
import EditProductContainer from '../../modules/Profile/containers/EditProductContainer';
import EditDetailProductContainer from '../../modules/Profile/containers/EditDetailProductContainer';
import DetailProductContainer from '../../modules/Home/containers/DetailProductContainer';
import CartContainer from '../../modules/Home/containers/CartContainer';

// Statusbar Default
import {CStatusbar} from '../../components';

// Re-Wrapped Screens
const AddProduct = AddProductContainer;
const DeleteProduct = DeleteProductContainer;
const EditProduct = EditProductContainer;
const EditDetailProduct = EditDetailProductContainer;
const DetailProduct = DetailProductContainer;
const Cart = CartContainer;

// Refs :
export const modalRef: any = React.createContext();

// Const :
const Stack = createStackNavigator();
// const INITIAL_ROUTE_NAME = Routes.SplashScreen;

const Stacks = (props: any) => {
  const {openModal, closeModal} = useModal();

  modalRef.current = {
    open: (modalName: any, params = {}) => openModal(modalName, params),
    close: (modalName: any) => closeModal(modalName),
  };

  return (
    <NavigationContainer ref={navigation}>
      <CStatusbar
        backgroundColor={'transparent'}
        translucent
        barStyle="dark-content"
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.BottomTab} component={BottomTab} />
        <Stack.Screen name={Routes.AddProduct} component={AddProduct} />
        <Stack.Screen name={Routes.DeleteProduct} component={DeleteProduct} />
        <Stack.Screen name={Routes.EditProduct} component={EditProduct} />
        <Stack.Screen
          name={Routes.EditDetailProduct}
          component={EditDetailProduct}
        />
        <Stack.Screen name={Routes.DetailProduct} component={DetailProduct} />
        <Stack.Screen name={Routes.Cart} component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
