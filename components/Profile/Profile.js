import React from 'react'
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, AsyncStorage, AlertIOS } from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../../store'
import { determineChoirTitle, determineChoirName } from './DetermineChoirFunc'
import ss from '../StyleSheet'
import { LinearGradient } from 'expo'
import { Feather } from '@expo/vector-icons'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.userLogout = this.userLogout.bind(this)
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('oraAuth')
      this.props.logUserOut()
      AlertIOS.alert('Logout Successful')
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message)
    }
  }

  render() {
    const { userInfo, isLoggedIn, navigation } = this.props
    return (
      <View style={ss.invisiContainer}>
        <View style={ss.backgroundImageFrame}>
          <Image
            source={require('../../assets/images/Rome-Profile.jpg')}
            style={ss.backgroundImage} />
        </View>
        {isLoggedIn
        ? <ScrollView
            showsVerticalScrollIndicator={false}>
            <SafeAreaView style={ss.invisiContainer}>
              <LinearGradient
                colors={['transparent', '#fff']}
                start={[0.5, 0.2]}
                end={[0.5, 0.8]}
                style={ss.flex1}>
                <View style={ss.padding15}>
                  <View style={ss.proflileHeader}>
                    <Text style={ss.header}>PROFILE</Text>
                  </View>
                  <View style={[ss.addViewSpacing, ss.fullWidth, ss.center]}>
                    { determineChoirName(userInfo.totalPrayers) }
                    <TouchableOpacity
                      style={[ss.button, ss.halfWidth]}
                      onPress={() => navigation.navigate('ChoirRank', { userTotalPrayers: userInfo.totalPrayers })}>
                      { determineChoirTitle(userInfo.totalPrayers) }
                    </TouchableOpacity>
                  </View>
                  <View style={ss.addLargeViewSpacing}>
                    <Text style={[ss.subHeader, ss.whiteText]}>{`${userInfo.email}`}</Text>
                  </View>
                  <View style={ss.consecutiveDays}>
                    <Text style={ss.subHeader}>Consecutive{'\n'}Days Praying</Text>
                    <Text style={ss.subHeader}>{userInfo.consecutiveDays}</Text>
                  </View>
                  <View style={ss.addLargeViewSpacing}>
                    <Text style={[ss.subHeader, ss.whiteText]}>Prayers{'\n'}Accepted</Text>
                    <Text style={ss.choirName}>{userInfo.totalPrayers}</Text>
                  </View>
                  <View style={[ss.addViewSpacing]}>
                    <TouchableOpacity
                      style={[ss.button, ss.fullWidth, ss.row, ss.spaceBetween]}
                      onPress={() => navigation.navigate('Donate')}>
                      <Text style={ss.buttonText}>donate</Text>
                      <Feather
                        name="chevron-right"
                        size={26} />
                    </TouchableOpacity>
                  </View>
                  <View style={[ss.addViewSpacing]}>
                    <TouchableOpacity
                      style={[ss.button, ss.fullWidth, ss.row, ss.spaceBetween]}
                      onPress={() => navigation.navigate('ManageAlarms')}>
                      <Text style={ss.buttonText}>manage your alarms</Text>
                      <Feather
                        name="chevron-right"
                        size={26} />
                    </TouchableOpacity>
                  </View>
                  <View style={[ss.addViewSpacing]}>
                    <TouchableOpacity
                      style={[ss.button, ss.fullWidth, ss.row, ss.spaceBetween]}
                      onPress={() => navigation.navigate('About')}>
                      <Text style={ss.buttonText}>learn more about Ora</Text>
                      <Feather
                        name="chevron-right"
                        size={26} />
                    </TouchableOpacity>
                  </View>
                  <View style={[ss.addMedViewSpacing, ss.darkBottomBorder]}>
                    <Text style={[ss.subHeader]}>Themes (pending feature)</Text>
                  </View>
                  <View style={[ss.addMedViewSpacing, ss.row, ss.spaceBetween]}>
                    <View style={ss.center}>
                      <View style={ss.thumbnail}>
                      <Image
                        style={ss.backgroundImage}
                        source={require('../../assets/images/Rome.jpg')} />
                      </View>
                      <Text style={[ss.subBody, ss.padding10]}>Rome</Text>
                    </View>
                    <View style={ss.center}>
                      <View style={ss.thumbnail}>
                      <Image
                        style={ss.backgroundImage}
                        source={require('../../assets/images/Adoration.jpg')} />
                      </View>
                      <Text style={[ss.subBody, ss.padding10]}>Adoration</Text>
                    </View>
                    <View style={ss.center}>
                      <View style={ss.thumbnail}>
                      <Image
                        style={ss.backgroundImage}
                        source={require('../../assets/images/Paintings.jpg')} />
                      </View>
                      <Text style={[ss.subBody, ss.padding10]}>Paintings</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
              <View style={[ss.editHeight, ss.center]}>
                <Text style={[ss.body, ss.blackTextShadow, ss.whiteText, ss.centerText, ss.threeQuarterWidth]}>The smoke of the incense along with the prayers of the holy ones went up before God from the hand of the angel.</Text>
                <Text style={[ss.body, ss.blackTextShadow, ss.whiteText]}>- Revelation 8:4</Text>
              </View>
              <View style={[ss.addLargeViewSpacing, ss.whiteContainer, ss.center]}>
                <TouchableOpacity
                  style={[ss.halfWidth, ss.blackButton]}
                  onPress={this.userLogout}>
                  <Text style={[ss.buttonText, ss.whiteText]}>logout</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </ScrollView>
        : <SafeAreaView style={ss.invisiContainer}>
            <View style={[
              ss.flex1, ss.center, ss.padding15]}>
              <TouchableOpacity
                style={[ss.button, ss.fullWidth]}
                onPress={() => navigation.navigate('Submit')}>
                  <Text style={[ss.buttonText, ss.centerText]}>sign up or login to view your profile</Text>
                </TouchableOpacity>
            </View>
          </SafeAreaView>
        }
      </View>
    )
  }
}

const mapState = state => ({
  userInfo: state.userInfo,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatch = dispatch => ({
  logUserOut() {
    dispatch(logout())
  },
})

export default connect(mapState, mapDispatch)(Profile)
