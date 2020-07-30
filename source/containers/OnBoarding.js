import React, { Component } from "react";
import {AppRegistry, StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, Platform,SafeAreaView,AsyncStorage,
    StatusBar} from "react-native";
import RNSwiper from "../components/RN_Swiper";
import {TutorialOne,TutorialTwo,TutorialThree} from '../images/index'

let iPad = Platform.isPad

const {width,height} = Dimensions.get('window')


class OnBoarding extends Component {

    constructor(props) {
        super(props);
        this.state = {
           isAuth:false
        };
    };

    render() {
        return (
            <RNSwiper navigation={this.props.navigation}>
                <ImageBackground source={TutorialOne}
                                 style={styles.imgViewStyle}>
                    <SafeAreaView style={{flex: 1}}>
                        <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                            <TouchableOpacity onPress={() => alert("Add Navigation In Which You Want To Go After Skip")}>
                                <Text style={styles.skipBtnStyle}>Skip</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textViewStyle}>
                            <Text style={styles.titleTextStyle}>
                                On-demand access to drink{'\n'}recipes & information
                            </Text>
                            <Text style={styles.infoTextStyle}>Library of over 100 Classic Craft{'\n'}Cocktail Recipes</Text>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
                <ImageBackground source={TutorialTwo}
                                 style={styles.imgViewStyle}>
                    <SafeAreaView style={{flex: 1}}>
                        <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                            <TouchableOpacity onPress={() => alert("Add Navigation In Which You Want To Go After Skip")}>
                                <Text style={styles.skipBtnStyle}>Skip</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textViewStyle}>
                            <Text style={styles.titleTextStyle}>
                                By Bartenders, For {'\n'} Bartenders
                            </Text>
                            <Text style={styles.infoTextStyle}>
                                Discover histories and talking points {'\n'}about your favorite cocktails curated by{'\n'} professional bartenders.
                            </Text>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
                <ImageBackground source={TutorialThree}
                                 style={styles.imgViewStyle}>
                    <SafeAreaView style={{flex: 1}}>
                        <View style={{flex:1}}/>
                        <View style={styles.textViewStyle}>
                            <Text style={styles.titleTextStyle}>
                                Bookmark Your Favorite {'\n'} Drinks!</Text>
                            <Text style={styles.infoTextStyle}>
                                Create your own customized library{'\n'}of all your favorite classic cocktail recipes{'\n'}right inside the app!
                            </Text>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </RNSwiper>

        );
     }
}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#16a085"
    },
    // Header styles
    header: {
        color: "#FFFFFF",
        fontFamily: "Avenir",
        fontSize: 30,
        fontWeight: "bold",
        marginVertical: 15
    },
    // Text below header
    text: {
        color: "#FFFFFF",
        fontFamily: "Avenir",
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: "center"
    },
    textViewStyle:{
        flex:1,alignItems:'center',justifyContent:'center',
        ...Platform.select({
            ios:{
                marginBottom:60
            },
            android:{
                marginBottom:90
            }
        })

    },
    titleTextStyle:{
        fontSize:iPad?24:20,
        color:'#FFFFFF',
        fontWeight:'bold',
        textAlign:'center'
    },
    infoTextStyle:{
        marginTop:5,
        fontSize:iPad?20:17,
        color:'#FFFFFF',
        textAlign:'center'
    },
    imgViewStyle:{
        height:height,width:width,
        backgroundColor:"#000",
        resizeMode:"contain"
    },
    skipBtnStyle:{
        marginTop:20,fontSize:18,color:'#FFFFFF',fontFamily:'Roboto',fontWeight:'bold'
    }
});



export default OnBoarding;
