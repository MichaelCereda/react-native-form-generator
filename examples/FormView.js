/*
This is a view i use in a test app,
very useful to list all the use cases
*/

import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,ScrollView, TextInput
} from 'react-native';


import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

export class FormView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formData:{}
    }
  }
  handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    first_name:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */
    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleFormFocus(e, component){
    console.log(e, component);
  }
  openTermsAndConditionsURL(){

  }
  render(){
    return (<ScrollView keyboardShouldPersistTaps={true} style={{paddingLeft:10,paddingRight:10, height:200}}>
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <Separator />
        <InputField ref='first_name' label='First Name' placeholder='First Name'/>
        <InputField ref='last_name' placeholder='Last Name'/>
        <InputField
          multiline={true}
          ref='other_input'
          placeholder='Other Input'
          helpText='this is an helpful text it can be also very very long and it will wrap' />
        <Separator />
        <LinkField label="test test test" onPress={()=>{}}/>
        <SwitchField label='I accept Terms & Conditions'
          ref="has_accepted_conditions"
          helpText='Please read carefully the terms & conditions'/>
        <PickerField ref='gender'
          label='Gender'
          options={{
            "": '',
            male: 'Male',
            female: 'Female'
          }}/>
          <DatePickerField ref='birthday'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()} placeholder='Birthday'/>
        <TimePickerField ref='alarm_time'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()} placeholder='Set Alarm'/>
        <DatePickerField ref='meeting'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()} mode="datetime" placeholder='Meeting'/>
        </Form>
        <Text>{JSON.stringify(this.state.formData)}</Text>

      </ScrollView>);
    }
  }

  /*
  {/*<InputField ref='first_name' label='First Name' placeholder='First Name'/>
  <InputField ref='last_name' placeholder='Last Name'/>}
  {/*<PickerField ref='gender' placeholder='Gender'
  options={{
  male: 'Male',
  female: 'Female'
  }}/>
  <DatePickerField ref='birthday'
  minimumDate={new Date('1/1/1900')}
  maximumDate={new Date()} mode='date' placeholder='Birthday'/>
  <Separator label='Terms & Conditions'/>
  <LinkField label='Read terms & conditions'
  onPress={this.openTermsAndConditionsURL.bind(this)}/>
  <SwitchField label='I accept Terms & Conditions' ref="has_accepted_conditions"
  helpText='Please read carefully the terms & conditions'/>}

  */
