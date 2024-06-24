import React from 'react';
import {CButton, CView, ListRekap, CLoading} from '../../../components';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../../property';
import {useRekapStore} from '../store/useRekapStore';

interface DetailRekapComponentProps {
  viewShotRef: any;
  captureView: () => void;
}

const DetailRekapComponent: React.FC<DetailRekapComponentProps> = props => {
  const {viewShotRef, captureView} = props;
  const {params} = useRoute<any>();
  const {month} = params;
  const {loading} = useRekapStore();

  return (
    <CView flex={1}>
      <CView flex={1}>
        <CLoading visible={loading} />
        <ListRekap month={month} viewShotRef={viewShotRef} />
      </CView>
      <CView
        flexDirection="row"
        marginBottom={20}
        marginRight={20}
        marginLeft={20}>
        <CButton
          title="Simpan"
          onPress={captureView}
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: colors.teal,
          }}
          color={colors.teal}
          marginRight={15}
        />
        <CButton
          title="Cetak"
          onPress={() => {}}
          style={{flex: 1}}
          marginLeft={15}
        />
      </CView>
    </CView>
  );
};

export default DetailRekapComponent;
