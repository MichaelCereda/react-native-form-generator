'use strict';

import React from 'react';
let { View, StyleSheet, Text, Switch} = require('react-native');

import {Field} from './Field';

export class SwitchComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: props.value,
    }
  }
  handleLayoutChange(e){
    let {x, y, width, height} = {... e.nativeEvent.layout};

    this.setState(e.nativeEvent.layout);
    //e.nativeEvent.layout: {x, y, width, height}}}.
  }
  setValue(value){
    this.setState({value:value});
    if(this.props.onChange)      this.props.onChange(value);
    if(this.props.onValueChange) this.props.onValueChange(value);
  }

  handleValueChange(value){
    // debugger;
    this.setState({value:value});
    if(this.props.onChange)      this.props.onChange(value);
    if(this.props.onValueChange) this.props.onValueChange(value);
  }


  render(){

    return(<Field {...this.props}>
      <View style={this.props.containerStyle}
        onLayout={this.handleLayoutChange.bind(this)}>

        <Text style={this.props.labelStyle}>{this.props.label}</Text>
          <Switch
          onValueChange={this.handleValueChange.bind(this)}
          style={this.props.switchStyle}
          value={this.state.value} />
      </View>

    </Field>
    )
  }

}

SwitchComponent.propTypes = {
  labelStyle: Text.propTypes.style,
  containerStyle: View.propTypes.style,
  switchStyle: Switch.propTypes.style
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
