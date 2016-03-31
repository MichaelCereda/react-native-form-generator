'use strict';

import React from 'react-native';
let { View, TextInput,
  StyleSheet,
  StatusBarIOS,
  ScrollView,
  Text,
  SliderIOS,
  TouchableWithoutFeedback
} = React;

import {InputField} from './fields/InputField';
import {SwitchField} from './fields/SwitchField';
import {Separator} from './fields/Separator';
import {LinkField} from './fields/LinkField';
import {PickerField} from './fields/PickerField';
import {DatePickerField} from './fields/DatePickerField';

import {KeyboardAwareScrollView} from './lib/KeyboardAwareScrollView';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export {InputField, SwitchField,
        Separator, LinkField,
        PickerField, DatePickerField,
        KeyboardAwareScrollView
      }

export class Form extends React.Component{
  constructor(props){
    super();
    this.values = {};
    React.Children.map(props.children, (child)=> {
      if (!child) {
        return;
      }
        if(child.ref){
          this.values[child.ref] = child.props.value;
        }

    });
  }

  handleFieldFocused(event, inputHandle){
    if(this.props.onFocus)
      this.props.onFocus(event, inputHandle);
  }
  handleFieldChange(field_ref, value){
     this.values[field_ref] = value;
    //this.setState(t);
    if(this.props.onChange){

        this.props.onChange(this.values);
    }

  }
  getValues(){
    return this.values;
  }
  underscoreToSpaced(str){
    var words = str.split('_');
    var res=[];
    words.map(function(word, i){
      res.push(word.charAt(0).toUpperCase() + word.slice(1));
    })

    return res.join(' ');
  }

  render(){
    let wrappedChildren = [];

    React.Children.map(this.props.children, (child, i)=> {
      if (!child) {
        return;
      }

      //if (child.type === this){
        wrappedChildren.push(React.cloneElement(child, {
          key: child.ref || child.type+i,
          fieldRef : child.ref,
          onFocus:this.handleFieldFocused.bind(this),
          onChange:this.handleFieldChange.bind(this)
        }
      ));
      //}
    }, this)

    return (
      <View style={[formStyles.form, this.props.style]}>
        <Separator label={this.props.label}/>

        <View style={formStyles.fieldsWrapper}>
          {wrappedChildren}
        </View>
      </View>


      );
  }
}


  let formStyles = StyleSheet.create({
    form:{},
    fieldsWrapper:{
    },

  });
