React Native Form Generator
================
Generate forms with native look and feel in a breeze

[![NPM](https://nodei.co/npm/react-native-form-generator.png)](https://nodei.co/npm/react-native-form-generator/)



![react-native-form-generator](https://cloud.githubusercontent.com/assets/107390/12499709/edc1c298-c07a-11e5-916c-394de83ebe51.gif)


## Features
* Doesn't have dependencies
* Use your own icon pack
* Easy to use and clean, react style syntax
* Automatic events handling
* Supports custom fields and styles without adding any weird syntax (just create a react component)
* Applies by default the current OS style
* Inspired by tcomb, the good parts
* Performances: just the field changed gets a setState
* You don't need to create a 'Model' or a 'Struct' that contains your data, just create a form component (the React's way)
* Validate InputFields based on keyboardType (can be overridden using validationFunction)

[My blogpost about React Native Form Generator](https://medium.com/@michaelcereda/react-native-forms-the-right-way-315802f989d6#.p9oj79vt3)

## Installation
```
    npm install --save react-native-form-generator
```
## Warning: I'm actively working on this project

* Pull requests are very very welcome
* All the elements are tested and stable against normal use cases (but i expect to do a lot of changes here and there)
* Slider hasn't been created
* I have to document the code properly and do some housekeeping, i apologize in advance.
* Android support is coming.

* This project requires (for some fields) react-native-vector-icons to show icons in some fields (i will remove this dependency soon)

## Example
the example below generates the form you see in the animation
```javascript

import { Form, InputField,
        Separator, SwitchField, LinkField ,
        PickerField, DatePickerField
      } from 'react-native-form-generator';

 export class MyCoolComponent extends React.Component{
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

   }
   render(){
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <InputField ref='first_name' label='First Name' placeholder='First Name'/>
        <InputField ref='last_name' placeholder='Last Name'/>
        <PickerField ref='gender' placeholder='Gender'
          options={{
            male: 'Male',
            female: 'Female'
          }}/>
        <DatePickerField ref='birthday'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()} mode='date' placeholder='Birthday'/>
        <Separator label='Terms & Conditions'/>
        <LinkField label='Read terms & conditions'     onPress={this.openTermsAndConditionsURL.bind(this)}/>
        <SwitchField label='I accept Terms & Conditions' ref="has_accepted_conditions"
          helpText='Please read carefully the terms & conditions'/>
      </Form>);
  }
}
```

## Form
Form automatically attaches on change events so you just have to attach an handle to the onFocus attibute of Form to monitor all the changes.

It's just a wrapper that allows you to attach onFocus (used to track focus events and keyboard events) and onChange (used to track changes in every field)

## Fields
#### Common Rules
* Every field that has to propagate its value in the form needs to have a ref attribute. (Separator and LinkField don't have a ref).
Check the example to understand the use of the ref attribute.


### Separator
```javascript
  <Separator
    label="Example" // optional: if present it will show the text
    />
```

### InputField
Input fields can be used to receive text, you can add icons (a react component) to the left and the right side of the field.

InputField can validate values based on keyboardType property, validation is not "aggressive", just changes a value inside the class, you can access the value using the ref (ex. this.ref.example_input_field.valid).

you can customize your validation function by adding a validationFunction property to the component

react-native-form-generator doesn't depend on any icon library, that gives you freedom of adding any icon or react component you want.

look at the example here.

![react-native-form-generator-inputfield](https://cloud.githubusercontent.com/assets/107390/12533401/1f6d1e7c-c1fd-11e5-96d0-aeba9a313ab9.gif)

```javascript
  <InputField
    label='Example' // if label is present the field is rendered with the value on the left (see First Name example in the gif), otherwise its rendered with textinput at full width (second name in the gif).
    ref='example_input_field' // used in onChange event to collect the value
    value='default_value' // used as initial value
    keyboardType = '' // undefined, 'email',
    validationFunction = {(value)=>{return true;}}
    iconRight={
      <Icon name='checkmark-circled'
        size={30}
        style={[
          {marginTop:7, color:"#61d062" },
          ((self)=>{
            //i can change the style of the component related to the attibute of example_input_field
            if(!!(self.refs && self.refs.example_input_field)){
              if(!self.refs.example_input_field.valid) return {color:'#d52222'}
            }
            }
          )(this)]}
        />
    }  //React Component
    />
```
All the props are passed down to the underlying TextInput Component

| Prop (parameters) | Description |
| --- | --- |
| label | Text to show in the field, if exists will move the textinput on the right, providing also the right alignment |
| iconLeft | React component, shown on the left of the field, the component needs to have a prop size to allow the inputText to resize properly  |
| iconRight | React component, shown on the right of the field, the component needs to have a prop size to allow the inputText to resize properly  |

### SwitchField

| Prop (parameters) | Description |
| --- | --- |
| onValueChange(value) | triggered at every value change, returns the new value of the field|
| value | Initial value of the component (Boolean)|


### PickerField
| Prop (parameters) | Description |
| --- | --- |
| onValueChange(value) | triggered at every value change, returns the new value of the field|
| value | Initial value of the component|
| options=[{label:"test",value="Test"},...] | All the possible options, array of objects|
| iconRight | React component, shown on the left of the text field (i suggest Ionicons 'ios-arrow-right' for a nice iOS effect)  |

### DatePickerField
Every prop is passed down to the underlying DatePickerIOS component.

| Prop (parameters) | Description |
| --- | --- |
| onValueChange(date) | triggered at every value change, returns the new value of the field|
| date | Initial date of the component, defaults to (new Date()) |
| iconRight | React component, shown on the left of the text field (i suggest Ionicons 'ios-arrow-right' for a nice iOS effect)  |

### LinkField
Every prop is passed down to the underlying DatePickerIOS component.

| Prop (parameters) | Description |
| --- | --- |
| label | Text to show in the field |
| iconLeft | React component, shown on the left of the text field  |
| iconRight | React component, shown on the left of the text field (i suggest Ionicons 'ios-arrow-right' for a nice iOS effect)  |

### KeyboardEvents
react-native-form-generator ships with an implementation ok KeyboardAwareScrollView that make handling keyboard events a breeze.
check here https://medium.com/@michaelcereda/react-native-forms-the-right-way-315802f989d6#.p9oj79vt3

![react-native-form-generator-keyevents](https://cloud.githubusercontent.com/assets/107390/12499708/edb63838-c07a-11e5-9fe4-87979285ccc0.gif)

### Custom Fields
With react-native-form-generator is extremely easy to create your own custom fields.
You just need to know that:
1. Every field is a react component
2. Evey field will receive 3 props from the Form object:
   - fieldRef: contains the reference of the field (workaround on a react-native bug).
   - onChange: must be called every time i want to update the values inside the form component. (required)
   - onValueChange: can be used whenever you prefer to pass the values to another component.

Example
```javascript
'use strict';
import {Field} from './Field';

export class SimpleInputField extends React.Component{
  constructor(props){
    super();
    }
  }

  handleChange(event){
    var value = event.nativeEvent.text;

    this.setState({value:value});

    // This updates values in form everytime i update
    if(this.props.onChange)      this.props.onChange(this.props.fieldRef, value);
    if(this.props.onValueChange) this.props.onValueChange(value);
  }

  render(){
    return(<Field>
        <TextInput
          {...this.props}
          ref='inputBox'

          onChange={this.handleChange.bind(this)}

          placeholder={this.props.placeholder}
          value={this.state.value}
          />
    </Field>
  )
}

}
```
### Wrapping fields
You can decide to wrap every field in a component to mantain design uniformity and avoid repetitions (ex. Icons ?!).

Battle tested example
```javascript
import {PickerField, LinkField} from 'react-native-form-generator';
import Icon from 'react-native-vector-icons/Ionicons';

let {
  StyleSheet
} = React;

export class WrappedLinkField extends React.Component{
  render(){

    return <LinkField
      label={this.props.label}
      onPress={this.props.onPress}
      iconRight={<Icon name='ios-arrow-right'
      size={30}
        />
    }
}

export class WrappedPickerField extends React.Component{
    render(){

      return <PickerField
        fieldRef = {this.props.fieldRef}
        value={this.props.value}
        placeholder={this.props.placeholder}
        options={this.props.options}
        onChange={this.props.onChange}
        onValueChange={this.props.onValueChange}
        iconRight={
          <Icon name='ios-arrow-right'
          size={30}

          style={[
            formStyles.alignRight,{color: '#C7C7CC'},
            this.props.iconStyle]}/>
      }
      />
  }
}

let formStyles = StyleSheet.create({
    alignRight:{
      marginTop: 7, position:'absolute', right: 10
    }
  });
```
