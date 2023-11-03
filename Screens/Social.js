import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,StatusBar,  TouchableOpacity, ScrollView } from 'react-native';
import { Svg, Path, Circle, Mask, G, Defs, Stop, LinearGradient } from 'react-native-svg';
import Footer from '../Common/Footer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import Stories from './Stories';
import Post from './Post';



export default function Social({ navigation }) {
    return (


        <View style={styles.container}>
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                    animated={true}
                />
                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        alignItems: 'center',
                        marginTop: 28,
                    }}>
                    <FontAwesome name="plus-square-o" style={{ fontSize: 24 }} />
                    <Text
                        style={{
                            fontFamily: 'Lobster-Regular',
                            fontSize: 25,
                            fontWeight: '500',
                        }}>
                        Social
                    </Text>
                    <Feather name="navigation" style={{ fontSize: 24 }} />
                </View>

                <ScrollView>
                    <Stories />
                    <Post />
                    <View
                        style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                        <Ionic
                            name="ios-reload-circle-sharp"
                            style={{ fontSize: 60, opacity: 0.2 }}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style = {styles.footer}>
            <Footer navigation={navigation} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#FFFFFF'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }
})