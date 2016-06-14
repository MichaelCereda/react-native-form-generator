'use strict';

import React from 'react';
import ReactNative from 'react-native';
import {InputBox} from '../lib/InputBox';

let { StyleSheet} = ReactNative;
export class InputField extends React.Component{
  render(){
    return(<InputBox
      {...this.props}
      />);
  }
}
