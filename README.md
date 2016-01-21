## React Native Form Generator
Generate forms with native look and feel in a breeze

![react-native-form-generator](https://cloud.githubusercontent.com/assets/107390/12443993/02022362-bf2a-11e5-8aae-e567255de8e4.gif)

sorry this gif is awful

## Features
* Easy to use and clean, react style syntax
* Automatic events handling
* Supports custom fields and styles without adding any weird syntax (just create a react component)
* Applies by default the current OS style
* Inspired by tcomb, the good parts
* Performances: just the field changed gets a setState
* You don't need to create a 'Model' or a 'Struct' that contains your data, just create a form component (the React's way)

## Installation
```
    npm install --save react-native-form-generator
```
## Warning: I'm actively working on this project
### ...so
* Pull requests are very very welcome
* All the elements are tested and stable against normal use cases (but i expect to do a lot of changes here and there)
* Validation is coming with maximum priority
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
```javascript
  <InputField
    label='Example' // if label is present the field is rendered with the value on the left (see First Name example in the gif), otherwise its rendered with textinput at full width (second name in the gif).
    ref='example_input_field' // used in onChange event to collect the value
    value='default_value' // used as initial value
    />
```
### SwitchField
### PickerField

### DatePickerField
