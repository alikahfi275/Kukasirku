import React from 'react';
import {CHeader, CText, CView} from '../../../components';
import {colors} from '../../../property';

const ContributionDeveloperComponent: React.FC = (props: any) => {
  const {policyTerms} = props;

  return (
    <CView flex={1}>
      <CHeader titleHeader="Syarat Ketentuan" typeHeader="noPrimary" />
      <CView marginLeft={10} marginRight={15} marginTop={5}>
        {policyTerms.map((item: any) => (
          <CView flexDirection="row" key={item.id} marginTop={5}>
            <CText weight={400} fontSize={16} color={colors.gray}>
              {'-'}{' '}
            </CText>
            <CText
              weight={400}
              fontSize={16}
              color={colors.gray}
              style={{maxWidth: '100%'}}>
              {item.deskripsi}
            </CText>
          </CView>
        ))}
      </CView>

      <CView flex={1} alignItems="center" justifyContent="center">
        <CText weight={600} fontSize={20} color={colors.teal}>
          Terima Kasih
        </CText>
        <CText weight={400} fontSize={20} marginTop={5} color={colors.teal}>
          Powered By Akael Xd Project
        </CText>
      </CView>
    </CView>
  );
};

export default ContributionDeveloperComponent;
