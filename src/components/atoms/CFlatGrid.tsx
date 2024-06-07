// src/components/ReusableFlatGrid.js

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

interface Props {
  itemDimension: number;
  spacing: number;
  items: any;
  renderItem: any;
  ListHeaderComponent?: any;
  ListFooterComponent?: any;
  keyExtractor: any;
}

const CFlatGrid: React.FC<Props> = ({
  items,
  renderItem,
  itemDimension,
  spacing,
  ListHeaderComponent,
  ListFooterComponent,
  keyExtractor,
  ...props
}) => {
  return (
    <FlatGrid
      itemDimension={itemDimension}
      data={items}
      spacing={spacing}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item: any) => item.id}
      {...props}
    />
  );
};

CFlatGrid.defaultProps = {
  itemDimension: 130,
};

export default CFlatGrid;
