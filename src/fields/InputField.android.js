'use strict';

import React from 'react';
import ReactNative from 'react-native';
import {InputComponent} from '../lib/InputComponent';

const {StyleSheet} = ReactNative;

export class InputField extends React.Component{
  constructor(props){
    super(props);

    this.validate = this.validate.bind(this);

    this.state = {
      value: props.value,
    }

    this.valid = this.validate(props.value)
  }
  validate(value){
    const {fieldRef, validationFunction} = this.props;
    let result;

    if(this.refs[fieldRef]) {
      result = this.refs[fieldRef].valid;
    } else
    if(validationFunction) {
      result = validationFunction(value);
    }

    return result;
  }
  handleChange(ref, value) {
    this.setState({value});

    this.valid = this.validate(value);

    // pass the value change up the chain
    if(this.props.onChange) {
      this.props.onChange(ref, value);
    }
  }

  render(){
    return(<InputComponent
      {...this.props}
      onChange={this.handleChange.bind(this)}
      ref={this.props.fieldRef}
      />
    );
  }
}
