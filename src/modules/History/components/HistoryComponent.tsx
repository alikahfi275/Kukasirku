import React from 'react';
import {CHeader, CSearch, CView, ListHistory} from '../../../components';
import {useHistoryStore} from '../store/useHistoryStore';
import {Image} from 'react-native';
import {EmptyPage, colors, sizeScale} from '../../../property';

const HistoryComponent = (props: any) => {
  const {searchQueryHistory, setSearchQueryHistory} = useHistoryStore();
  const {filteredCheckouts} = props;

  return (
    <CView flex={1}>
      <CHeader titleHeader="History" typeHeader="noPrimary" />
      <CView marginRight={15} marginLeft={15}>
        <CSearch
          icon={true}
          placeholder="Search by Order Id ...."
          iconStyle={{color: colors.teal}}
          value={searchQueryHistory}
          onChangeText={text => setSearchQueryHistory(text)}
        />
      </CView>
      {filteredCheckouts.length === 0 ? (
        <CView flex={1} justifyContent="center" alignItems="center">
          <Image
            source={EmptyPage}
            style={{
              width: sizeScale(250),
              height: sizeScale(250),
            }}
          />
        </CView>
      ) : (
        <ListHistory checkouts={filteredCheckouts} />
      )}
    </CView>
  );
};
export default HistoryComponent;
