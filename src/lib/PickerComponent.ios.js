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
        value: props.value,
        isPickerVisible: false
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

      this.setState({value:value});

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
        this.setState({isPickerVisible:!this.state.isPickerVisible});
        this.props.onPress && this.props.onPress(event);
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
      //   pickerOptions.push(<PickerItem
      //     key={i}
      //     value={option.value}
      //     label={option.label}
      //   />);
      // });
      let picker = <Picker ref='picker'
        {...this.props.pickerProps}
        selectedValue={this.state.value}
        onValueChange={this.handleValueChange.bind(this)}
        mode='dropdown'
        >
        {Object.keys(this.props.options).map((value) => (
          <PickerItem
            key={value}
            value={value}
            label={this.props.options[value]}
          />
      ), this)}

      </Picker>;
      let pickerWrapper = React.cloneElement(this.props.pickerWrapper,{ onHidePicker:()=>{this.setState({isPickerVisible:false})}}, picker);
      let iconLeft = this.props.iconLeft,
          iconRight = this.props.iconRight;

      if(iconLeft && iconLeft.constructor === Array){
        iconLeft = (!this.state.isPickerVisible)
                    ? iconLeft[0]
                    : iconLeft[1]
      }
      if(iconRight && iconRight.constructor === Array){
        iconRight = (!this.state.isPickerVisible)
                    ? iconRight[0]
                    : iconRight[1]
      }
      return(<View><Field
        {...this.props}
        ref='inputBox'
        onPress={this._togglePicker.bind(this)}>
        <View style={
                      this.props.containerStyle}
          onLayout={this.handleLayoutChange.bind(this)}>
          {(iconLeft)
            ? iconLeft
            : null
          }
          <Text style={this.props.labelStyle}>{this.props.label}</Text>
          <View style={this.props.valueContainerStyle}>
            <Text style={this.props.valueStyle}>
              {(this.state.value)?this.props.options[this.state.value]:''}
            </Text>

          </View>
          {(this.props.iconRight)
              ? this.props.iconRight
              : null
            }

        </View>
        </Field>
        {(this.state.isPickerVisible)?
          pickerWrapper : null
        }

    </View>
      )
    }

  }

  PickerComponent.propTypes = {
    pickerWrapper: React.PropTypes.element,
  }

  PickerComponent.defaultProps = {
    pickerWrapper: <View/>
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
