import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Svg, Path, Circle, Mask, G, Defs, Stop, LinearGradient } from 'react-native-svg';
import Footer from '../Common/Footer';

export default function Profile({ navigation }) {

    const screen = 'Profile';

    return (
        <View style={styles.container}>
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
    }
})