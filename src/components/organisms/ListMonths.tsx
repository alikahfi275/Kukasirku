import React from 'react';
import {CScrolView, CText, CView} from '../atoms';
import {colors, horizontalScale, verticalScale} from '../../property';
import {Pressable, TouchableOpacity} from 'react-native';
import Route from '../../app/routes/Routes';
import {useRekapStore} from '../../modules/Rekap/store/useRekapStore';

const ListMonths = () => {
  const {setSelectedMonth} = useRekapStore();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleMonthPress = ({month, index}: any) => {
    setSelectedMonth(index);
    Route.navigate(Route.DetailRekap, {month});
  };
  return (
    <CScrolView flex={1}>
      {months.map((month, index) => (
        <TouchableOpacity
          onPress={() => handleMonthPress({month, index})}
          key={index}
          style={{
            marginTop: index === 0 ? verticalScale(20) : 0,
            marginRight: horizontalScale(15),
            marginLeft: horizontalScale(15),
            marginBottom: verticalScale(20),
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.teal,
          }}>
          <CText
            color={colors.teal}
            weight={400}
            style={{textAlign: 'center'}}
            marginTop={15}
            marginBottom={15}>
            {month.toUpperCase()}
          </CText>
        </TouchableOpacity>
      ))}
    </CScrolView>
  );
};

export default ListMonths;
