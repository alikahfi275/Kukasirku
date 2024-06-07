import React from 'react';
import {StyleSheet, Image, Pressable} from 'react-native';
import {CFlatGrid, CText, CView} from '../atoms';
import {
  colors,
  formatRupiah,
  horizontalScale,
  verticalScale,
} from '../../property';
import {deleteProduct} from '../molecules';
import Route from '../../app/routes/Routes';

interface Item {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}
interface ListProductProps {
  products: Item[];
  isDelete?: boolean;
  onDelete?: any;
  isEdit?: boolean;
}

const ListProduct: React.FC<ListProductProps> = props => {
  const {products = [], isDelete = false, onDelete, isEdit} = props;
  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    onDelete();
  };

  const renderItem = ({item}: {item: Item}) => (
    <CView
      backgroundColorStatusBar={colors.white}
      barStyle="dark-content"
      style={{
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: colors.lightgray,
      }}
      key={item.id}>
      <Image
        source={{uri: item.imageUrl}}
        style={{
          width: '100%',
          height: 150,
          resizeMode: 'cover',
          borderTopRightRadius: 3,
          borderTopLeftRadius: 3,
        }}
      />
      <CText marginTop={5} marginLeft={5} weight={500}>
        {item.name.substring(0, 20)}
      </CText>
      <CText marginLeft={5} weight={500} color={colors.gray}>
        {formatRupiah(item.price)}
      </CText>
      <CText marginLeft={5} weight={400} color={colors.gray} fontSize={12}>
        {item.description.substring(0, 20) + '...'}
      </CText>
      <Pressable
        style={{
          backgroundColor: isDelete
            ? colors.red1
            : isEdit
            ? colors.white
            : colors.teal,
          padding: 10,
          marginBottom: verticalScale(5),
          marginTop: verticalScale(5),
          marginLeft: horizontalScale(5),
          marginRight: horizontalScale(5),
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: isEdit ? 1.5 : 0,
          borderColor: isEdit ? colors.teal : null,
        }}
        onPress={() =>
          isDelete
            ? handleDelete(item.id)
            : isEdit
            ? Route.navigate(Route.EditDetailProduct, {item})
            : null
        }>
        <CText color={isEdit ? colors.teal : colors.white} weight={600}>
          {isDelete ? 'Delete' : isEdit ? 'Edit' : 'Add To Cart'}
        </CText>
      </Pressable>
    </CView>
  );

  return (
    <CView
      style={styles.container}
      backgroundColorStatusBar={colors.white}
      barStyle="dark-content">
      <CFlatGrid
        items={products}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
        itemDimension={120}
        spacing={15}
      />
    </CView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: colors.teal,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListProduct;
