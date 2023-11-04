import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Svg, Path, Circle, Mask, G, Defs, Stop, LinearGradient } from 'react-native-svg';

export default function Footer({ navigation, screen }) {

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
                            stroke={screen === 'Home' ? 'black' : '#ADA4A5'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Social')}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path d="M7.24487 14.7815L10.238 10.8914L13.6522 13.5733L16.5813 9.79297" stroke={screen === 'Social' ? 'black' : '#ADA4A5'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <Circle cx="19.9954" cy="4.20027" r="1.9222" stroke={screen === 'Social' ? 'black' : '#ADA4A5'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M14.9245 3.12012H7.65679C4.64535 3.12012 2.77808 5.25284 2.77808 8.26428V16.3467C2.77808 19.3581 4.60874 21.4817 7.65679 21.4817H16.2609C19.2724 21.4817 21.1396 19.3581 21.1396 16.3467V9.30776" stroke={screen === 'Social' ? 'black' : '#ADA4A5'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Progresstrack')}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M15.0402 4.05126C16.0502 4.45326 16.3592 5.85326 16.7722 6.30326C17.1852 6.75326 17.7762 6.90626 18.1032 6.90626C19.8412 6.90626 21.2502 8.31526 21.2502 10.0523V15.8473C21.2502 18.1773 19.3602 20.0673 17.0302 20.0673H6.97024C4.63924 20.0673 2.75024 18.1773 2.75024 15.8473V10.0523C2.75024 8.31526 4.15924 6.90626 5.89724 6.90626C6.22324 6.90626 6.81424 6.75326 7.22824 6.30326C7.64124 5.85326 7.94924 4.45326 8.95924 4.05126C9.97024 3.64926 14.0302 3.64926 15.0402 4.05126Z" stroke={screen === 'Progresstrack' ? 'black' : '#ADA4A5'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M17.4955 9.5H17.5045" stroke={screen === 'Progresstrack' ? 'black' : '#ADA4A5'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M15.179 13.128C15.179 11.372 13.756 9.94897 12 9.94897C10.244 9.94897 8.82104 11.372 8.82104 13.128C8.82104 14.884 10.244 16.307 12 16.307C13.756 16.307 15.179 14.884 15.179 13.128Z" stroke={screen === 'Progresstrack' ? 'black' : '#ADA4A5'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Diet')}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <G id="Environment / Coffee">
                            <Path id="Vector" d="M4 20H10.9433M10.9433 20H11.0567M10.9433 20C10.9622 20.0002 10.9811 20.0002 11 20.0002C11.0189 20.0002 11.0378 20.0002 11.0567 20M10.9433 20C7.1034 19.9695 4 16.8468 4 12.9998V8.92285C4 8.41305 4.41305 8 4.92285 8H17.0767C17.5865 8 18 8.41305 18 8.92285V9M11.0567 20H18M11.0567 20C14.8966 19.9695 18 16.8468 18 12.9998M18 9H19.5C20.8807 9 22 10.1193 22 11.5C22 12.8807 20.8807 14 19.5 14H18V12.9998M18 9V12.9998M15 3L14 5M12 3L11 5M9 3L8 5" stroke={screen === 'Diet' ? 'black' : '#ADA4A5'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        </G>
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M11.9847 15.3462C8.11707 15.3462 4.81421 15.931 4.81421 18.2729C4.81421 20.6148 8.09611 21.2205 11.9847 21.2205C15.8523 21.2205 19.1542 20.6348 19.1542 18.2938C19.1542 15.9529 15.8733 15.3462 11.9847 15.3462Z" stroke={screen === 'Profile' ? 'black' : '#ADA4A5'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M11.9846 12.0059C14.5227 12.0059 16.5799 9.94779 16.5799 7.40969C16.5799 4.8716 14.5227 2.81445 11.9846 2.81445C9.44655 2.81445 7.38845 4.8716 7.38845 7.40969C7.37988 9.93922 9.42369 11.9973 11.9523 12.0059H11.9846Z" stroke={screen === 'Profile' ? 'black' : '#ADA4A5'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#FFFFFF',
        borderTopColor: '#ADA4A5',
        borderWidth: 0.2,
    },
    inner: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 20,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})