'use strict';

import React from 'react';
import ReactNative from 'react-native';
import {Field} from './Field.js';

const {View, StyleSheet, TextInput, Text} = ReactNative;

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(email)) return true;
  return 'Invalid email';
}

export class InputComponent extends React.Component{
  constructor(props){
    super(props);

    this.triggerValidation = this.triggerValidation.bind(this);
    // this.validate = this.validate.bind(this)
    this.validate(props.value);
    this.validationErrors = [];
    this.state = {
      labelWidth: 0,
      value: props.value,
      minFieldHeight: props.height || 44,
      inputHeight: Math.max(props.height || 44),
      // isValid:
    };

  }

  setValue(value){
    this.setState({value:value});
    if(this.props.onChange)      this.props.onChange(value);
    if(this.props.onValueChange) this.props.onValueChange(value);
  }
  focus(){
    this.refs.inputBox.focus()
  }
  triggerValidation() {
    this.setState({isValid:this.validate(this.state.value)});
  }
  validate(value){
    let validationResult;
    this.validationErrors = [];

    if(!!this.props.validationFunction) {
      if(this.props.validationFunction.constructor === Array){
        /*
        validationFunction has to return an object in case of error,
          true in case of successful validation
         */
        this.props.validationFunction.map((valFn, i)=>{

          let validationResult = valFn(value, this);
          if(validationResult === true){
            this.valid = (this.valid !== false)? validationResult : this.valid;
          } else{
            this.validationErrors.push(validationResult);
            this.valid = false;
          }

        })
      } else {
        let validationResult = this.props.validationFunction(value, this);
        if(validationResult === true){
          this.valid = true;
        } else{
          this.validationErrors.push(validationResult);
          this.valid = false;
        }
      }

    } else
    if(this.props.keyboardType){
      switch (this.props.keyboardType) {
        case 'email-address':
          validationResult = validateEmail(value);
          break;
      }
      if(validationResult === true){
        this.valid = true;
      } else{
        this.validationErrors.push(validationResult);
        this.valid = false;
      }
    }
    this.props.onValidation(this.valid, this.validationErrors);
    return this.valid;
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
    const value = event.nativeEvent.text;

    this.validate(value);

    this.setState({value,
      inputHeight: Math.max(this.state.minFieldHeight,
        (event.nativeEvent.contentSize && this.props.multiline)
          ? event.nativeEvent.contentSize.height
          : 0)
      });
    //this.props.onChange(this.props.fieldRef, value);
    if(this.props.onChange)      this.props.onChange(value, this.valid);
    if(this.props.onValueChange) this.props.onValueChange(value,this.valid);
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
    this.refs.inputBox.focus();
  }
  render(){
 // style={[formStyles.fieldContainer,
 //     formStyles.horizontalContainer,
 //     this.props.containerStyle,
 //     {height: this.state.inputHeight+1}
 //   ]}
    return(<Field {...this.props}>
        <View
          onLayout={this.handleLayoutChange.bind(this)}
          style={[
              this.props.containerStyle,

            ]}>
          {(this.props.iconLeft)
            ? this.props.iconLeft
            : null
          }
          {(this.props.label)
            ?
            <Text style={this.props.labelStyle}
              onLayout={this.handleLabelLayoutChange.bind(this)}
              onPress={this.handleFieldPress.bind(this)}
              suppressHighlighting={true}
              >{this.props.label}</Text>
            : null
          }
          <TextInput
            {...this.props}
            ref='inputBox'
            keyboardType = {this.props.keyboardType}
            style={[
                this.props.inputStyle,
                {height: this.state.inputHeight}
              ]}

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

// InputComponent.propTypes = {
//   multiline: React.PropTypes.bool,
//   placeholder:React.PropTypes.string,
// }

InputComponent.propTypes = {
  labelStyle: Text.propTypes.style,
  inputStyle: TextInput.propTypes.style,
  containerStyle: View.propTypes.style
}
