import React from 'react';
import EditDetailProductComponent from '../components/EditDetailProductComponent';
import ImageCropPicker from 'react-native-image-crop-picker';
import {EditDetailContainerProps} from '../store/type';
import Route from '../../../app/routes/Routes';
import {updateProduct} from '../store/ProfileService';
import {modalError, modalSuccess} from '../../../components';

const EditDetailContainer: React.FC<EditDetailContainerProps> = props => {
  const {onSubmit} = props;
  const [changeFotoProduct, setChangeFotoProduct] = React.useState<string>('');

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
        setChangeFotoProduct(imageUri);
      })
      .catch(error => {
        console.error('Error picking image:', error);
      });
  };

  const handleUpdate = async (
    id: string,
    name: string,
    price: number,
    description: string,
    fotoProduct: string,
  ) => {
    try {
      if (id) {
        await updateProduct(
          id,
          name,
          price,
          description,
          changeFotoProduct || fotoProduct || '',
        );

        setTimeout(() => {
          Route.navigate(Route.EditProduct);
        }, 1000);
      }
      onSubmit();
    } catch (error) {}
  };

  return (
    <EditDetailProductComponent
      openFile={openFile}
      handleUpdate={handleUpdate}
      changeFotoProduct={changeFotoProduct}
    />
  );
};

export default EditDetailContainer;
