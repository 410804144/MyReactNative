import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Welcome from '@/pages/welcome'
import Home from '@/pages/Home'
import {useTranslation} from 'react-i18next'

export default function Pages() {

  const {t} = useTranslation()
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Welcome'}>
        <Stack.Screen name={'Welcome'} component={Welcome} options={{headerShown: false}} />
        <Stack.Screen name={'Home'} component={Home} options={{title: t('首页')}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
