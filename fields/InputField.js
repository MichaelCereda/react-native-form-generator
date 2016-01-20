'use strict';

import React from 'react-native';
let { View, StyleSheet, TextInput, Text} = React;

import {Field} from './Field';

export class InputField extends React.Component{
  constructor(props){
    super();
    this.state = {
      labelWidth: 0,
      value: props.value,
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

  handleTextChange(value){
    this.setState({value:value});
    //this.props.onChange(this.props.fieldRef, value);
    if(this.props.onChange)      this.props.onChange(this.props.fieldRef, value);
    if(this.props.onValueChange) this.props.onValueChange(value);
  }
  _scrollToInput (event) {

    if (this.props.onFocus) {
      let handle = React.findNodeHandle(this.refs.inputBox);
      this.props.onFocus(
        event,
        handle
      )
    }
  }

  render(){

    return(<Field onPress={(event)=>{this.refs.inputBox.focus();}}>
      <View style={[formStyles.fieldContainer,  (this.props.label)?formStyles.horizontalContainer:{}, this.props.containerStyle]}
        onLayout={this.handleLayoutChange.bind(this)}>
        {(this.props.label)
          ?
          <Text style={formStyles.fieldText}
            onLayout={this.handleLabelLayoutChange.bind(this)}>{this.props.label}</Text>
          : null
        }
        <TextInput
          ref='inputBox'
          style={[formStyles.input,  (this.props.label)?formStyles.textRight:{}, this.props.style]}
          onChangeText={this.handleTextChange.bind(this)}
          onFocus={this._scrollToInput.bind(this)}
          placeholder={this.props.placeholder}
          value={this.state.value} width={this.state.width-this.state.labelWidth} height={44}
          />
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
    height: 45
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
