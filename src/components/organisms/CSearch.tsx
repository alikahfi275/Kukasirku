import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <View style={[styles.container, containerStyle]}>
      {icon && (
        <Icon name="search" size={20} style={[styles.icon, iconStyle]} />
      )}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={query}
        onChangeText={handleTextChange}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    flex: 1,
  },
  icon: {
    marginRight: 5,
    color: '#888',
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
  },
});

export default SearchInput;
