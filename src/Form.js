import React from 'react';
let { View, TextInput,
  StyleSheet,
  ScrollView,
  Text,
  SliderIOS,
  TouchableWithoutFeedback
} = require('react-native');

// import {Separator} from './fields/Separator';

export class Form extends React.Component{
  constructor(props){
    super();

    this.componentDidMount = this.componentDidMount.bind(this);
    this.triggerValidation = this.triggerValidation.bind(this);
    this.validate = this.validate.bind(this);

    this.valid;
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
  componentDidMount(){
    this.valid = this.validate();
  }
  handleFieldFocused(event, inputHandle){
    this.props.onFocus && this.props.onFocus(event, inputHandle);
  }
  handleFieldChange(field_ref, value){
    this.values[field_ref] = value;
    this.valid = this.validate();
    this.props.onChange && this.props.onChange(this.values);
  }
  getValues(){
    return this.values;
  }
  triggerValidation() {
    Object.values(this.refs).map((child)=> {
      if(child.triggerValidation) {
        child.triggerValidation();
      }
    });

    this.valid = this.validate();
  }
  underscoreToSpaced(str){
    var words = str.split('_');
    var res=[];
    words.map(function(word, i){
      res.push(word.charAt(0).toUpperCase() + word.slice(1));
    })

    return res.join(' ');
  }
  validate(){
    let result = true;

    Object.values(this.refs).map((child)=> {
      if (child.valid === false ||
        (typeof child.valid === 'undefined' && result)
      ) {
        result = child.valid;
      }
    });

    return result;
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
          ref: child.ref,
          onFocus:this.handleFieldFocused.bind(this),
          onChange:this.handleFieldChange.bind(this)
        }
      ));
      //}
    }, this);

    return (
      <View style={this.props.style}>
          {wrappedChildren}
      </View>
    );
  }
}
