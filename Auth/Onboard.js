import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Google from 'expo-auth-session/providers/google'

const banner = require('../assets/images/banner.jpg')

export default function Onboard() {

    const [accessToken, setAccessToken] = useState();
    const [userInfo, setUserInfo] = useState();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "695485437157-1cjmk7sk4pmgi9n4sum5j6s79c5b7ckv.apps.googleusercontent.com",
        iosClientId: "695485437157-2gn77vo13navtpab6ve8331s1hdsqhu6.apps.googleusercontent.com",
        expoClientId: "695485437157-ejphndvhgn5gc29pass6tr0cb3r86dfr.apps.googleusercontent.com",
    })

    useEffect(() => {
        if (response?.type === "success") {
            setAccessToken(response.authentication?.accessToken);
        }
    }, [response]);

    const getUserData = async () => {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        userInfoResponse.json().then(data => {
            setUserInfo(data);
        })
    };

    const showUserData = () => {
        if (userInfo) {
            return (
                <View>
                    <Text>Welcome {userInfo.name}</Text>
                    <Text>Email {userInfo.email}</Text>
                </View>
            )
        }
    }



    const [fontsLoaded] = useFonts({
        'PollerOne-Regular': require('../assets/fonts/PollerOne-Regular.ttf'),
        'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Medium': require('../assets/fonts/OpenSans-Medium.ttf'),
        'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style='dark' />
            <View style={styles.imageContainer}>
                <Image source={banner} style={styles.banner} />
            </View>
            <View style={styles.main}>
                {showUserData()}
                <LinearGradient style={styles.groupChild} locations={[0, 1]} colors={['#8b78ff', '#5451d6']} useAngle={true} angle={135.96} />
                <Text style={styles.brand}>FitPhy</Text>
                <Text style={styles.subHead}>Maximize Your Athletic Potential</Text>
                <Text style={styles.subHead2}>Onboard to unlock AI-powered coaching, real-time feedback, and a community of athletes. Get started!</Text>
                <TouchableOpacity activeOpacity={0.9} style={styles.base}
                    onPress={accessToken ? getUserData : () => promptAsync({ useProxy: true, showInRecents: true })}
                >
                    <LinearGradient style={styles.base1} locations={[0, 1]} colors={['#8b78ff', '#5451d6']} useAngle={true} angle={135.96}>
                        <Text style={styles.buttonText}>{accessToken ? "Get Data" : "Login"}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        width: "100%",
        height: '42%',
    },
    banner: {
        height: '100%',
        width: '100%',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    main: {
        paddingHorizontal: 10,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
    },
    groupChild: {
        borderRadius: 13,
        width: 25,
        height: 5
    },
    rectangleParent: {
        flex: 1,
        width: "100%",
        height: 5
    },
    brand: {
        fontSize: 46,
        marginTop: 46,
        fontWeight: '600',
        color: "#756ef3",
        textAlign: "center",
        fontFamily: 'PollerOne-Regular',
    },
    subHead: {
        fontSize: 37,
        marginTop: 10,
        fontWeight: "700",
        color: "#2f394b",
        textAlign: "center",
        width: 295,
        fontFamily: 'OpenSans-Bold',
    },
    subHead2: {
        fontSize: 14,
        marginTop: 10,
        fontFamily: 'OpenSans-Bold',
        color: "#8d8d8d",
        textAlign: "center",
        width: 295
    },
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    base1: {
        marginTop: 42,
        borderRadius: 15,
        width: "80%",
        height: 60,
        backgroundColor: "transparent",
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#5451d6',
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'OpenSans-Bold',
        color: "#fff",
        textAlign: "center",
    }
})

