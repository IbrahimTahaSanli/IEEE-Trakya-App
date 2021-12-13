import React, { Component, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  WebView,
  BackHandler

} from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import Head from './Components/Head';
import Tile from './Components/Tile';
import HTMLView from 'react-native-htmlview';

//import SERVER_NAME from "./app.json"

const SERVER_NAME = "http://192.168.43.63:5000/";

class Root extends Component{
  constructor(){
    super();

    this.blackTheme = false;

    this.pallete = ["#006699","#5AE3E2","#6087D6","#5F5EED", "#8B5AE3",this.blackTheme ? "#3c3c40" : "#ecf1f4" , this.blackTheme ? "#F4F3EF" : "#000000"]
//#F4F3EF

    this._scrollView = 0;
    this.keys = 0;

    this.state = { zIndex2:-1001, zIndex:-1000, Left: new Animated.Value(0), ModalVis:false, Data:null, ModalData:null }

    this.styles = StyleSheet.create({
      mainColumn : {
        flexDirection:"column",
        flex:1,
        left:this.state.Left
      },
      
      headerRow : {
        flexDirection:"row",
        backgroundColor:this.pallete[5],
        borderBottomColor:this.pallete[0],
        borderBottomWidth:5,
        top:0,
        height:Dimensions.get("window").height*0.13,
        justifyContent:"space-between"
      },

      headerLogo:{
        width:"100%",
        height:"100%",
        flex:0.7,
        resizeMode:"contain",
        left:"15%"
      },

      headerMenu:{
        fontSize:50,
        color:this.pallete[0],
      },
      
      page:{
        backgroundColor:this.pallete[2],
        flexDirection:"row",
        width:Dimensions.get("window").width*1,
        flex:87,
        zIndex:100
      },
      
      row : {
        flexDirection : "row",
        height:Dimensions.get("window").height * 0.20,
        padding:"3%",
        marginVertical:"0.5%",
        marginHorizontal: "1%",
        backgroundColor:this.pallete[5],
        borderRadius:15,
        borderWidth:2,
        borderColor:"#ffffff00"
      },
    

      showcase : {
        flexDirection : "row",
        height: Dimensions.get("window").height * 0.35,
        width: Dimensions.get("window").width*0.98,
        
        backgroundColor:this.pallete[5],
        margin:"1%",

        borderWidth:0,
        borderRadius:15,
        borderColor:this.pallete[4],
        overflow:"hidden"
      },

      splitter:{
        width:"100%",
        height:2,
        backgroundColor:this.pallete[0]+"5a"
      },

      footer: {
        flex:9,
        flexDirection:"row",
        backgroundColor:this.pallete[5],
        borderTopWidth:1,
        borderTopColor:this.pallete[0]
      },

      footerButtons: {
        flex:0.33,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:15
      },

      footerButtonsActive: {
        backgroundColor:"#f0dbff",
      },

      modal : {
        position:"absolute",
        zIndex:this.state.zIndex2,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.87,
        bottom:0,
        opacity:1,
        backgroundColor:"white",
      },


    });
  
    this.modalShowContent = this.modalShowContent.bind(this);
    this.backAction = this.backAction.bind(this);
    this.showBan = this.showBan.bind(this);
    this.hideBan = this.hideBan.bind(this);
  }

  backAction(){
    if(this.state.ModalVis)
      this.setState({ModalVis:false, ModalData:null, zIndex2:-1001});
    else
      BackHandler.exitApp()

    return true;
  }


  showcaseInterval = 0;
  showcaseMax = 3;
  showcaseCurrent = 0;

  componentDidMount(){
    fetch(SERVER_NAME+"homepage").then((resp)=>{
      return resp.text();
    }).then((text)=>{
      this.setState({Data:JSON.parse(text.substring(1, text.length - 1).split("\\u0022").join("\""))})
      this.setState({ModalVis:true});
      this.startScroll()
    })
    
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  startScroll(){
    this.showcaseInterval = setInterval(()=>{
      this.showcaseCurrent += 1; 
      this._scrollView.scrollTo({x:(this.showcaseCurrent % this.showcaseMax) * (Dimensions.get("window").width),animated:true})
    },5000)
  }

  componentWillUnmount(){
    if(this.showcaseInterval)
      clearInterval(this.showcaseInterval);
  }

  modalShowContent(content){

    fetch(SERVER_NAME+"content/"+content).then((resp)=>resp.text()).then((text)=>{
      this.setState({ModalData:JSON.parse(text.split("\\u0022").join("\""))})
      this.setState({ModalVis:true, zIndex2:1001})
    })
  }

  showBan(){
    this.setState({zIndex:1000})
    Animated.timing(this.state.Left, {toValue:-Dimensions.get("window").width*0.4,duration:500}).start();
  }
  hideBan(){
    this.setState({zIndex:-1000})
    Animated.timing(this.state.Left, {toValue:0,duration:500}).start();
  }

  render(){
    // <View style={this.styles.splitter} />

    return(
    <Animated.View style={this.styles.mainColumn}>
      <StatusBar></StatusBar>

      <View style={this.styles.headerRow}> 
        <Image style={this.styles.headerLogo} source={require("./photos/Logo.png")}/>
        <TouchableOpacity style={{paddingRight:"5%"}} onPress={this.showBan}>
          <Text style={this.styles.headerMenu}>...</Text>
        </TouchableOpacity>
      </View>

      <View style={[{width:Dimensions.get("window").width*2,flex:87,zIndex:100}]}>
        <View style={[this.styles.page]}>
          <ScrollView style={{ flexGrow: 1}}>
            <View style={this.styles.showcase}>
              <ScrollView pagingEnabled={true} horizontal={true} contentContainerStyle={this.styles.showcaseContent} ref={view => this._scrollView = view}>
                  { this.state.Data != null ? 
                      (this.state.Data.Header.map((item)=>(
                        <Head 
                          key={this.keys++}
                          pallete={this.pallete} 
                          text={item.Title}
                          image={SERVER_NAME+"content/"+item.PhotoPath}/>
                      )))
                      :null
                    }   
              </ScrollView>
            </View>

            { this.state.Data != null ? (
              this.state.Data.News.map((item)=>(
                <Tile  
                  onTouch={this.modalShowContent}
                  key={this.keys++}
                  content={item.Content}
                  pallete={this.pallete}
                  IsLeft={this.keys%2} 
                  image={SERVER_NAME+"content/"+item.HeaderPhoto} 
                  title={item.Title}
                  description={item.Description}
                  committee = {item.CommitteeName}
                  />
              )))
              :null}  

          </ScrollView>
        </View>
      </View>

      <View style={this.styles.modal}>
        { this.state.ModalData != null  ?(
        <HTMLView
          value={this.state.ModalData.html}
          stylesheet={StyleSheet.create(this.state.ModalData.css)}
        />) : <View/> }
      </View>
      
      <TouchableOpacity style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height,position:"absolute",zIndex:this.state.zIndex}} onPress={this.hideBan}></TouchableOpacity>
      <View style={{width:Dimensions.get("window").width * 0.6, height:Dimensions.get("window").height, position:"absolute", left:Dimensions.get("window").width, backgroundColor:"blue"}}>
        
      </View>
    </Animated.View>
    );
  }
}

//<Image source={require("./photos/unnamed.jpg")}/>

export default Root;
