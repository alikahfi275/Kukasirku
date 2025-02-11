import React from 'react';
import {CButton, CView, ListRekap, CLoading, CModal} from '../../../components';
import {useRoute} from '@react-navigation/native';
import {colors} from '../../../property';
import {useRekapStore} from '../store/useRekapStore';
import Route from '../../../app/routes/Routes';

interface DetailRekapComponentProps {
  viewShotRef: any;
  captureView: () => void;
}

const DetailRekapComponent: React.FC<DetailRekapComponentProps> = (
  props: any,
) => {
  const {
    viewShotRef,
    captureView,
    printLabel,
    showModalCetak,
    setShowModalCetak,
  } = props;
  const {params} = useRoute<any>();
  const {month} = params;
  const {loading} = useRekapStore();

  return (
    <CView flex={1}>
      <CView flex={1}>
        <CModal
          visible={showModalCetak}
          onConfirm={() => {
            Route.navigate(Route.BluetoothPrint);
            setShowModalCetak(false);
          }}
          onClose={() => setShowModalCetak(false)}
          Title="Harap Koneksikan Ke Printer Bluetooth"
        />
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
          onPress={printLabel}
          style={{flex: 1}}
          marginLeft={15}
        />
      </CView>
    </CView>
  );
};

export default DetailRekapComponent;
