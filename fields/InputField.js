'use strict';

import React from 'react-native';
let { View, StyleSheet, TextInput, Text} = React;

import {Field} from './Field';

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export class InputField extends React.Component{
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
      let handle = React.findNodeHandle(this.refs.inputBox);
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
      <View style={[formStyles.fieldContainer,
          formStyles.horizontalContainer,
          this.props.containerStyle,
          {height: this.state.inputHeight+1}
        ]}
        onLayout={this.handleLayoutChange.bind(this)}>
        {(this.props.iconLeft)
          ? this.props.iconLeft
          : null
        }
        {(this.props.label)
          ?
          <Text style={formStyles.fieldText}
            onLayout={this.handleLabelLayoutChange.bind(this)}>{this.props.label}</Text>
          : null
        }
        <TextInput
          {...this.props}
          ref='inputBox'
          keyboardType = {this.props.keyboardType}
          style={[formStyles.input,
              (this.props.multiline)?formStyles.multiline:{},
              (this.props.label)?formStyles.textRight:{},
              this.props.style,
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



let formStyles = StyleSheet.create({
  form:{

  },
  alignRight:{
    marginTop: 7, position:'absolute', right: 10
  },
  textRight:{
    textAlign: 'right'
  },
  multiline:{
    lineHeight: 32,
    fontSize: 34/2
  },
  separatorContainer:{
    // borderTopColor: '#C8C7CC',
    // borderTopWidth: 1,
    paddingTop: 35,
    borderBottomColor: '#C8C7CC',
    borderBottomWidth: 1,

  },

  fieldsWrapper:{
    // borderTopColor: '#afafaf',
    // borderTopWidth: 1,
  },
  horizontalContainer:{
    flexDirection: 'row',

    justifyContent: 'flex-start'
  },
  fieldContainer:{
    borderBottomWidth: 1,
    borderBottomColor: '#C8C7CC',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  fieldText:{
    fontSize: 34/2,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    lineHeight: 32
  },
  input:{
    paddingLeft: 10,
    paddingRight: 10,

  },
  helpTextContainer:{
    marginTop:9,
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,

  },
  helpText:{
    color: '#7a7a7a'
  }
});
