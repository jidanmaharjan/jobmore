import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const Home = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])
  if( loading) {
    return (
      <View style={
        styles.container
      }>
      <ActivityIndicator size={'large'} color={'orange'} />
      </View>
    )
  }
  return (
    <View style={
      styles.container
    }>
      <Text className="text-red-400">MAIN</Text>
      <StatusBar />
      <Link href='/profile' style={{color: 'blue'}}>GO TO PROFILE</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})