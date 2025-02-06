import {Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {
  CButton,
  CHeader,
  CModalSuccesFailed,
  CScrolView,
  CText,
  CTextInput,
  CView,
} from '../../../components';
import {DefaulFood, colors, sizeScale} from '../../../property';
import {useRoute, RouteProp} from '@react-navigation/native';
import {EditDetailProductProps, RootStackParamList} from '../store/type';
import Route from '../../../app/routes/Routes';

const EditDetailProductComponent: React.FC<EditDetailProductProps> = (
  props: any,
) => {
  const {
    changeFotoProduct,
    openFile,
    handleUpdate,
    setShowModalSuccess,
    setShowModalError,
    showModalSuccess,
    showModalError,
  } = props;
  const route = useRoute<RouteProp<RootStackParamList, 'EditDetailProduct'>>();
  const {item} = route.params;
  const {id} = item;
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState<number>(Number(item.price));
  const [description, setDescription] = useState(item.description);
  const [fotoProduct, setFotoProduct] = useState(item.imageUrl);

  return (
    <CView flex={1}>
      <CModalSuccesFailed
        visible={showModalSuccess}
        onConfirm={() => setShowModalSuccess(false)}
        isSuccess
      />
      <CModalSuccesFailed
        visible={showModalError}
        onConfirm={() => setShowModalError(false)}
      />
      <CHeader
        iconLeft="arrow-left"
        titleHeader="Detail Edit Product"
        onPressLeft={() => Route.navigate(Route.EditProduct)}
      />
      <CScrolView
        flex={1}
        backgroundColor={colors.white}
        marginRight={15}
        marginLeft={15}
        marginTop={10}>
        <CView
          style={{alignItems: 'center', justifyContent: 'center'}}
          marginTop={10}
          marginBottom={10}>
          <Image
            source={
              fotoProduct
                ? changeFotoProduct
                  ? {uri: changeFotoProduct}
                  : {uri: fotoProduct}
                : DefaulFood
            }
            style={{
              width: sizeScale(200),
              height: sizeScale(200),
              backgroundColor: colors.lightgray,
              borderRadius: sizeScale(5),
            }}
          />
          <Pressable onPress={openFile}>
            <CText color={colors.lightblue} weight={400} marginTop={10}>
              Ganti Foto
            </CText>
          </Pressable>
        </CView>

        <CTextInput
          placeholder="Product Name"
          label="Product Name"
          value={name}
          onChangeText={setName}
        />
        <CTextInput
          placeholder="Price"
          keyboardType="numeric"
          label="Price"
          value={price.toString()}
          onChangeText={(text: string) => setPrice(Number(text))}
        />
        <CTextInput
          placeholder="Description"
          label="Description"
          numberOfLines={3}
          multiline
          value={description}
          onChangeText={setDescription}
          typeMultiline
        />
        <CButton
          title="Update Product"
          onPress={() =>
            handleUpdate(id, name, price, description, fotoProduct)
          }
          marginTop={20}
          marginBottom={20}
        />
      </CScrolView>
    </CView>
  );
};

export default EditDetailProductComponent;
