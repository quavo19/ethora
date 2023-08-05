/*
Copyright 2019-2022 (c) Dappros Ltd, registered in England & Wales, registration number 11455432. All rights reserved.
You may not use this file except in compliance with the License.
You may obtain a copy of the License at https://github.com/dappros/ethora/blob/main/LICENSE.
Note: linked open-source libraries and components may be subject to their own licenses.
*/

import {Box, Text} from 'native-base';
import React from 'react';

export const TransactionsListitemDate = ({date}: {date: string}) => {
  return (
    <Box
      bg={'black'}
      w={'100%'}
      h={5}
      justifyContent={'center'}
      alignItems={'center'}>
      <Text color={'white'}>{date}</Text>
    </Box>
  );
};
