'use strict';

import React from 'react';
import ReactNative from 'react-native';
let { View, StyleSheet, TextInput, Text, Picker} = ReactNative;
import {Field} from '../lib/Field';

var PickerItem = Picker.Item;

  export class PickerComponent extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        value: props.value || props.label,
      }
      this.pickerMeasures = {};
    }
    setValue(value){
      this.setState({value:value});
      if(this.props.onChange)      this.props.onChange(value);
      if(this.props.onValueChange) this.props.onValueChange(value);
    }
    handleLayoutChange(e){
      let {x, y, width, height} = {... e.nativeEvent.layout};

      this.setState(e.nativeEvent.layout);
      //e.nativeEvent.layout: {x, y, width, height}}}.
    }

    handleValueChange(value){

      this.setState({value:(value && value!='')?value:this.props.label});

      if(this.props.onChange)      this.props.onChange(value);
      if(this.props.onValueChange) this.props.onValueChange(value);
    }

    _scrollToInput (event) {

      if (this.props.onFocus) {
        let handle = ReactNative.findNodeHandle(this.refs.inputBox);

        this.props.onFocus(
          event,
          handle
        )
      }

//      this.refs.picker.measure(this.getPickerLayout.bind(this));

    }
    _togglePicker(event){
        //this.setState({isPickerVisible:!this.state.isPickerVisible});
        //this._scrollToInput(event);
    }
    render(){

      return(<View><Field
        {...this.props}
        ref='inputBox'
        onPress={this.props.onPress}
        >
        <View style={[
                      this.props.containerStyle]}
          onLayout={this.handleLayoutChange.bind(this)}>

          <Text style={this.props.labelStyle}>{this.props.label}</Text>
            <Picker ref='picker'
              {...this.props.pickerProps}
              selectedValue={this.state.value}
              onValueChange={this.handleValueChange.bind(this)}
              >
              {Object.keys(this.props.options).map((value) => (
                <PickerItem
                  key={value}
                  value={value}
                  label={this.props.options[value]}
                />
            ), this)}

            </Picker>


        </View>
        </Field>


    </View>
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
      fieldValue:{
        fontSize: 34/2,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight:10,
        paddingTop: 4,
        justifyContent: 'center',

        color: '#C7C7CC'
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
