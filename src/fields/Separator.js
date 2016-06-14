'use strict';

import React from 'react';
let { View, StyleSheet, Text} = require('react-native');

export class Separator extends React.Component{
  render(){
     return(<View style={[formStyles.separatorContainer, this.props.containerStyle]}>
       {
         (this.props.label)?
         <Text style={[formStyles.separator,this.props.labelStyle]}>{this.props.label.toUpperCase()}</Text>
       : null
     }
       </View>
    )
  }
}

Separator.propTypes = {
  labelStyle: Text.propTypes.style,
  containerStyle: View.propTypes.style
}


  let formStyles = StyleSheet.create({
    form:{

    },
    alignRight:{
       marginTop: 7, position:'absolute', right: 10
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
    fieldContainer:{
      borderBottomWidth: 1,
      borderBottomColor: '#C8C7CC',
      backgroundColor: 'white',
      justifyContent: 'center',
      height: 45
    },
  });
