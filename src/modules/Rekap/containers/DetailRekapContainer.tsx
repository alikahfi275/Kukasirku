import React, {useRef, useState} from 'react';
import DetailRekapComponent from '../components/DetailRekapComponent';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';

const DetailRekapContainer: React.FC = () => {
  const viewShotRef = useRef(null);
  const [imageViewShot, setimageViewShot] = useState<string>('');
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

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
      setShowModalSuccess(true);
    } catch (error) {
      setShowModalError(false);
    }
  };

  return (
    <DetailRekapComponent
      captureView={captureView}
      viewShotRef={viewShotRef}
      showModalSuccess={showModalSuccess}
      showModalError={showModalError}
      setShowModalSuccess={setShowModalSuccess}
      setShowModalError={setShowModalError}
    />
  );
};

export default DetailRekapContainer;
