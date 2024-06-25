import React from 'react';
import {CFlatList, CHeader, CIcon, CText, CView} from '../../../components';
import {colors, horizontalScale, sizeScale} from '../../../property';
import {Image} from 'react-native';

interface ContributionDeveloperComponentProps {
  listPayment: [];
  copyToClipboard: (item: any) => void;
}

const ContributionDeveloperComponent: React.FC<
  ContributionDeveloperComponentProps
> = props => {
  const {listPayment, copyToClipboard} = props;

  return (
    <CView flex={1}>
      <CHeader titleHeader="Contribution To Developer" typeHeader="noPrimary" />
      <CFlatList
        data={listPayment}
        renderItem={({item}) => (
          <CView
            borderWidth={1}
            borderColor={colors.teal}
            marginRight={20}
            marginTop={30}
            marginLeft={20}
            borderRadius={10}
            padding={15}>
            <Image
              source={item.logo}
              style={{
                width: sizeScale(90),
                height: sizeScale(40),
                resizeMode: 'contain',
                backgroundColor: 'white',
                marginTop: -40,
                marginBottom: 10,
              }}
            />
            <CView flexDirection="row">
              <CText weight={400} fontSize={20} style={{flex: 1}}>
                {item.value}
              </CText>
              <CIcon
                name="content-copy"
                size={25}
                style={{
                  marginRight: horizontalScale(10),
                  marginLeft: horizontalScale(10),
                }}
                color={colors.teal}
                onPress={() => copyToClipboard(item)}
              />
            </CView>
          </CView>
        )}
      />
      <CView flex={1} alignItems="center" justifyContent="center">
        <CText weight={600} fontSize={20} color={colors.teal}>
          Terima Kasih
        </CText>
      </CView>
    </CView>
  );
};

export default ContributionDeveloperComponent;
