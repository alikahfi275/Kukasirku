import React from 'react';
import ContributionDeveloperComponent from '../components/ContributionDevelopersComponent';
import {ToastAndroid} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {LogoOvo, LogoShopeePay} from '../../../property';

interface ContributionDeveloperContainerProps {
  listPayment: [];
  copyToClipboard: (item: any) => void;
}

const ContributionDeveloperContainer: React.FC<
  ContributionDeveloperContainerProps
> = () => {
  const listPayment: any = [
    {id: '1', value: '08987165755', logo: LogoShopeePay},
    {id: '2', value: '08987165755', logo: LogoOvo},
  ];

  const copyToClipboard = (item: any) => {
    ToastAndroid.show(`${item.value} Berhasil Dicopy`, ToastAndroid.SHORT);
    Clipboard.setString(item.value);
  };
  return (
    <ContributionDeveloperComponent
      listPayment={listPayment}
      copyToClipboard={copyToClipboard}
    />
  );
};

export default ContributionDeveloperContainer;
