import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, TextInput, Keyboard, SafeAreaView, KeyboardAvoidingView, AlertIOS } from 'react-native'
import Modal from 'react-native-modal'
import styles from '../StyleSheet'
import { OpenModalContent, CloseModalContent } from './Modals'

const SinglePrayer = ({ prayer, toggleEdit, togglePrayer, setModal, visibleModal }) => (
  <View style={[styles.invisiContainer, styles.padding15]}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={[styles.font16, styles.paddingBottom10]}>{`${prayer.body}`}</Text>
    </ScrollView>
    <View style={[styles.row, styles.spaceBetween, styles.viewTopBorder]}>
      <Text style={styles.font16}>{`Total Views: ${prayer.totalViews}`}</Text>
      <Text style={styles.font16}>{`Total Follows: ${prayer.totalFollows}`}</Text>
    </View>
    <View style={styles.center}>
      <TouchableOpacity
        onPress={toggleEdit}
        style={[styles.blackButton, styles.halfWidth]}>
        <Text style={[styles.buttonText, styles.whiteText]}>Edit</Text>
      </TouchableOpacity>
    </View>
    {prayer.closed
      ? <View style={styles.center}>
          <TouchableOpacity
            onPress={() => setModal('open')}
            style={[styles.blackButton, styles.halfWidth]}>
            <Text style={[styles.buttonText, styles.whiteText]}>Open Prayer</Text>
          </TouchableOpacity>
        </View>
      : <View style={styles.center}>
          <TouchableOpacity
            onPress={() => setModal('close')}
            style={[styles.blackButton, styles.halfWidth]}>
            <Text style={[styles.buttonText, styles.whiteText]}>Close Prayer</Text>
          </TouchableOpacity>
        </View>
    }
    <Modal
      isVisible={visibleModal === 'open'}
      style={styles.bottomModal}
    >
      <OpenModalContent
        setModal={setModal}
        togglePrayer={togglePrayer}
      />
    </Modal>
    <Modal
      isVisible={visibleModal === 'close'}
      style={styles.bottomModal}
    >
      <CloseModalContent
        setModal={setModal}
        togglePrayer={togglePrayer}
      />
    </Modal>
  </View>
)

export default SinglePrayer
