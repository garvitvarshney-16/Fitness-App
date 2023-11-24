import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { Svg, Path } from 'react-native-svg';

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
        'OpenSans-Italic': require('../assets/fonts/OpenSans-Italic.ttf'),
        'OpenSans-BoldItalic': require('../assets/fonts/OpenSans-BoldItalic.ttf'),

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
                    <Text style={styles.subHead}>Maximize Your Athletic Potential with <Text style={styles.brand}>FitPhy</Text></Text>
                    <Text style={styles.subHead2}>Onboard to unlock AI-powered coaching, real-time feedback, and a community of athletes. Get started!</Text>
                    <TouchableOpacity activeOpacity={0.9} style={styles.base}
                        onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
                    >
                        <Svg width="30" height="32" viewBox="0 0 55 57" fill="none">
                            <Path d="M54.9993 28.732C54.9993 26.8369 54.8159 24.8808 54.5103 23.0469H28.041V33.8669H43.2012C42.5899 37.3513 40.5726 40.4078 37.5773 42.3639L46.6245 49.3939C51.9428 44.4423 54.9993 37.229 54.9993 28.732Z" fill="#4280EF" />
                            <Path d="M28.0457 56.1181C35.6258 56.1181 41.9833 53.6117 46.6292 49.3326L37.5819 42.3638C35.0756 44.0755 31.8357 45.0535 28.0457 45.0535C20.7101 45.0535 14.536 40.102 12.2742 33.5L2.98242 40.6522C7.75055 50.1273 17.4091 56.1181 28.0457 56.1181Z" fill="#34A353" />
                            <Path d="M12.2718 33.439C11.1104 29.9546 11.1104 26.1645 12.2718 22.6801L2.98008 15.4668C-0.993361 23.4137 -0.993361 32.7666 2.98008 40.6523L12.2718 33.439Z" fill="#F6B704" />
                            <Path d="M28.0457 11.1267C32.0191 11.0656 35.9314 12.5938 38.8045 15.3447L46.8126 7.27552C41.7388 2.50739 35.0145 -0.060063 28.0457 0.00106689C17.4091 0.00106689 7.75055 5.9918 2.98242 15.4669L12.2742 22.6803C14.536 16.0171 20.7101 11.1267 28.0457 11.1267Z" fill="#E54335" />
                        </Svg>
                        <Text style={styles.buttonText}>Continue with Google</Text>
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
        padding: 10,
    },
    brand: {
        fontFamily: 'OpenSans-BoldItalic',
        color: '#901391',
    },
    subHead: {
        marginTop: 10,
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
        fontFamily: 'OpenSans-Medium',
        color: "#8d8d8d",
        textAlign: 'left',
    },
    base: {
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 10,
        marginTop: 30,
        borderRadius: 15,
        width: "90%",
        height: 60,
        backgroundColor: "#901391",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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

