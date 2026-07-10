import { View } from 'react-native'
import React from 'react'
import {Text} from '@/components/Text';
import Header from '@/components/Header';

const CheckYourEmailScreen = () => {
  return (
    <View className='flex-1 bg-background pt-safe'>
      <Header />
      <Text>check-your-email</Text>
    </View>
  )
}

export default CheckYourEmailScreen;