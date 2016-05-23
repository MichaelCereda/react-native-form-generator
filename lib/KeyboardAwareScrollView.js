import React, {PropTypes} from 'react'
import { ScrollView, DeviceEventEmitter } from 'react-native'
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType'
import ViewStylePropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes'

export class KeyboardAwareScrollView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      keyboardSpace: 0,
    }
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this)
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
  }

  // Keyboard actions
  // TODO: automatically handle TabBar height instead of using props
  updateKeyboardSpace (frames) {
    // let coordinatesHeight = (frames.endCoordinates)? frames.endCoordinates.height : frames.end.height;
    let coordinatesHeight = frames.endCoordinates.height;
    const keyboardSpace = (this.props.viewIsInsideTabBar) ? coordinatesHeight - 49 : coordinatesHeight
    this.setState({
      keyboardSpace: keyboardSpace,
    })
    return {

    }
  }

  resetKeyboardSpace () {
    this.setState({
      keyboardSpace: 0,
    })
  }

  componentDidMount () {
    // Keyboard events
    DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace)
    DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace)
  }

  componentWillUnmount () {
    // TODO: figure out if removeAllListeners is the right thing to do
    DeviceEventEmitter.removeAllListeners('keyboardWillShow')
    DeviceEventEmitter.removeAllListeners('keyboardWillHide')
  }

  /**
   * @param extraHeight: takes an extra height in consideration.
   */
  scrollToFocusedInput (event, reactNode, extraHeight = 69) {
    const scrollView = this.refs.keyboardScrollView.getScrollResponder();
    setTimeout(() => {
      scrollView.scrollResponderScrollNativeHandleToKeyboard(
        reactNode, extraHeight, true
      )
    }, 220)
  }

  render () {
    return (
      <ScrollView
        keyboardShouldPersistTaps={false}
        ref='keyboardScrollView'
        keyboardDismissMode='interactive'
        contentInset={{bottom: this.state.keyboardSpace}}
        showsVerticalScrollIndicator={true}
        style={this.props.style}>
        {this.props.children}
      </ScrollView>
    )
  }
}

KeyboardAwareScrollView.propTypes = {
  style: StyleSheetPropType(ViewStylePropTypes),
  children: PropTypes.node,
  viewIsInsideTabBar: PropTypes.bool,
}
