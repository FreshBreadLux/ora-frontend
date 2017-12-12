import React from 'react'
import { Animated } from 'react-native'
import PrePrayer from './PrePrayer.js'
import CurrentPrayer from './CurrentPrayer.js'
import axios from 'axios'

const IP_ADDRESS = '172.16.22.196'

export default class Accept extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPrayer: null,
      fadeAnim: new Animated.Value(0)
    }
    this.loadNextPrayer = this.loadNextPrayer.bind(this)
    this.fadeOut = this.fadeOut.bind(this)
  }

  fadeOut() {
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 0, duration: 500}
    ).start()
  }

  loadNextPrayer() {
    axios.get(`http://${IP_ADDRESS}:8080/api/prayers/next`)
    .then(response => response.data)
    .then(prayer => {
      this.setState({currentPrayer: prayer})
      Animated.timing(
        this.state.fadeAnim,
        {toValue: 1, duration: 500}
      ).start()
    })
    .catch(console.error)
  }

  render() {
    if (!this.state.currentPrayer) {
      return (
        <PrePrayer
          loadNextPrayer={this.loadNextPrayer}
        />
      )
    }
    return (
      <CurrentPrayer
        loadNextPrayer={this.loadNextPrayer}
        statePrayer={this.state.currentPrayer}
        fadeOut={this.fadeOut}
      />
    )
  }
}
