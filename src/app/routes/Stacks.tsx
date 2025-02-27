import React, {useEffect} from 'react';
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
import EditProfileContainer from '../../modules/Profile/containers/EditProfileContainer';
import DetailRekapContainer from '../../modules/Rekap/containers/DetailRekapContainer';
import StrukContainer from '../../modules/Home/containers/StrukContainer';
import ContributionDeveloperContainer from '../../modules/Profile/containers/ContributionDeveloperContainer';
import BluetoothContainer from '../../modules/Profile/containers/BluetoothContainer';
import AccessContainer from '../../modules/Access/containers/AccessContainer';
import NotAccessContainer from '../../modules/Access/containers/NotAccessContainer';

// Statusbar Default
import {CStatusbar} from '../../components';
import {getStoreProfile} from '../../modules/Profile/store/ProfileService';
import Route from './Routes';

// Re-Wrapped Screens
const AddProduct = AddProductContainer;
const DeleteProduct = DeleteProductContainer;
const EditProduct = EditProductContainer;
const EditDetailProduct = EditDetailProductContainer;
const DetailProduct = DetailProductContainer;
const Cart = CartContainer;
const EditProfile = EditProfileContainer;
const DetailRekap = DetailRekapContainer;
const Struk = StrukContainer;
const ContributionDeveloper = ContributionDeveloperContainer;
const BluetoothPrint = BluetoothContainer;
const Access = AccessContainer;
const NotAccess = NotAccessContainer;

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

  useEffect(() => {
    const fetchStoreProfile = async () => {
      try {
        const profile = await getStoreProfile();

        if (profile?.isAccess) {
          Route.navigate(Route.BottomTab);
        } else {
          Route.navigate(Route.Access);
        }
      } catch (error) {}
    };

    fetchStoreProfile();
  }, [Route]);

  return (
    <NavigationContainer ref={navigation}>
      <CStatusbar
        backgroundColor={'transparent'}
        translucent
        barStyle="dark-content"
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.Access} component={Access} />
        <Stack.Screen name={Routes.NotAccess} component={NotAccess} />
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
        <Stack.Screen name={Routes.EditProfile} component={EditProfile} />
        <Stack.Screen name={Routes.DetailRekap} component={DetailRekap} />
        <Stack.Screen name={Routes.Struk} component={Struk} />
        <Stack.Screen name={Routes.BluetoothPrint} component={BluetoothPrint} />
        <Stack.Screen
          name={Routes.ContributionDeveloper}
          component={ContributionDeveloper}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
