import {Image, Pressable} from 'react-native';
import React from 'react';
import {CIcon, CText, CView} from '../../../components';
import {
  colors,
  formatRupiah,
  horizontalScale,
  verticalScale,
} from '../../../property';
import Route from '../../../app/routes/Routes';
import {DetailProductComponentProps} from '../store/type';

const DetailProductComponent: React.FC<DetailProductComponentProps> = ({
  item,
}: any) => {
  return (
    <CView flex={1}>
      <Pressable
        style={{
          position: 'absolute',
          height: horizontalScale(40),
          width: verticalScale(40),
          zIndex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          marginTop: verticalScale(30),
          marginLeft: horizontalScale(20),
          backgroundColor: colors.white,
        }}
        onPress={() => Route.navigate(Route.Home)}>
        <CIcon name="arrow-left" size={20} color="#000" />
      </Pressable>
      <Image
        source={{uri: item.imageUrl}}
        style={{
          width: '100%',
          height: horizontalScale(300),
          resizeMode: 'cover',
        }}
      />
      <CText
        marginTop={5}
        marginLeft={15}
        marginRight={15}
        weight={500}
        fontSize={30}>
        {item.name}
      </CText>
      <CText
        marginLeft={15}
        weight={500}
        marginRight={15}
        color={colors.gray}
        fontSize={30}>
        {formatRupiah(item.price)}
      </CText>
      <CText
        marginLeft={15}
        marginRight={15}
        weight={400}
        marginTop={10}
        color={colors.gray}
        fontSize={18}>
        {item.description}
      </CText>
    </CView>
  );
};

export default DetailProductComponent;
