'use strict';

import React from 'react';
import ReactNative from 'react-native';
import {InputComponent} from '../lib/InputComponent';

const {StyleSheet} = ReactNative;

export class InputField extends React.Component{
  constructor(props){
    super(props);

    this.triggerValidation = this.triggerValidation.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      value: props.value,
    }

    this.valid = this.validate(props.value)
  }
  triggerValidation() {
    const {fieldRef} = this.props;

    if(this.refs[fieldRef]) {
      this.refs[fieldRef].triggerValidation();
    }

    this.valid = this.validate(this.state.value);
  }
  validate(value){
    const {fieldRef, validationFunction} = this.props;
    let valid;

    if(this.refs[fieldRef]) {
      valid = this.refs[fieldRef].valid;
    } else
    if(validationFunction) {
      valid = validationFunction(value);
    }

    return valid;
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
