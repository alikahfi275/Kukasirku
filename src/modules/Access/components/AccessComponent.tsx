import React from 'react';
import {CButton, CText, CTextInput, CView} from '../../../components';
import {colors} from '../../../property';

const AccessComponent = (props: any) => {
  const {
    valueAccess,
    setValueAccess,
    setMessageValidation,
    isLoading,
    messageValidation,
    submitAccess,
  } = props;

  return (
    <CView flex={1} paddingTop={35} justifyContent="center" alignItems="center">
      <CText
        weight={600}
        fontSize={30}
        marginBottom={10}
        color={colors.teal}
        style={{lineHeight: 30, letterSpacing: 2}}>
        KODE AKSES
      </CText>
      <CTextInput
        placeholder="Masukkan Kode Akses"
        inputStyle={{fontSize: 20}}
        placeholderTextColor={colors.lightgray}
        value={valueAccess}
        onChangeText={t => {
          setValueAccess(t);
          setMessageValidation('');
        }}
      />
      {messageValidation && (
        <CText weight={400} fontSize={16} color={colors.red}>
          {messageValidation}
        </CText>
      )}
      <CButton
        title="Masuk"
        color={colors.white}
        paddingRight={25}
        paddingLeft={25}
        marginTop={20}
        onPress={submitAccess}
        isLoading={isLoading}
      />
    </CView>
  );
};

export default AccessComponent;
