import React, {useEffect, useState} from 'react';
import EditProfileComponent from '../components/EditProfileComponent';
import ImageCropPicker from 'react-native-image-crop-picker';
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
  const {setDisplayPhotoUrl, setPhotoBase64} = useProfileStore();

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
        setPhotoBase64(imageResult.data);
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
      } else {
        await createStoreProfile(photoUrl, storeName, storePhone, storeAddress);
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
