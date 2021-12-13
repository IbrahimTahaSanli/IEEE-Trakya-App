import React, { Component, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions
} from 'react-native';


export default class Head extends Component{
    constructor(props){
        super(props);

        this.props = props;

        this.pallete = props.pallete;

        this.styles = StyleSheet.create({
            showcaseInner:{
                alignItems:"flex-end",
                backgroundColor: this.pallete[5],
                height:Dimensions.get("window").height * 0.35,
                width:Dimensions.get("window").width * 0.98,
              },
        
              showcaseImage:{
                width:"100%",
                height:"100%"
              },
        
              showcaseText:{
                position:"absolute",
                zIndex:1,
                color:"white",
                bottom:"10%",
                fontSize:16,
                left:"10%"
              },
            });
    }

    render(){
        return(
        <View style={[this.styles.showcaseInner]}>
            <Image source={{uri:this.props.image}} style={[this.styles.showcaseImage]}></Image>
            <Text style={[this.styles.showcaseText]}>{this.props.text}</Text>
        </View>
        );
    }
}