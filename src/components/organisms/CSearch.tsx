import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CView} from '../atoms';
import {fontSizeScale, horizontalScale, verticalScale} from '../../property';

interface SearchInputProps extends TextInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  containerStyle?: object;
  inputStyle?: object;
  iconStyle?: object;
  icon?: boolean;
  typeSearch?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  onSearch,
  containerStyle,
  inputStyle,
  iconStyle,
  icon = false,
  typeSearch = 'default',
  ...props
}) => {
  const [query, setQuery] = useState('');

  const handleTextChange = (text: string) => {
    setQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <CView
      paddingRight={10}
      paddingLeft={10}
      marginTop={10}
      marginBottom={10}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          justifyContent: 'center',
          flex: typeSearch === 'default' ? 0 : 1,
          color: '#333',
        },
        ,
        containerStyle,
      ]}>
      {icon && (
        <Icon name="search" size={fontSizeScale(20)} style={[{}, iconStyle]} />
      )}
      <TextInput
        style={[
          {
            flex: 1,
            fontSize: 14,
            height: verticalScale(30),
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        value={query}
        onChangeText={handleTextChange}
        {...props}
      />
    </CView>
  );
};

const styles = StyleSheet.create({});

export default SearchInput;
