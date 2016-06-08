'use strict';

import React from 'react';
import ReactNative from 'react-native';
let { View, StyleSheet, TextInput, Text} = ReactNative;


import {Field} from './Field';


export class InputFieldComponent extends React.Component{
  constructor(props){
    super();
    this.state = {
      labelWidth: 0,
      value: props.value,
      minFieldHeight: props.height || 44,
      inputHeight: Math.max(props.height || 44)
    }
    if(props.validationFunction) {
      this.valid = props.validationFunction(value, this);
    } else
    if(props.keyboardType){
      switch (props.keyboardType) {
        case 'email-address':
        this.valid = validateEmail(props.value);
        break;
      }
    }
  }
  handleLayoutChange(e){
    let {x, y, width, height} = {... e.nativeEvent.layout};

    this.setState(e.nativeEvent.layout);
    //e.nativeEvent.layout: {x, y, width, height}}}.
  }

  handleLabelLayoutChange(e){
    let {x, y, width, height} = {... e.nativeEvent.layout};

    this.setState({labelWidth:width});
    //e.nativeEvent.layout: {x, y, width, height}}}.
  }
  handleChange(event){

    var value = event.nativeEvent.text;

    if(this.props.validationFunction) {
      this.valid = this.props.validationFunction(value, this);
    } else
    if(this.props.keyboardType){
      switch (this.props.keyboardType) {
        case 'email-address':
        this.valid = validateEmail(value);
        break;
      }
    }
    this.setState({value:value,
      inputHeight: Math.max(this.state.minFieldHeight,
        (event.nativeEvent.contentSize)?event.nativeEvent.contentSize.height:0)
      });
      //this.props.onChange(this.props.fieldRef, value);
      if(this.props.onChange)      this.props.onChange(this.props.fieldRef, value);
      if(this.props.onValueChange) this.props.onValueChange(value);
    }

    _scrollToInput (event) {
      //debugger;
      if (this.props.onFocus) {
        let handle = ReactNative.findNodeHandle(this.refs.inputBox);
        this.props.onFocus(
          event,
          handle
        )
      }
    }
    handleFieldPress(event){
      debugger;
      this.refs.inputBox.focus();
    }
    render(){

      return(<Field {...this.props}
        onPress={this.handleFieldPress.bind(this)}>
        <View style={this.props.containerStyle}
          onLayout={this.handleLayoutChange.bind(this)}>
          {(this.props.iconLeft)
            ? this.props.iconLeft
            : null
          }
          {(this.props.label)
            ?
            <Text style={this.props.labelStyle}
              onLayout={this.handleLabelLayoutChange.bind(this)}>
              {this.props.label}</Text>
            : null
          }
          <TextInput
            {...this.props}
            ref='inputBox'
            keyboardType = {this.props.keyboardType}
            style={this.props.inputStyle}

            onChange={this.handleChange.bind(this)}
            onFocus={this._scrollToInput.bind(this)}
            placeholder={this.props.placeholder}
            value={this.state.value}
            width={this.state.width-this.state.labelWidth
              -((this.props.iconRight)?this.props.iconRight.props.size:0)
              -((this.props.iconLeft)?this.props.iconLeft.props.size:0)
            }

            />
          {(this.props.iconRight)
            ? this.props.iconRight
            : null
          }
        </View>

      </Field>
    )
  }

}
