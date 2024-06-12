// ReusableFlatList.tsx

import React from 'react';
import {FlatList, ListRenderItem, FlatListProps} from 'react-native';

interface ReusableFlatListProps
  extends Omit<FlatListProps<any>, 'data' | 'renderItem'> {
  data: any[];
  renderItem: ListRenderItem<any>;
}

const CFlatList: React.FC<ReusableFlatListProps> = ({
  data,
  renderItem,
  ...props
}) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      {...props}
    />
  );
};

export default CFlatList;
