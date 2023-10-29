import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';

const banner = require('../assets/images/banner.jpg')
const logo = require('../assets/images/fitPhy-name.png')

export default function Onboard({ navigation }) {

    const [auth, setAuth] = useState();
    const [requireRefresh, setRequireRefresh] = useState(false);

    const scopes =
        [
            'https://www.googleapis.com/auth/fitness.activity.read',
            'https://www.googleapis.com/auth/fitness.activity.write',
            'https://www.googleapis.com/auth/fitness.location.read',
            'https://www.googleapis.com/auth/fitness.location.write',
            'https://www.googleapis.com/auth/fitness.body.read',
            'https://www.googleapis.com/auth/fitness.body.write',
            'https://www.googleapis.com/auth/fitness.nutrition.read',
            'https://www.googleapis.com/auth/fitness.nutrition.write',
            'https://www.googleapis.com/auth/fitness.blood_pressure.read',
            'https://www.googleapis.com/auth/fitness.blood_pressure.write',
            'https://www.googleapis.com/auth/fitness.blood_glucose.read',
            'https://www.googleapis.com/auth/fitness.blood_glucose.write',
            'https://www.googleapis.com/auth/fitness.oxygen_saturation.read',
            'https://www.googleapis.com/auth/fitness.oxygen_saturation.write',
            'https://www.googleapis.com/auth/fitness.body_temperature.read',
            'https://www.googleapis.com/auth/fitness.body_temperature.write',
            'https://www.googleapis.com/auth/fitness.reproductive_health.read',
            'https://www.googleapis.com/auth/fitness.reproductive_health.write',
        ]

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "695485437157-1cjmk7sk4pmgi9n4sum5j6s79c5b7ckv.apps.googleusercontent.com",
        iosClientId: "695485437157-2gn77vo13navtpab6ve8331s1hdsqhu6.apps.googleusercontent.com",
        expoClientId: "695485437157-ejphndvhgn5gc29pass6tr0cb3r86dfr.apps.googleusercontent.com",
        scopes: scopes
    })

    useEffect(() => {
        if (response?.type === "success") {
            setAuth(response.authentication);

            const persistAuth = async () => {
                await AsyncStorage.setItem("auth", JSON.stringify(response.authentication));
            };
            persistAuth();
        }
    }, [response]);

    useEffect(() => {
        const getPersistedAuth = async () => {
            const jsonValue = await AsyncStorage.getItem("auth");
            if (jsonValue != null) {
                const authFromJson = JSON.parse(jsonValue);
                setAuth(authFromJson);
                console.log(authFromJson);
                setRequireRefresh(!AuthSession.TokenResponse.isTokenFresh({
                    expiresIn: authFromJson.expiresIn,
                    issuedAt: authFromJson.issuedAt
                }));
            }
        };
        getPersistedAuth();
    }, []);

    const getClientId = () => {
        if (Platform.OS === 'ios') {
            return "695485437157-2gn77vo13navtpab6ve8331s1hdsqhu6.apps.googleusercontent.com";
        } else if (Platform.OS === 'android') {
            return "695485437157-1cjmk7sk4pmgi9n4sum5j6s79c5b7ckv.apps.googleusercontent.com";
        } else {
            console.log("Invalid platform - not handled");
        }
    }

    const refreshToken = async () => {
        const clientId = getClientId();
        const tokenResult = await AuthSession.refreshAsync({
            clientId: clientId,
            refreshToken: auth.refreshToken
        }, {
            tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token"
        });

        tokenResult.refreshToken = auth.refreshToken;

        setAuth(tokenResult);
        await AsyncStorage.setItem("auth", JSON.stringify(tokenResult));
        setRequireRefresh(false);
    };

    if (requireRefresh) {
        refreshToken();
    }

    useEffect(() => {
        const checkAuthState = async () => {
            const jsonValue = await AsyncStorage.getItem("auth");
            console.log("Auth State", jsonValue);
            if (jsonValue != null) {
                navigation.navigate('Home');
            }
        }
        checkAuthState();
    }, [auth]);

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
            <View style={styles.main}>
                <View style={styles.imageContainer}>
                    <Image source={banner} style={styles.banner} />
                </View>
                <View style={styles.subMain}>
                    <View style={styles.line}></View>
                    <View style={styles.brandContainer}>
                        <Image source={logo} style={styles.brand} />
                    </View>
                    <Text style={styles.subHead}>Maximize Your Athletic Potential</Text>
                    <Text style={styles.subHead2}>Onboard to unlock AI-powered coaching, real-time feedback, and a community of athletes. Get started!</Text>
                    <TouchableOpacity activeOpacity={0.9} style={styles.base}
                        onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    imageContainer: {
        width: "100%",
        height: 400,
        marginTop: 25,
        backgroundColor: '#FEFEFE',
    },
    banner: {
        height: 400,
        width: '100%',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    main: {
        width: '100%',
        height: '100%',
    },
    subMain: {
        elevation: 5,
        height: '100%',
        marginHorizontal: -10,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: 10,
        paddingHorizontal: 20,
    },
    brandContainer: {
        marginTop: 10,
        height: 70,
        width: 200,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    },
    brand: {
        height: '100%',
        width: '100%',
        alignSelf: 'flex-start',
        resizeMode: 'cover',
    },
    subHead: {
        fontSize: 28,
        marginLeft: 10,
        fontWeight: "700",
        color: "#2f394b",
        textAlign: 'left',
        fontFamily: 'OpenSans-Bold',
    },
    subHead2: {
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10,
        fontFamily: 'OpenSans-Bold',
        color: "#8d8d8d",
        textAlign: 'left',
    },
    base: {
        marginTop: 42,
        borderRadius: 15,
        width: "100%",
        height: 60,
        backgroundColor: "#3979cb",
        justifyContent: 'center',
    },
    line: {
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 15,
        width: "10%",
        height: 5,
        backgroundColor: "#1C62BC",
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'OpenSans-Bold',
        color: "#fff",
        textAlign: "center",
    },
})

