import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, ScrollView, SafeAreaView, Text, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import ss from '../../StyleSheet'

const SavedRewardsListPresenter = ({ savedRewards, navigation }) => (
  <SafeAreaView style={ss.whiteContainer}>
    <View style={[ss.invisiContainer, ss.horizontalPadding]}>
      <View style={[ss.paddingBottom15, ss.bottomBorder]} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={ss.flex1}>
        {!savedRewards
        ? <View style={[ss.invisiContainer, ss.center]}>
            <ActivityIndicator size="small" color="#777" />
          </View>
        : <View style={ss.invisiContainer}>
          {!savedRewards.length
          ? <Text>Images that you've unlocked and saved will display here</Text>
          : <FlatList
              data={savedRewards}
              renderItem={({item}) => {
                const { localPath, fullText, fullSource, iconColor, artist } = item
                const { width } = Dimensions.get('window')
                const size = (width - 60) / 3
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SavedRewardSingle', {localPath, fullText, fullSource, iconColor, artist})}
                    style={{width: size, height: size, margin: 5}}>
                    <Image
                      style={{flex: 1, width: undefined, height: undefined, resizeMode: 'cover', borderRadius: 5}}
                      source={{uri: localPath}} />
                  </TouchableOpacity>
                )
              }}
              keyExtractor={item => item.id}
              numColumns={3} />
          }
          </View>
        }
      </ScrollView>
    </View>
  </SafeAreaView>
)

const mapState = state => ({
  savedRewards: state.savedRewards
})

export default connect(mapState)(SavedRewardsListPresenter)
