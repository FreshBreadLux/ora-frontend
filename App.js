import React from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Asset } from 'expo-asset'
import { Image } from 'react-native'
import { Provider } from 'react-redux'
import Root from './components/Root'
import store from './store'
import Sentry from 'sentry-expo'

Sentry.config('https://912d6f61ddf242e6a1cc008fbfb92369@sentry.io/1236350').install()

/** ASYNC FUNCTIONS FOR LOADING ASSETS ONTO THE PHONE **/
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

// WAIT FOR ASSETS TO BE LOADED
function _loadAssetsAsync() {
  const imageAssets = cacheImages([
    require('./assets/images/Rome/Accept.jpg'),
    require('./assets/images/Rome/Submit.jpg'),
    require('./assets/images/Rome/Profile.jpg'),
    require('./assets/images/Rome/Prayers.jpg'),
    require('./assets/images/Rome/Follows.jpg'),
    require('./assets/images/Rome/Reflection.jpg'),
    require('./assets/images/Mountains/Accept.jpg'),
    require('./assets/images/Mountains/Submit.jpg'),
    require('./assets/images/Mountains/Profile.jpg'),
    require('./assets/images/Mountains/Prayers.jpg'),
    require('./assets/images/Mountains/Follows.jpg'),
    require('./assets/images/Mountains/Reflection.jpg'),
    require('./assets/images/Adoration.jpg'),
    require('./assets/images/Choirs.jpg'),
    require('./assets/images/bobby-headshot.jpg'),
  ])
  const fontAssets = Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    raleway: require('./assets/fonts/Raleway-Regular.ttf'),
    ralewayExtraBold: require('./assets/fonts/Raleway-ExtraBold.ttf'),
    eb: require('./assets/fonts/EBGaramond-Regular.ttf'),
  })
  return Promise.all([...imageAssets, fontAssets])
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
    }
  }

  // ONCE ASSETS ARE LOADED, RENDER THE APP
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={_loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}
