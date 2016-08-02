/*
This is a view i use in a test app,
very useful to list all the use cases
*/

import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,ScrollView,TouchableHighlight, Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

class CustomModal extends React.Component{
  handleClose(){
    this.props.onHidePicker && this.props.onHidePicker();
  }
  render(){
    return <Modal transparent={true}>
    <View style={{padding:20, flex:1, justifyContent:'center', backgroundColor:'rgba(43, 48, 62, 0.57)'}}>
    <View
      style={{
        backgroundColor:'white',
        borderRadius: 8,
        flexDirection:'column',

    }}
      >
      <Text style={{
        textAlign: 'center',
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        fontSize:18
      }}>A Custom Wrapper for your picker</Text>
      {this.props.children}

    <TouchableHighlight
      onPress={this.handleClose.bind(this)}
    underlayColor='#78ac05'>
    <View style={{
        flex:1, alignItems:'center'
      }}><Text style={{fontSize:19,padding:15,}}>Close</Text></View></TouchableHighlight>
      </View>
      </View>
    </Modal>
  }
}

class WrappedIcon extends React.Component {
  render() {
    return (
      <Icon {...this.props} />
    );
  }
}

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
    //console.log(e, component);
  }
  openTermsAndConditionsURL(){

  }
  resetForm(){

    this.refs.registrationForm.refs.first_name.setValue("");
    this.refs.registrationForm.refs.last_name.setValue("");
    this.refs.registrationForm.refs.other_input.setValue("");
    this.refs.registrationForm.refs.meeting.setDate(new Date());
    this.refs.registrationForm.refs.has_accepted_conditions.setValue(false);
  }
  render(){



    return (<ScrollView keyboardShouldPersistTaps={true} style={{ height:200}}>
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <Separator />
        <InputField
          ref='first_name'
          label='First Name'
          placeholder='First Name'
          helpText={((self)=>{

            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.registrationForm.refs.first_name.valid){
                return self.refs.registrationForm.refs.first_name.validationErrors.join("\n");
              }

            }
            // if(!!(self.refs && self.refs.first_name.valid)){
            // }
          })(this)}
          validationFunction={[(value)=>{
            /*
            you can have multiple validators in a single function or an array of functions
             */

            if(value == '') return "Required";
            //Initial state is null/undefined
            if(!value) return true;
            var matches = value.match(/\d+/g);
            if (matches != null) {
                return "First Name can't contain numbers";
            }

            return true;
          }, (value)=>{
            if(!value) return true;
            if(value.indexOf('4')!=-1){
              return "I can't stand number 4";
            }
            return true;
          }]}
          />
        <InputField
          iconLeft={<WrappedIcon style={{marginLeft:10, alignSelf:'center', color:'#793315'}} name='ios-american-football-outline' size={30} />}
        ref='last_name' value="Default Value" placeholder='Last Name'/>
        <InputField
          multiline={true}
          ref='other_input'
          placeholder='Other Input'
          helpText='this is an helpful text it can be also very very long and it will wrap' />
          <InputField
            ref='email'
            keyboardType='email-address'
            placeholder='Email fields'
            helpTextComponent={<Text>Custom Help Text Component</Text>} />
        <Separator />
        <LinkField
          label="LinkField, it acts like a button" onPress={()=>{}}
          iconLeft={<Icon style={{marginLeft:10, alignSelf:'center', color:'#793315'}} name='ios-american-football-outline' size={30} />}
          iconRight={<Icon style={{alignSelf:'center',marginRight:10, color:'#969696'}} name='ios-arrow-forward' size={30} />}
          />
        <SwitchField label='I accept Terms & Conditions'
          ref="has_accepted_conditions"
          helpText='Please read carefully the terms & conditions'/>
        <PickerField ref='gender'
          label='Gender'
          value='female'
          options={{
            "": '',
            male: 'Male',
            female: 'Female'
          }}

          />
          <DatePickerField ref='birthday'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()}
          iconRight={[<Icon style={{alignSelf:'center', marginLeft:10}} name='ios-arrow-forward' size={30} />,
                      <Icon style={{alignSelf:'center', marginLeft:10}} name='ios-arrow-down' size={30} />
                      ]}
          placeholder='Birthday'/>
        <TimePickerField ref='alarm_time'
      placeholder='Set Alarm'
      iconLeft={<Icon style={{alignSelf:'center', marginLeft:10}} name='ios-alarm' size={30} />}
      prettyPrint={true}
      pickerWrapper={<CustomModal />}
      />
        <DatePickerField ref='meeting'
          iconLeft={[<Icon style={{alignSelf:'center', marginLeft:10}} name='ios-flame' size={30} />,
                     <Icon style={{alignSelf:'center', marginLeft:10, color:'red'}} name='ios-flame' size={30} />
                  ]}
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()} mode="datetime" placeholder='Meeting'/>
        </Form>
        <Text>{JSON.stringify(this.state.formData)}</Text>
      <TouchableHighlight
        onPress={this.resetForm.bind(this)}
      underlayColor='#78ac05'>
      <View style={[{
          flex:1, alignItems:'center'
        }
      ]}><Text style={{fontSize:19,padding:15,}}>Reset</Text></View></TouchableHighlight>
      <TouchableHighlight
      disabled={!this.state.formData.has_accepted_conditions}
      onPress={()=>this.refs.registrationForm.refs.other_input.focus()}
      underlayColor='#78ac05'>
      <View style={[{
          flex:1, alignItems:'center',
          borderColor:(this.state.formData.has_accepted_conditions)?'#2398c9':'grey',
          borderWidth:5
        },
      ]}><Text style={{fontSize:19,padding:15,}}>Focus First Name</Text></View></TouchableHighlight>
      </ScrollView>);
    }
  }
