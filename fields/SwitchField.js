'use strict';

import React from 'react-native';
let { View, StyleSheet, Text, Switch} = React;

import {Field} from './Field';

export class SwitchField extends React.Component{
  constructor(props){
    super();
    this.state = {
      value: props.value,
    }
  }
  handleLayoutChange(e){
    let {x, y, width, height} = {... e.nativeEvent.layout};

    this.setState(e.nativeEvent.layout);
    //e.nativeEvent.layout: {x, y, width, height}}}.
  }

  handleValueChange(value){
    // debugger;
    this.setState({value:value});
    if(this.props.onChange)      this.props.onChange(this.props.fieldRef, value);
    if(this.props.onValueChange) this.props.onValueChange(value);
  }


  render(){

    return(<Field {...this.props}>
      <View style={[formStyles.fieldContainer, formStyles.horizontalContainer,  this.props.containerStyle]}
        onLayout={this.handleLayoutChange.bind(this)}>

        <Text style={formStyles.fieldText}>{this.props.label}</Text>
          <Switch
          onValueChange={this.handleValueChange.bind(this)}
          style={{marginTop: 7, position:'absolute', right: 10}}
          value={this.state.value} />
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
