'use strict';

import React from 'react';
import ReactNative from 'react-native';
import {InputComponent} from '../lib/InputComponent';

let { StyleSheet} = ReactNative;
export class InputField extends React.Component{
  render(){
    return(<InputComponent
      {...this.props}
      />);
  }
}
