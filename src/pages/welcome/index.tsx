import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Color} from '@/constants'
import {useTranslation} from 'react-i18next'
import {StackScreenProps} from '@react-navigation/stack'

/** 欢迎页 */
export default function Welcome({navigation}: StackScreenProps<any>) {

  const {t} = useTranslation()
  const [second, setSecond] = useState<any>(0)

  useEffect(() => {
    // 定时3秒跳转到首页
    let remain = 3
    setSecond(remain)
    const intervalId = setInterval(() => {
      remain -= 1
      if (remain <= 0) {
        navigation.replace('Home')
        clearInterval(intervalId)
      } else {
        setSecond(remain)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('欢迎')}</Text>
      {second > 0 && <Text style={styles.text}>{'(' + second + ')'}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
