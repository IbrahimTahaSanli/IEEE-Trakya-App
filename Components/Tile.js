import React, { Component, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default class Tile extends Component{
    constructor(props){
        super(props);

        this.props = props;

        this.pallete = props.pallete;
        this.styles = StyleSheet.create({
            row : {
                flexDirection : this.props.IsLeft == 0 ? "row" : "row-reverse" ,
                height:Dimensions.get("window").height * 0.20,
                padding:"3%",
                marginVertical:"0.5%",
                marginHorizontal: "1%",
                backgroundColor:this.pallete[5],
                borderRadius:15,
                borderWidth:2,
                borderColor:"#ffffff00"
              },
              rowInner: {
                flexDirection:"column",
                flex:0.7,
                padding:"2%",
                overflow:'hidden',
                justifyContent:"space-between"
              },
              rowHeader:{
                fontSize:17,
                color:this.pallete[6]
              },
              rowText:{
                color:this.pallete[6]
              },
              rowAll: {
                color:this.pallete[6]
              },
              rowImage:{
                flex:0.3,
                height:"100%",
                width:"100%",
                borderRadius:15,
                borderWidth:0,
                borderColor:this.pallete[4]
              },
            });
    }

    render(){
        return (
            <TouchableOpacity onPress={()=>this.props.onTouch(this.props.content)} style={this.styles.row}>
                <Image style={this.styles.rowImage} source={{uri:this.props.image}}/>
                <View style={this.styles.rowInner}>
                    <Text style={this.styles.rowHeader}>{this.props.title}</Text>
                    <Text style={this.styles.rowText}>{this.props.description}</Text>
                    <TouchableOpacity><Text style={this.styles.rowAll}>Bütün {this.props.committee} Mesajları</Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}
