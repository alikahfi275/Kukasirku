import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CView} from '../atoms';
import {horizontalScale, verticalScale} from '../../property';

interface SearchInputProps extends TextInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  containerStyle?: object;
  inputStyle?: object;
  iconStyle?: object;
  icon?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  onSearch,
  containerStyle,
  inputStyle,
  iconStyle,
  icon = false,
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
      style={[styles.container, containerStyle]}>
      {icon && (
        <Icon
          name="search"
          size={20}
          style={[
            {
              icon: {
                marginRight: horizontalScale(8),
                color: '#888',
              },
            },
            iconStyle,
          ]}
        />
      )}
      <TextInput
        style={[
          {
            flex: 1,
            fontSize: 16,
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flex: 1,
  },
});

export default SearchInput;
