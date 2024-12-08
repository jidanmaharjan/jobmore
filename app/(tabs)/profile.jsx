import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Insight = (props) => {
  return (
    <View style={styles.insight}>
      <Text style={styles.title}>{props.title}</Text>
      <Text>{props.amount} / {props.total}</Text>
    </View>
  )
}

const profile = () => {
  return (
    <View style={styles.container}>
      <Text className="text-blue-400 capitalize" style={styles.heading}>profile</Text>
      <Image source={require('../../assets/images/profile.png')} style={{width: 100, height: 100, borderRadius: 50}} />
      <Text>
        Jidan
      </Text>
      <View style={styles.insightContainer}>

      <Insight title='Carbs' amount='100' total='200g' />
      <Insight title='Protein' amount='202' total='143' />
      <Insight title='Fat' amount='169' total='359g' />
      </View>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gradient orange to white top to bottom
    backgroundColor: 'linear-gradient(to bottom, #FF8C00, #FFFFFF)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'

  },
  insightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  insight: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    gap: 5
  }
})