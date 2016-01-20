'use strict';

import React from 'react-native';
let { View, StyleSheet, Text, TouchableHighlight} = React;

export class Field extends React.Component{
  render(){
    var fieldHelpText =
     (this.props.helpText)
       ?
       <View style={formStyles.helpTextContainer}>
         <Text style={formStyles.helpText}>{this.props.helpText}</Text>
       </View>
       : null
   ;
    if(this.props.onPress){
      return <TouchableHighlight onPress={this.props.onPress}>
        <View>
          {this.props.children}
        {fieldHelpText}
        </View>
      </TouchableHighlight>
    } else {
      return   <View>
        {this.props.children}
        {fieldHelpText}
      </View>;
    }

  }
}



  let formStyles = StyleSheet.create({

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
