'use strict';

import React from 'react';
import ReactNative from 'react-native';
let { View, StyleSheet, TextInput, Text, PickerIOS} = ReactNative;


import {DatePickerComponent} from '../lib/DatePickerComponent';

export class DatePickerField extends React.Component{
  setDate(date){
    this.refs.datePickerComponent.setDate(date);
  }
  render(){

    return(<DatePickerComponent
      ref='datePickerComponent'
      {...this.props}
      labelStyle={[formStyles.fieldText, this.props.labelStyle]}
      valueStyle = {[formStyles.fieldValue,this.props.valueStyle]}
      valueContainerStyle = {[formStyles.alignRight,
          formStyles.horizontalContainer, this.props.valueContainerStyle]}
      containerStyle={[
        formStyles.fieldContainer,
        formStyles.horizontalContainer,
        this.props.containerStyle,
      ]}
      />)
    }

  }



      let formStyles = StyleSheet.create({
        form:{

        },
        alignRight:{
           marginTop: 7, position:'absolute', right: 10
        },
        noBorder:{
          borderTopWidth: 0,
          borderBottomWidth: 0
        },
        separatorContainer:{
          // borderTopColor: '#C8C7CC',
          // borderTopWidth: 1,
          paddingTop: 35,
          borderBottomColor: '#C8C7CC',
          borderBottomWidth: 1,

        },
        separator:{

          paddingLeft: 10,
          paddingRight: 10,
          color: '#6D6D72',
          paddingBottom: 7

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
          height: 45
        },
        fieldValue:{
          fontSize: 34/2,
          paddingLeft: 10,
          paddingRight: 10,
          marginRight:10,
          paddingTop: 4,
          justifyContent: 'center',

          color: '#C7C7CC'
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
