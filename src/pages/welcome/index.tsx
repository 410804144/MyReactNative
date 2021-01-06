import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Color} from '@/constants'
import {useTranslation} from 'react-i18next'

/** 欢迎页 */
export default function Welcome() {

  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('欢迎')}</Text>
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
