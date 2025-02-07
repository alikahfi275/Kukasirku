import React, {useRef, useState} from 'react';
import DetailRekapComponent from '../components/DetailRekapComponent';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {modalError, modalSuccess} from '../../../components';

const DetailRekapContainer: React.FC = () => {
  const viewShotRef = useRef(null);
  const [imageViewShot, setimageViewShot] = useState<string>('');

  const captureView = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: 'jpg',
        quality: 0.8,
      });
      setimageViewShot(uri);
      const filePath = `${
        RNFS.PicturesDirectoryPath
      }/capture_${Date.now()}.jpg`;
      await RNFS.copyFile(uri, filePath);
      modalSuccess('Berhasil disimpan digallery');
    } catch (error) {
      modalError('Gagal disimpan digallery');
    }
  };

  return (
    <DetailRekapComponent captureView={captureView} viewShotRef={viewShotRef} />
  );
};

export default DetailRekapContainer;
