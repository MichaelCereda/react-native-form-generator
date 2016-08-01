'use strict';


import React from 'react';
let { View, StyleSheet, TextInput, Text, TimePickerAndroid} = require('react-native');
import {Field} from './Field';


  export class TimePickerComponent extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        date: props.date? new Date(props.date) :'',
        isPickerVisible: false
      }

    }

    handleLayoutChange(e){
      let {x, y, width, height} = {... e.nativeEvent.layout};

      this.setState(e.nativeEvent.layout);
      //e.nativeEvent.layout: {x, y, width, height}}}.
    }

    handleValueChange(date){

      this.setState({date:date});

      if(this.props.onChange)      this.props.onChange(date);
      if(this.props.onValueChange) this.props.onValueChange(date);
    }

    setTime(date){
      this.setState({date:date});
      if(this.props.onChange)      this.props.onChange((this.props.prettyPrint)?this.props.dateTimeFormat(date):date);
      if(this.props.onValueChange) this.props.onValueChange(date);
    }

    async _togglePicker(event){
      try {
        const {action, hour, minute} = await TimePickerAndroid.open({...this.props.options});
        if (action !== TimePickerAndroid.dismissedAction) {
          let date = new Date(0,0,0,hour, minute);

          this.handleValueChange(date);
          // Selected year, month (0-11), day
        }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
      }


    }
    render(){
      let timeValue =this.props.dateTimeFormat(this.state.date);
      let placeholderComponent = (this.props.placeholderComponent)
                        ? this.props.placeholderComponent
                        : <Text style={[formStyles.fieldText, this.props.placeholderStyle]}>{this.props.placeholder}</Text>
      return(<View><Field
        {...this.props}
        ref='inputBox'
        onPress={this._togglePicker.bind(this)}>
        <View style={[formStyles.fieldContainer,
            formStyles.horizontalContainer,
            this.props.containerStyle]}
          onLayout={this.handleLayoutChange.bind(this)}>

          {placeholderComponent}
          <View style={[formStyles.alignRight, formStyles.horizontalContainer]}>
            <Text style={[formStyles.fieldValue,this.props.valueStyle ]}>{
            (this.state.date)?this.state.date.toLocaleDateString():""
          }</Text>


          </View>
          {(this.props.iconRight)
              ? this.props.iconRight
              : null
            }
        </View>
        </Field>
        {(this.state.isPickerVisible)?
          <DatePickerAndroid
            {...this.props}
           date={this.state.date || new Date()}

           onDateChange={this.handleValueChange.bind(this)}
         />

        : null
      }

    </View>
      )
    }

  }
  TimePickerComponent.propTypes = {
    dateTimeFormat: React.PropTypes.func,
    prettyPrint: React.PropTypes.bool
  }

  TimePickerComponent.defaultProps = {
    dateTimeFormat: (date)=>{
      if(!date) return "";
      return date.toLocaleTimeString();
    }
  };


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
