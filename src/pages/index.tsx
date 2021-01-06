import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Welcome from '@/pages/welcome'

export default function Pages() {

  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Welcome'}>
        <Stack.Screen name={'Welcome'} component={Welcome} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
