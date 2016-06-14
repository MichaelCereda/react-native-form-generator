'use strict';

import React from 'react';
let { View, StyleSheet, TextInput, Text} = require('react-native');
import {LinkBox} from '../lib/LinkBox';


export class LinkField extends React.Component{
  render(){
    return(<LinkBox
       {...this.props}
       />
      )
}

}

let formStyles = StyleSheet.create({
  fieldContainer:{
    borderBottomWidth: 1,
    borderBottomColor: '#C8C7CC',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 45
  },
  horizontalContainer:{
    flexDirection: 'row',

    justifyContent: 'flex-start'
  },
  fieldText:{
    fontSize: 34/2,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    lineHeight: 32
  },
});
