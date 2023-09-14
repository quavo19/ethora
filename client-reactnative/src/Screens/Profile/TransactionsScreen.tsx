import {observer} from 'mobx-react-lite';
import {View} from 'native-base';
import React, {useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TransactionsList from '../../components/Nft/NftTransactionList';
import SecondaryHeader from '../../components/SecondaryHeader/SecondaryHeader';
import {useStores} from '../../stores/context';
import { MainHeader } from '../../components/MainHeader/MainHeader';

const TransactionsScreen = observer(() => {
  const {walletStore, loginStore} = useStores();
  useEffect(() => {
    walletStore.fetchOwnTransactions(
      loginStore.initialData.walletAddress,
      walletStore.limit,
      0,
    );
    return () => {};
  }, []);

  return (
    <View flex={1} pb={hp('15%')} paddingTop={20} backgroundColor={"black"}>
      <SecondaryHeader title="Transactions" />
      <TransactionsList
        transactions={walletStore.transactions}
        onEndReached={() => {
          if (walletStore.transactions.length < walletStore.total) {
            walletStore.fetchOwnTransactions(
              loginStore.initialData.walletAddress,

              walletStore.limit,
              walletStore.offset,
            );
          }
        }}
        walletAddress={loginStore.initialData.walletAddress}
      />
      <MainHeader />
    </View>
  );
});

export default TransactionsScreen;
