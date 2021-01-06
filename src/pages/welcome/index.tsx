import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Color} from '@/constants'

/** 欢迎页 */
export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Welcome'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    color: Color.text,
    fontWeight: '500',
  },
})
