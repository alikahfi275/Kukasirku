import React, {useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import AddProductComponent from '../components/AddProductComponent';
import {AddProductContainerProps} from '../store/type';
import {createProduct, updateProduct} from '../../../components';

const AddProductContainer: React.FC<AddProductContainerProps> = props => {
  const {
    id,
    initialName = '',
    initialPrice = 0,
    initialDescription = '',
    initialImageUrl = '',
    onSubmit,
  } = props;

  const [fotoProduct, setFotoProduct] = useState<string>(initialImageUrl);
  const [name, setName] = useState<string>(initialName);
  const [price, setPrice] = useState<number>(Number(initialPrice));
  const [description, setDescription] = useState<string>(initialDescription);

  const openFile = () => {
    ImageCropPicker.openPicker({
      cropping: true,
      width: 500,
      height: 500,
      cropperCircleOverlay: false,
      includeBase64: true,
    })
      .then((imageResult: any) => {
        const imageUri = `data:${imageResult.mime};base64,${imageResult.data}`;
        setFotoProduct(imageUri);
      })
      .catch(error => {
        console.error('Error picking image:', error);
      });
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateProduct(id, name, price, description, fotoProduct);
        console.warn('Product updated');
      } else {
        await createProduct(name, price, description, fotoProduct);
        setTimeout(() => {
          setDescription('');
          setName('');
          setPrice(0);
          setFotoProduct('');
        });
      }
      onSubmit();
    } catch (error) {}
  };

  return (
    <AddProductComponent
      openFile={openFile}
      handleSubmit={handleSubmit}
      fotoProduct={fotoProduct}
      name={name}
      price={price}
      description={description}
      setName={setName}
      setPrice={setPrice}
      setDescription={setDescription}
    />
  );
};

export default AddProductContainer;
