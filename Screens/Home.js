import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, AppState, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { Svg, Path, Circle, Mask, G, Defs, Rect, Stop, LinearGradient } from 'react-native-svg';
import * as Progress from 'react-native-progress';
import Footer from '../Common/Footer';
import * as Notifications from 'expo-notifications';
import { collection, doc, setDoc } from 'firebase/firestore';

const graph = require('../assets/images/Sleep-Graph.png');

export default function Home({ navigation }) {

    const screen = 'Home';

    const registerForPushNotificationsAsync = async () => {
        let token = null;

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus === 'granted') {
            const { data } = await Notifications.getDevicePushTokenAsync();
            token = data;
        }
        return token;
    };

    const handleNotification = (notification) => {
        // Handle the received notification here based on the app state
        if (AppState.currentState === 'active') {
            // App is in the foreground, show an in-app notification or perform custom actions
            Alert.alert('Notification', notification);
        } else {
            // App is in the background or not running, handle the notification here
            console.log('Notification', notification);
            navigation.navigate('Home');
        }
    };

    useEffect(() => {
        registerForPushNotificationsAsync();

        const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
            handleNotification(notification);
        });

        const notificationResponseListener = Notifications.addNotificationResponseReceivedListener((response) => {
            // Perform actions when the user clicks the notification
            console.log('Notification response received:', response);
            // Navigate to the desired screen upon clicking the notification
            navigation.navigate('Home');
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(notificationResponseListener);
        };
    }, []);

    const [userInfo, setUserInfo] = useState();
    const [auth, setAuth] = useState();
    const [stepCount, setStepCount] = useState(0);
    const stepGoal = 24000;
    const heartPointGoal = 100;
    const [heartPoint, setHeartPoint] = useState(98);

    const logout = async () => {
        setAuth(undefined);
        setUserInfo(undefined);
        await AsyncStorage.removeItem("auth");
        navigation.navigate('Onboard');
    };

    useEffect(() => {
        const getAuthData = async () => {
            const jsonValue = await AsyncStorage.getItem("auth");
            if (jsonValue != null) {
                const authFromJson = JSON.parse(jsonValue);
                console.log("Auth Data", authFromJson);
                setAuth(authFromJson);
            }
            else {
                logout();
            }
        }
        getAuthData();
    }, [])

    const getUserData = async () => {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        });
        userInfoResponse.json().then(data => {
            if (data.error) {
                logout();
            } else {
                setUserInfo(data);
                setUserData(data);
            }
        });
    };

    const setUserData = async (data) => {
        await AsyncStorage.setItem('userInfo', JSON.stringify(data));
    }

    const getGoogleFitData = async (authToken) => {
        const endpoint = "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";
        const dataType = "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps";

        const currentDate = new Date();
        // Set start time to the beginning of the current day (12:01 AM)
        const startTime = new Date(currentDate);
        startTime.setHours(0, 1, 0, 0); // Set hours to 0 (midnight), minutes to 1, seconds to 0, milliseconds to 0
        const startTimeMillis = startTime.getTime(); // Get the milliseconds // Start time (e.g., 24 hours ago)
        const endTimeMillis = Date.now(); // End time (current time)

        const request = {
            aggregateBy: [
                {
                    dataSourceId: dataType,
                },
            ],
            bucketByTime: {
                durationMillis: 86400000
            },
            startTimeMillis,
            endTimeMillis,
        };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json;encoding=utf-8",
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                const data = await response.json();
                const steps = data.bucket[0].dataset[0].point[0]?.value[0]?.intVal ? data.bucket[0].dataset[0]?.point[0]?.value[0].intVal : 0;
                setStepCount(steps);
                // Process and handle the Google Fit data as needed.
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log("Error here", error);
        }
    };

    useEffect(() => {
        if (auth) {
            getUserData();
            getGoogleFitData(auth.accessToken);
        }
    }, [auth])

    const refreshData = async () => {
        await getGoogleFitData(auth.accessToken);
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.span}>Welcome Back,</Text>
                        <Text style={styles.name}>{userInfo?.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.notiBtn} onPress={() => navigation.navigate("Notification")}>
                        <Svg width="24" height="24" viewBox="0 0 18 18" fill="none">
                            <Mask id="mask0_414_4917" maskUnits="userSpaceOnUse" x="2" y="0" width="20" height="20">
                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 0.75H16.1227V13.761H2.25V0.75Z" fill="white" />
                            </Mask>
                            <G mask="url(#mask0_414_4917)">
                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.18525 1.875C6.564 1.875 4.737 3.9285 4.737 5.77125C4.737 7.3305 4.30425 8.05125 3.92175 8.68725C3.615 9.198 3.37275 9.6015 3.37275 10.4782C3.498 11.8927 4.43175 12.636 9.18525 12.636C13.9125 12.636 14.8755 11.8597 15 10.4295C14.9977 9.6015 14.7555 9.198 14.4487 8.68725C14.0662 8.05125 13.6335 7.3305 13.6335 5.77125C13.6335 3.9285 11.8065 1.875 9.18525 1.875ZM9.18526 13.761C5.67826 13.761 2.50876 13.5135 2.25001 10.5262C2.24776 9.29025 2.62501 8.66175 2.95801 8.10825C3.29476 7.54725 3.61201 7.0185 3.61201 5.77125C3.61201 3.3465 5.85151 0.75 9.18526 0.75C12.519 0.75 14.7585 3.3465 14.7585 5.77125C14.7585 7.0185 15.0758 7.54725 15.4125 8.10825C15.7455 8.66175 16.1228 9.29025 16.1228 10.4782C15.861 13.5135 12.6923 13.761 9.18526 13.761Z" fill="#1D1617" />
                            </G>
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.14876 16.875H9.14726C8.30651 16.8742 7.51076 16.5037 6.90701 15.831C6.69926 15.6007 6.71801 15.2445 6.94901 15.0375C7.18001 14.829 7.53551 14.8477 7.74326 15.0795C8.13176 15.5122 8.63051 15.75 9.14801 15.75H9.14876C9.66851 15.75 10.1695 15.5122 10.5588 15.0787C10.7673 14.8485 11.1228 14.8297 11.353 15.0375C11.584 15.2452 11.6028 15.6015 11.395 15.8317C10.789 16.5045 9.99176 16.875 9.14876 16.875Z" fill="#1D1617" />
                            <Circle cx="12.5" cy="2.5" r="2.5" fill="#F7F8F8" />
                            <Circle cx="12.5" cy="2.5" r="1.5" fill="#FF0000" />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.progressBar} activeOpacity={0.5} onPress={() => refreshData()}>
                        <Progress.Circle
                            size={150}
                            progress={heartPoint / heartPointGoal}
                            thickness={7}
                            unfilledColor='#D3D3D3'
                            color='#2DBE9C'
                            borderColor="#FEFEFE"
                            strokeCap='round'
                            style={{
                                shadowColor: 'grey',
                                shadowOffset: { width: 2, height: 2 },
                                elevation: 10,
                                shadowOpacity: 0.1,
                                shadowRadius: 1,
                            }}
                            textStyle={{ fontSize: 16, fontWeight: '600' }} />
                        <Progress.Circle
                            size={120}
                            progress={stepCount / stepGoal}
                            thickness={7}
                            unfilledColor='#D3D3D3'
                            color='#1F4FAA'
                            borderColor="#FEFEFE"
                            strokeCap='round'
                            style={{
                                shadowColor: 'grey',
                                shadowOffset: { width: 2, height: 2 },
                                elevation: 10,
                                shadowOpacity: 0.1,
                                shadowRadius: 1,
                                position: 'absolute'
                            }}
                            textStyle={{ fontSize: 16, fontWeight: '600' }} />
                        <View style={styles.textBox}>
                            <Text style={styles.heartPoints}>
                                {heartPoint}
                            </Text>
                            <Text style={styles.steps}>
                                {stepCount}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.firstRow}>
                        <View style={styles.row1}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                                <Path d="M16.1401 1C16.8067 2.66667 16.9609 5.41622 19.6401 7.5C25.1401 11.7778 22.6401 14 17.6401 16C12.6401 18 13.6401 23 7.14006 23C3.14006 23 1.48231 21.8155 2.14005 20.5C2.7978 19.1845 6.2801 20.6039 8.14006 18C10.6401 14.5 10.1401 8 8.64006 3M16 13C17.1046 13 18 12.1046 18 11C18 10.2597 17.5978 9.61339 17 9.26758"
                                    stroke="#1F4FAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>
                            <Text style={styles.span1}>Steps</Text>
                        </View>
                        <View style={styles.row1}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <Path d="M15.9392 18.5C14.5265 19.5369 13.1119 20.2936 12 20.6631C8.5 19.5 2 14.5 2 9C2 5.96245 4.46244 3.5 7.5 3.5C9.36015 3.5 11.0046 4.42345 12 5.8369C12.9954 4.42345 14.6399 3.5 16.5 3.5C19.5375 3.5 22 5.96245 22 9C22 9.87325 21.8361 10.7339 21.5464 11.5686M13 14.5H15L17 12L18.5 17L20.5 14.5H22.5"
                                    stroke="#2DBE9C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>
                            <Text style={styles.span1}>Heart Pt.</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.navBox}
                        onPress={() => navigation.navigate('Training')}>
                        <Text>Daily Training Schedule</Text>
                        <View style={styles.button}>
                            <Text style={styles.btnText}>Check</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.cardCont}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Sleep</Text>
                            <Text style={styles.subTitle}>3h 5min</Text>
                            <Image source={graph} style={styles.graphImage} />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Calories</Text>
                            <Text style={styles.subTitle}>60 kCal</Text>
                            <Text style={styles.newText}>600 Left</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.navBox}>
                        <View>
                            <Text style={styles.navTitle}>Heart rate</Text>
                            <Text style={styles.navTitle2}>89</Text>
                        </View>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M16 16L19.2929 12.7071C19.6834 12.3166 19.6834 11.6834 19.2929 11.2929L16 8M19 12L5 12" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navBox}>
                        <View>
                            <Text style={styles.navTitle}>Blood oxygen</Text>
                            <Text style={styles.navTitle2}>97%</Text>
                        </View>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M16 16L19.2929 12.7071C19.6834 12.3166 19.6834 11.6834 19.2929 11.2929L16 8M19 12L5 12" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navBox}>
                        <View>
                            <Text style={styles.navTitle}>Recent training</Text>
                        </View>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M16 16L19.2929 12.7071C19.6834 12.3166 19.6834 11.6834 19.2929 11.2929L16 8M19 12L5 12" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navBox}>
                        <View>
                            <Text style={styles.navTitle}>Distance</Text>
                            <Text style={styles.navTitle2}>1.91km</Text>
                        </View>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M16 16L19.2929 12.7071C19.6834 12.3166 19.6834 11.6834 19.2929 11.2929L16 8M19 12L5 12" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                        </Svg>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.botLink}
                onPress={() => navigation.navigate('ChatBot')}
            >
                <Text style={styles.botTxt}>AI</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Footer navigation={navigation} screen={screen} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        height: '100%',
        width: '100%',
        paddingBottom: 62
    },
    header: {
        marginTop: 55,
        paddingHorizontal: 25,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    span: {
        fontFamily: 'OpenSans-Medium',
        color: '#808080',
        fontSize: 14,
    },
    name: {
        fontFamily: 'OpenSans-Bold',
        color: '#000000',
        fontSize: 16,
    },
    notiBtn: {
        borderRadius: 8,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(000, 000, 000, 0.04)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBar: {
        paddingHorizontal: 25,
        marginTop: 25,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subMain: {
        paddingHorizontal: 25,
        marginTop: 25,
    },
    // font color #418AE5
    textBox: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    steps: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F4FAA',
    },
    heartPoints: {
        fontSize: 32,
        color: '#2DBE9C',
        fontWeight: '600',
    },
    firstRow: {
        marginTop: 10,
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    span1: {
        fontSize: 16,
        fontFamily: 'OpenSans-Medium',
    },
    navBox: {
        width: '90%',
        backgroundColor: '#EAEFFF',
        height: 60,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#93A8FD',
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    btnText: {
        fontSize: 14,
        fontFamily: 'OpenSans-Bold',
    },
    cardCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 20,
    },
    card: {
        backgroundColor: '#FEFEFE',
        elevation: 5,
        width: '45%',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'OpenSans-Medium',
        color: '#92A3FD',
    },
    graphImage: {
        alignSelf: 'center',
    },
    newText: {
        marginTop: 10,
        fontSize: 28,
        fontFamily: 'OpenSans-Bold',
        color: '#92A3FD',
    },
    navTitle: {
        fontSize: 16,
    },
    navTitle2: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
    },
    botLink: {
        position: 'absolute',
        height: 60,
        width: 60,
        borderRadius: 30,
        bottom: 80,
        backgroundColor: '#C58BF2',
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botTxt: {
        fontSize: 20,
        fontFamily: 'OpenSans-Bold',
    }
})