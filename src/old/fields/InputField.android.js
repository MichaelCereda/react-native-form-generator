'use strict';

import React from 'react';
import ReactNative from 'react-native';
let { View, StyleSheet, TextInput, Text} = ReactNative;

import {InputFieldComponent} from '../lib/InputFieldComponent';

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export class InputField extends React.Component{
  render(){
    return(<InputFieldComponent
      {...this.props}
      />
  )
}

}

/*
labelStyle= {formStyles.fieldText}

containerStyle={[formStyles.fieldContainer,
    formStyles.horizontalContainer,
    this.props.containerStyle,
    {height: this.state.inputHeight+1}
  ]}

inputStyle={[formStyles.input,
    (this.props.multiline)?formStyles.multiline:{},
    (this.props.label)?formStyles.textRight:{},
    this.props.style,
    {height: this.state.inputHeight}
  ]}
 */

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
