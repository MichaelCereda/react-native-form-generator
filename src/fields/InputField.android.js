'use strict';

import React from 'react';
import ReactNative from 'react-native';
import {InputComponent} from '../lib/InputComponent';

const {StyleSheet} = ReactNative;

export class InputField extends React.Component{

  handleValidation(isValid, validationErrors){
    this.valid = isValid;
    this.validationErrors = validationErrors;
  }
  setValue(value){
    this.refs.fieldComponent.setValue(value)
  }
  render(){
    return(<InputComponent
      {...this.props}
      onValidation={this.handleValidation.bind(this)}
      //onChange={this.handleChange.bind(this)}
      //ref={this.props.fieldRef}
      />
    );
  }
}
