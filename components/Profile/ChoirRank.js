import React from 'react'
import { Text, View } from 'react-native'
import { determineChoirText } from './DetermineChoirFunc'
import styles from '../StyleSheet'

const ChoirRank = ({ screenProps }) => (
  <View style={[styles.whiteContainer, styles.padding15]}>
    { determineChoirText(screenProps.userTotalPrayers) }
  </View>
)

export default ChoirRank