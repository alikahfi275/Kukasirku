import React from 'react';
import {Image, Pressable} from 'react-native';
import {
  CButton,
  CHeader,
  CText,
  CTextInput,
  CView,
  CScrolView,
} from '../../../components';
import {DefaulFood, colors, sizeScale} from '../../../property';
import {AddProductComponentProps} from '../store/type';
import Route from '../../../app/routes/Routes';

const AddProductComponent: React.FC<AddProductComponentProps> = props => {
  const {
    fotoProduct,
    name,
    price,
    description,
    setName,
    setPrice,
    setDescription,
    openFile,
    handleSubmit,
  } = props;

  return (
    <CView flex={1}>
      <CHeader
        iconLeft="arrow-left"
        titleHeader="Tambah Product"
        onPressLeft={() => Route.navigate(Route.Profile)}
      />
      <CScrolView
        flex={1}
        backgroundColor={colors.white}
        marginRight={15}
        marginLeft={15}
        paddingTop={10}>
        <CView
          style={{alignItems: 'center', justifyContent: 'center'}}
          marginTop={10}
          marginBottom={10}>
          <Image
            source={fotoProduct ? {uri: fotoProduct} : DefaulFood}
            style={{
              width: sizeScale(200),
              height: sizeScale(200),
              borderRadius: sizeScale(5),
            }}
          />
          <Pressable onPress={openFile}>
            <CText color={colors.lightblue} weight={400} marginTop={10}>
              Tambahkan Foto
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
          label="Price"
          keyboardType="numeric"
          value={price.toString()}
          onChangeText={text => setPrice(Number(text))}
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
          title="Add Product"
          onPress={handleSubmit}
          marginTop={20}
          marginBottom={20}
        />
      </CScrolView>
    </CView>
  );
};

export default AddProductComponent;
