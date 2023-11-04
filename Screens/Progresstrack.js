import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Svg, Path, Circle, Mask, G, Defs, Stop, LinearGradient } from 'react-native-svg';
import Footer from '../Common/Footer';

const pose1 = require('../assets/images/pose1.png');
const pose2 = require('../assets/images/pose2.png');
const pose3 = require('../assets/images/pose3.png');

export default function Progresstrack({ navigation }) {

    const screen = 'Progresstrack';

    return (
        <View style={styles.container}>
            <View style={styles.bottomBox}>
                <View style={styles.box}>
                    <Image source={pose1} />
                </View>
                <View style={styles.box}>
                    <Image source={pose2} />
                </View>
                <View style={styles.box}>
                    <Image source={pose3} />
                </View>
            </View>
            <View style={styles.footer}>
                <Footer navigation={navigation} screen={screen} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    bottomBox: {
        width: '100%',
        height: 70,
        position: 'absolute',
        bottom: 100,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    box: {
        height: 80,
        width: 80,
        borderWidth: 1,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ADA4A5',
    }
})