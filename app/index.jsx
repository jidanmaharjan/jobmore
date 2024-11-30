import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-web'

const Home = () => {
  return (
    <SafeAreaView style={
      {
        flex: 1,
        backgroundColor: 'white'
      }
    }>
      <Text>MAIN</Text>
      <StatusBar />
      <Link href='/profile' style={{color: blue}}>GO TO PROFILE</Link>
    </SafeAreaView>
  )
}

export default Home