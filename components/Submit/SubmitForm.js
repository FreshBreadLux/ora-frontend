import React from 'react'
import tcomb from 'tcomb-form-native'
import axios from 'axios'
import { View, Text, TouchableOpacity, AsyncStorage, StyleSheet, Keyboard } from 'react-native'
import IP_ADDRESS from '../../config'

const Form = tcomb.form.Form
const Prayer = tcomb.struct({
  subject: tcomb.String,
  body: tcomb.String,
})

export default class SubmitForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      body: '',
      prayerSent: false,
    }
    this.submitPrayer = this.submitPrayer.bind(this)
  }

  submitPrayer() {
    Keyboard.dismiss()
    axios.post(`http://${IP_ADDRESS}:8080/api/prayers`, {
      userId: this.props.userId,
      subject: this.state.subject,
      body: this.state.body,
    })
    .then(() => {
      this.setState({
        subject: '',
        body: '',
        prayerSent: true,
      })
    })
    .catch(console.error)
  }

  render() {
    return (
      <View style={styles.submit}>
        { this.state.prayerSent
          ? <Text>Your prayer has been submitted</Text>
          : null }
        <Form
          ref="form"
          type={Prayer}
          options={{
            auto: 'placehodlers',
            fields: {
              subject: {
                label: 'Subject',
                onSubmitEditing: () => this.refs.form.getComponent('body').refs.input.focus(),
                placeholderTextColor: '#777',
              },
              body: {
                label: 'Body',
                placeholderTextColor: '#777',
              },
            }
          }}
        />
        <TouchableOpacity
          onPress={this.submitPrayer}
        >
          <Text>Submit Prayer</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  submit: {
    flex: 1,
    justifyContent: 'center',
  }
})