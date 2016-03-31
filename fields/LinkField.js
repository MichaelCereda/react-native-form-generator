'use strict';

import React from 'react-native';
let { View, StyleSheet, TextInput, Text} = React;
import {Field} from './Field';


export class LinkField extends React.Component{
  constructor(props){
    super();
    this.state = {
    }
  }
  handleLayoutChange(e){
    let {x, y, width, height} = {... e.nativeEvent.layout};

    this.setState(e.nativeEvent.layout);
    //e.nativeEvent.layout: {x, y, width, height}}}.
  }


  render(){
    return(<Field {...this.props}>
      <View style={[
          formStyles.fieldContainer,
          formStyles.horizontalContainer,
          this.props.containerStyle]}
        onLayout={this.handleLayoutChange.bind(this)}>

        {(this.props.iconLeft)
          ? this.props.iconLeft
          : null
        }

        <Text style={[formStyles.fieldText, this.props.textStyle]}>{this.props.label}</Text>

          {(this.props.iconRight)
            ? this.props.iconRight
            : null
          }

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
