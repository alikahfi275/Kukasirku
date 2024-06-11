import React from 'react';
import { StackActions } from '@react-navigation/native';
import { modalRef } from './Stacks';

export const navigation: any = React.createRef();

export const navigationDrawer: any = React.createRef();

const navigate = (routeName: any, params: any = {}) => {
    if (!navigation.current) {
        throw new Error('navigation is null');
    }
    navigation.current.navigate(routeName, params);
};

const reset = (routeName: any, params: any = {}) => {
    if (!navigation.current) {
        throw new Error('navigation is null');
    }
    navigation.current.reset({
        index: 0,
        routes: [{ name: routeName, params }],
    });
};

const back = () => {
    if (!navigation.current) {
        throw new Error('navigation is null');
    }
    navigation.current.goBack();
};

const replace = (routeName: any, params: any = {}) => {
    if (!navigation.current) {
        throw new Error('navigation is null');
    }
    navigation.current.dispatch(StackActions.replace(routeName, params));
};

const push = (routeName: any, params: any = {}) => {
    if (!navigation.current) {
        throw new Error('navigation is null');
    }
    navigation.current.dispatch(StackActions.push(routeName, params));
};

const pop = (step = 1) => {
    if (!navigation.current) {
        throw new Error('navigation is null');
    }
    navigation.current.dispatch(StackActions.pop(step));
};

const popToTop = () => {
    if (!navigation.current) {
        throw new Error('navigation is null');
    }
    navigation.current.dispatch(StackActions.popToTop());
};

const openDrawer = (offset: any) => navigationDrawer.current.openDrawer(offset);

const closeDrawer = () => navigationDrawer.current.closeDrawer();

const showModal = (modalName: any, params: any) =>
    modalRef.current.open(modalName, params);

const closeModal = (modalName: any) => modalRef.current.close(modalName);

// const showLoading = () => store.dispatch(setLoading(true));
// const hideLoading = () => store.dispatch(setLoading(false));

const setDrawerContent = (content: any) =>
    navigationDrawer.current.setDrawerContent(content);

const Route = {
    SplashScreen: 'splashscreen',
    Home: 'home',
    History: 'history',
    Rekap: 'rekap',
    Profile: 'profile',
    BottomTab: 'bottomtab',
    AddProduct: 'addproduct',
    DeleteProduct: 'deleteproduct',
    EditProduct: 'editproduct',
    EditDetailProduct: 'editdetailproduct',
    DetailProduct: 'detailproduct',
    Cart: 'cart',

    // Export Function
    navigate,
    reset,
    back,
    replace,
    push,
    pop,
    popToTop,
    openDrawer,
    closeDrawer,
    setDrawerContent,
    showModal,
    closeModal,
    // showLoading,
    // hideLoading,
};

export default Route;
