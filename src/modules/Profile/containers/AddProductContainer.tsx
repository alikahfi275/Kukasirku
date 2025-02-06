import React, {useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import AddProductComponent from '../components/AddProductComponent';
import {AddProductContainerProps} from '../store/type';
import {createProduct, updateProduct} from '../store/ProfileService';

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
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

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
      .catch(error => {});
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateProduct(id, name, price, description, fotoProduct);
        setShowModalSuccess(true);
      } else {
        await createProduct(name, price, description, fotoProduct);
        setShowModalSuccess(true);
        setTimeout(() => {
          setDescription('');
          setName('');
          setPrice(0);
          setFotoProduct('');
        }, 500);
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
      showModalSuccess={showModalSuccess}
      showModalError={showModalError}
      setShowModalSuccess={setShowModalSuccess}
      setShowModalError={setShowModalError}
    />
  );
};

export default AddProductContainer;
