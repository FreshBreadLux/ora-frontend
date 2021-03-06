import React from 'react'
import { connect } from 'react-redux'
import { View, SafeAreaView, Text, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native'
import { ampLogEvent, ampEvents } from '../../analytics'
import { setSurveyCompleted } from '../../../store'
import ss from '../../StyleSheet'

class SurveyPageFiveContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sendingResults: false,
      errorSendingResults: false
    }
    this.handleFinish = this.handleFinish.bind(this)
  }

  async handleFinish() {
    try {
      this.setState({ sendingResults: true })
      await this.props.sendSurveyResults()
      await AsyncStorage.setItem('oraSurveyCompleted', 'true')
      ampLogEvent(ampEvents.COMPLETE_SURVEY)
      this.props.dispatchSetSurveyCompleted()
      this.props.navigation.goBack()
    } catch (error) {
      console.warn(error)
      this.setState({ errorSendingResults: true })
    }
  }

  render() {
    return (
      <View style={ss.whiteContainer}>
        <SafeAreaView style={ss.invisiContainer}>
          <View style={[ss.invisiContainer, ss.padding15, {alignItems: 'center'}]}>
            <Text style={[ss.header, ss.addLargeViewSpacing]}>Thank you!</Text>
            <Text style={[ss.subHeader, ss.fullWidth, ss.addViewSpacing]}>We really appreciate your feedback.</Text>
            <Text style={[ss.subHeader, ss.fullWidth, ss.addViewSpacing]}>While we haven't set up a full subscription service, we have added some small scripture reflections. We hope you enjoy them!</Text>
            {this.state.errorSendingResults
            ? <View style={[ss.fullWidth,ss.addMedViewSpacing, ss.center]}>
                <Text style={[ss.subHeader, ss.fullWidth, ss.centerText, ss.marginBottom20]}>There was an error submitting your response. Please try again later.</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={[ss.newBlueButton, ss.threeQuartersWidth]}>
                  <Text style={[ss.buttonText, ss.whiteText]}>GO BACK</Text>
                </TouchableOpacity>
              </View>
            : <View style={[ss.fullWidth,ss.addMedViewSpacing, ss.center]}>
                <TouchableOpacity
                  onPress={this.handleFinish}
                  style={[ss.newBlueButton, ss.threeQuartersWidth]}>
                  {this.state.sendingResults
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <Text style={[ss.buttonText, ss.whiteText]}>FINISH</Text>
                  }
                </TouchableOpacity>
              </View>
            }
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

const mapDispatch = dispatch => ({
  dispatchSetSurveyCompleted: () => dispatch(setSurveyCompleted())
})

export default connect(null, mapDispatch)(SurveyPageFiveContainer)
