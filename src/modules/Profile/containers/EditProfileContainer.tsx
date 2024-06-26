import React, {useEffect, useState} from 'react';
import EditProfileComponent from '../components/EditProfileComponent';
import ImageCropPicker from 'react-native-image-crop-picker';
import {AlertSuccsess} from '../../../components';
import {useProfileStore} from '../store/useProfileStore';
import {
  createStoreProfile,
  getStoreProfile,
  updateStoreProfile,
} from '../store/ProfileService';

interface EditProfileContainerProps {}

const EditProfileContainer: React.FC<EditProfileContainerProps> = props => {
  const [id, setId] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const {setDisplayPhotoUrl} = useProfileStore();

  useEffect(() => {
    const fetchStoreProfile = async () => {
      try {
        const profile = await getStoreProfile();
        if (profile) {
          setId(profile.id);
          setPhotoUrl(profile.photoUrl);
          setStoreName(profile.storeName);
          setStorePhone(profile.storePhone);
          setStoreAddress(profile.storeAddress);
        }
      } catch (error) {}
    };

    fetchStoreProfile();
  }, [id]);

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
        setPhotoUrl(imageUri);
        setDisplayPhotoUrl(imageUri);
      })
      .catch(error => {});
  };

  const handleSave = async () => {
    try {
      if (id) {
        await updateStoreProfile(
          id,
          photoUrl,
          storeName,
          storePhone,
          storeAddress,
        );
        AlertSuccsess('Data Berhasil Diupdate');
      } else {
        await createStoreProfile(photoUrl, storeName, storePhone, storeAddress);
        AlertSuccsess('Data Berhasil Disimpan');
      }
    } catch (error) {}
  };

  return (
    <EditProfileComponent
      openFile={openFile}
      handleSave={handleSave}
      photoUrl={photoUrl}
      storeName={storeName}
      storePhone={storePhone}
      storeAddress={storeAddress}
      setStoreName={setStoreName}
      setStorePhone={setStorePhone}
      setStoreAddress={setStoreAddress}
    />
  );
};

export default EditProfileContainer;
