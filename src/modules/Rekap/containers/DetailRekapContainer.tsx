import React, {useRef, useState} from 'react';
import DetailRekapComponent from '../components/DetailRekapComponent';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {AlertError, AlertSuccsess} from '../../../components';

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
      AlertSuccsess('Berhasil Menyimpan Ke Gallery');
    } catch (error) {
      AlertError('Gagal Menyimpan Ke Gallery');
    }
  };

  return (
    <DetailRekapComponent captureView={captureView} viewShotRef={viewShotRef} />
  );
};

export default DetailRekapContainer;
