import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { GroupScrollPresenter } from '../../presenters'
import ss from '../../StyleSheet'

/*
  TODO: This is a placeholder presentational standin; I need to make it functional
*/
class GroupScrollContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <GroupScrollPresenter navigation={this.props.navigation} />
    )
  }
}

export default GroupScrollContainer
