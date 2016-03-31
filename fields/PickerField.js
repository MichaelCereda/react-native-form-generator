'use strict';

import React from 'react-native';
let { View, StyleSheet, TextInput, Text, PickerIOS} = React;
import {Field} from './Field';

var PickerItemIOS = PickerIOS.Item;

  export class PickerField extends React.Component{
    constructor(props){
      super();
      this.state = {
        value: props.value,
        isPickerVisible: false
      }
      this.pickerMeasures = {};
    }
    handleLayoutChange(e){
      let {x, y, width, height} = {... e.nativeEvent.layout};

      this.setState(e.nativeEvent.layout);
      //e.nativeEvent.layout: {x, y, width, height}}}.
    }

    handleValueChange(value){

      this.setState({value:value});

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

//      this.refs.picker.measure(this.getPickerLayout.bind(this));

    }
    _togglePicker(event){
        this.setState({isPickerVisible:!this.state.isPickerVisible});
        //this._scrollToInput(event);
    }
    render(){
      //
      // if (this.state.isMultipleSelect){
      //             let iconName = 'ios-circle-outline';
      //             let iconColor = {};
      //             if (this.state.multipleSelectValue[name]) {
      //                 iconName = 'ios-checkmark-outline';
      //                 iconColor = {color:'red'};
      //             }
      //             return (
      //                 <TouchableWithoutFeedback
      //                     onPress={()=>{this.checkStateChange(name)}}>
      //                     <Icon name={iconName} size={30} {...iconColor}/>
      //                 </TouchableWithoutFeedback>
      //             );
      //         }else {
      //             return (
      //                 <View style={styles.accessory}/>
      //             );
      //         }

      // <Switch
      // onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
      //
      // value={this.state.falseSwitchIsOn} />

      // this.props.options.map((option, i) => {
      //   pickerOptions.push(<PickerItemIOS
      //     key={i}
      //     value={option.value}
      //     label={option.label}
      //   />);
      // });
      return(<View><Field
        {...this.props}
        ref='inputBox'
        onPress={this._togglePicker.bind(this)}>
        <View style={[formStyles.fieldContainer, formStyles.horizontalContainer,  this.props.containerStyle]}
          onLayout={this.handleLayoutChange.bind(this)}>

          <Text style={formStyles.fieldText}>{this.props.placeholder}</Text>
          <View style={[formStyles.alignRight,
              formStyles.horizontalContainer]}>
            <Text style={formStyles.fieldValue}>{(this.state.value)?this.props.options[this.state.value]:''}</Text>

          </View>
          {(this.props.iconRight)
              ? this.props.iconRight
              : null
            }

        </View>
        </Field>
        {(this.state.isPickerVisible)?
        <PickerIOS ref='picker'
          selectedValue={this.state.value}
onValueChange={this.handleValueChange.bind(this)}
          >
          {Object.keys(this.props.options).map((value) => (
            <PickerItemIOS
              key={value}
              value={value}
              label={this.props.options[value]}
            />
        ), this)}

        </PickerIOS>
        : null
      }

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
