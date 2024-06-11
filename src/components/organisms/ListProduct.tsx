import React, {useState} from 'react';
import {StyleSheet, Image, Pressable} from 'react-native';
import {CFlatGrid, CText, CView} from '../atoms';
import {
  colors,
  formatRupiah,
  horizontalScale,
  verticalScale,
} from '../../property';
import {CModal, deleteProduct} from '../molecules';
import Route from '../../app/routes/Routes';
import {useCartStore} from '../../modules/Home/store/useHomeStore';

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
  onDelete?: () => void;
  isEdit?: boolean;
  onPressDetail?: boolean;
}

const ListProduct: React.FC<ListProductProps> = props => {
  const {
    products = [],
    isDelete = false,
    onDelete,
    isEdit,
    onPressDetail = false,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);
  const addToCart = useCartStore(state => state.addToCart);

  const openModal = (product: Item) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      onDelete && onDelete();
      closeModal();
    }
  };

  const renderItem = ({item}: {item: Item}) => (
    <CView
      style={{
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: colors.lightgray,
      }}
      key={item.id}>
      <Pressable
        onPress={() => Route.navigate(Route.DetailProduct, {itemId: item.id})}
        disabled={onPressDetail ? false : true}>
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
      </Pressable>
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
            ? openModal(item)
            : isEdit
            ? Route.navigate(Route.EditDetailProduct, {item})
            : addToCart(item)
        }>
        <CText color={isEdit ? colors.teal : colors.white} weight={600}>
          {isDelete ? 'Delete' : isEdit ? 'Edit' : 'Add To Cart'}
        </CText>
      </Pressable>
    </CView>
  );

  return (
    <CView style={styles.container}>
      <CFlatGrid
        items={products}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
        itemDimension={150}
        spacing={15}
      />
      <CModal
        visible={modalVisible}
        onClose={closeModal}
        Title="Apakah Anda yakin ingin menghapus ?"
        onConfirm={handleDelete}
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
