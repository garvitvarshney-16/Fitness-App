import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, AppState, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { Svg, Path, Circle, Mask, G } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import Footer from '../Common/Footer';
import * as Notifications from 'expo-notifications';

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
            }
        });
    };

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
                <ScrollView>

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

                    <View style={styles.heart}>
                        <Text style={{ fontFamily: 'OpenSans-Medium', }}>Heart Rate</Text>
                        <Text style={{ color: '#808080', bottom: 7, fontSize: 10 }}>4 hours ago</Text>

                        <TouchableOpacity style={styles.bpm}>
                            <View style={styles.hmini}>
                                <Svg width="40" height="40" viewBox="0 0 48 48" fill="none"  >
                                    <Path d="M9 19.0345C9 13.3091 12.8117 8 18.0312 8C21.6533 8 24.341 10.382 26 13.7611C27.6589 10.3822 30.3466 8 33.9688 8C39.1889 8 43 13.31 43 19.0345C43 31.2888 26 40 26 40C26 40 14.5487 34.4872 10.4431 25.4444H20.5848L22.1968 22.5788L24.0797 29.1692L28.4891 23.5H34V21.5H27.5109L24.9203 24.8308L22.8032 17.4212L19.4152 23.4444H9.67984C9.89182 24.1288 10.1486 24.7957 10.4431 25.4444L6 25.4443V23.4443L9.67984 23.4444C9.24643 22.0453 9 20.5731 9 19.0345Z"
                                        fill="#FF2800" />
                                </Svg>
                                <Text style={{ top: 18, fontFamily: 'OpenSans-Medium' }}>{heartPoint} bpm</Text>
                            </View>

                            <Text style={{ top: 18 }}>All day average 62 bpm</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.heart}>
                        <Text style={{ fontFamily: 'OpenSans-Medium', }}>Sleep</Text>
                        <Text style={{ color: '#808080', bottom: 7, fontSize: 10 }}>4 hours ago</Text>

                        <TouchableOpacity style={styles.bpm}>
                            <View style={styles.hmini}>
                                <Svg width="40" height="40" viewBox="0 0 48 48" fill="none"  >
                                    <Path d="M6 24C6 14.0589 14.0589 6 24 6V8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 22.4015 39.7656 20.8577 39.3293 19.4012L41.2454 18.8264C41.7363 20.4649 42 22.2017 42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24Z" fill="#7CB9E8" />
                                    <Path d="M18.5301 13.9517C18.0518 14.2279 17.8879 14.8395 18.164 15.3178C18.4402 15.7961 19.0518 15.9599 19.5301 15.6838L20.4665 15.1431L20.0147 18.8935C19.9694 19.2695 20.1404 19.6389 20.4565 19.8476C20.7726 20.0563 21.1795 20.0685 21.5075 19.8791L24.5095 18.1459C24.9878 17.8697 25.1517 17.2582 24.8756 16.7799C24.5994 16.3016 23.9878 16.1377 23.5095 16.4138L22.2395 17.1471L22.6914 13.3967C22.7367 13.0207 22.5656 12.6513 22.2495 12.4426C21.9335 12.2339 21.5266 12.2217 21.1986 12.4111L18.5301 13.9517Z" fill="#7CB9E8" />
                                    <Path d="M25.8172 9.29412C25.6743 8.76066 25.9909 8.21232 26.5244 8.06938L30.3881 7.03411C30.7539 6.93608 31.1438 7.05317 31.3951 7.33657C31.6464 7.61997 31.716 8.02101 31.5749 8.37253L29.5262 13.4767L31.941 12.8296C32.4744 12.6867 33.0228 13.0033 33.1657 13.5367C33.3087 14.0702 32.9921 14.6185 32.4586 14.7615L28.1119 15.9262C27.7461 16.0242 27.3562 15.9071 27.1049 15.6237C26.8536 15.3403 26.784 14.9392 26.9251 14.5877L28.9738 9.4836L27.042 10.0012C26.5085 10.1441 25.9602 9.82759 25.8172 9.29412Z" fill="#7CB9E8" />
                                    <Path d="M36.5556 6C36.0033 6 35.5556 6.44772 35.5556 7C35.5556 7.55228 36.0033 8 36.5556 8H39.1958L35.152 14.47C34.9593 14.7783 34.9491 15.1668 35.1254 15.4848C35.3016 15.8027 35.6365 16 36 16H41C41.5523 16 42 15.5523 42 15C42 14.4477 41.5523 14 41 14H37.8042L41.848 7.53C42.0407 7.22173 42.0509 6.83319 41.8746 6.51523C41.6984 6.19728 41.3635 6 41 6H36.5556Z" fill="#7CB9E8" />
                                    <Path d="M12.8884 27.1058C12.9643 27.8491 13.6309 28.403 14.4039 28.6488C15.2116 28.9056 16.2592 28.8837 17.371 28.4026C18.5269 27.9025 19.2033 27.0056 19.503 26.1072C19.7926 25.2392 19.7526 24.2877 19.3505 23.6823C19.256 23.5401 19.0955 23.4559 18.9248 23.4591C18.7541 23.4622 18.5968 23.5522 18.5076 23.6978C17.2142 25.8093 15.3637 26.7387 13.4326 26.5572C13.2837 26.5432 13.1363 26.5966 13.0309 26.7029C12.9255 26.8091 12.8732 26.9569 12.8884 27.1058Z" fill="#7CB9E8" />
                                    <Path d="M32.2802 21.9096C32.5862 22.5913 32.2859 23.4042 31.7393 24.0036C31.1682 24.6299 30.25 25.1347 29.0466 25.274C27.7955 25.4188 26.7612 24.9802 26.0525 24.3521C25.3677 23.7452 24.9266 22.9011 24.9722 22.1758C24.9829 22.0054 25.0798 21.8522 25.2292 21.7696C25.3786 21.687 25.5598 21.6863 25.7099 21.7678C27.8858 22.9496 29.953 22.8292 31.5346 21.7066C31.6566 21.62 31.811 21.5925 31.9554 21.6318C32.0998 21.6712 32.2189 21.7731 32.2802 21.9096Z" fill="#7CB9E8" />
                                    <Path d="M32.4478 31.8549C30.1969 28.7707 26.8611 27.1402 23.7407 27.9763C20.6203 28.8124 18.5467 31.8923 18.1395 35.6888C18.0249 36.7577 19.0627 37.5119 20.1011 37.2337L31.5215 34.1736C32.5599 33.8954 33.0815 32.7232 32.4478 31.8549Z" fill="#7CB9E8" />
                                </Svg>
                                <Text style={{ top: 18, fontFamily: 'OpenSans-Medium' }}>94</Text>
                            </View>

                            <Text style={{ top: 18 }}>All day average 92</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.heart}>
                        <Text style={{ fontFamily: 'OpenSans-Medium', }}>Steps</Text>
                        <Text style={{ color: '#808080', bottom: 7, fontSize: 10 }}>Just Now</Text>

                        <TouchableOpacity style={styles.bpm}>
                            <View style={styles.hmini}>
                                <Svg width="40" height="40" viewBox="0 0 48 48" fill="none"  >
                                    <Path d="M31.2502 8C31.2502 10.2091 29.4594 12 27.2502 12C25.0411 12 23.2502 10.2091 23.2502 8C23.2502 5.79086 25.0411 4 27.2502 4C29.4594 4 31.2502 5.79086 31.2502 8Z" fill="#50C878" />
                                    <Path d="M25.6928 28.3968L30.8857 33.5207C31.0848 33.7172 31.2405 33.9533 31.3427 34.2137L34.112 41.2693C34.5155 42.2975 34.0091 43.4582 32.9809 43.8617C31.9527 44.2653 30.7921 43.7589 30.3885 42.7307L27.7743 36.07L18.8455 27.2598C18.4087 26.8288 18.1939 26.2211 18.2629 25.6113L18.9781 19.2919C17.2542 21.0046 15.9244 23.4143 14.9053 26.607C14.5695 27.6592 13.4442 28.24 12.3919 27.9041C11.3396 27.5682 10.7589 26.4429 11.0948 25.3907C12.965 19.5312 16.0701 15.1454 21.2797 13.1341L21.3034 13.1251C22.6301 12.6321 24.0105 12.6718 25.2398 13.3074C26.4214 13.9182 27.2624 14.9731 27.8131 16.1554C28.0449 16.6532 28.2594 17.1184 28.4607 17.5551C28.9485 18.6129 29.3594 19.5041 29.7535 20.2873C30.3073 21.3877 30.7523 22.1161 31.1921 22.6285C31.5998 23.1034 32.0055 23.3952 32.5225 23.597C33.0782 23.8141 33.8572 23.9636 35.06 23.9997C36.1641 24.0328 37.0323 24.9547 36.9992 26.0588C36.966 27.1628 36.0442 28.031 34.9401 27.9979C33.4952 27.9546 32.2121 27.77 31.0673 27.323C29.8838 26.8608 28.9506 26.1584 28.157 25.2339C27.6565 24.6508 27.2176 23.9859 26.8062 23.2621L25.6928 28.3968Z" fill="#50C878" />
                                    <Path d="M18.2627 30.2198L21.5778 33.3994L20.0524 38.547C19.9343 38.9453 19.6952 39.297 19.3681 39.5531L14.2335 43.5755C13.364 44.2566 12.1069 44.1039 11.4257 43.2344C10.7445 42.3649 10.8972 41.1078 11.7668 40.4266L16.3987 36.7981L17.7944 32.0881L18.2627 30.2198Z" fill="#50C878" />
                                </Svg>
                                <Text style={{ top: 18, fontFamily: 'OpenSans-Medium' }}>{stepCount}</Text>
                            </View>

                            <Text style={{ top: 18 }}>All day average 3000</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.heart}>
                        <Text style={{ fontFamily: 'OpenSans-Medium', }}>Distance</Text>
                        <Text style={{ color: '#808080', bottom: 7, fontSize: 10 }}>Just Now</Text>

                        <TouchableOpacity style={styles.bpm}>
                            <View style={styles.hmini}>
                                <Svg width="40" height="40" viewBox="0 0 48 48" fill="none"  >
                                    <Path d="M24 13C25.6569 13 27 11.6569 27 10C27 8.34315 25.6569 7 24 7C22.3431 7 21 8.34315 21 10C21 11.6569 22.3431 13 24 13Z" fill="#FFFD37" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M24 8C22.8954 8 22 8.89543 22 10C22 11.1046 22.8954 12 24 12C25.1046 12 26 11.1046 26 10C26 8.89543 25.1046 8 24 8ZM20 10C20 7.79086 21.7909 6 24 6C26.2091 6 28 7.79086 28 10C28 12.2091 26.2091 14 24 14C21.7909 14 20 12.2091 20 10Z" fill="#333333" />
                                    <Path d="M30 23.3C30 21.6291 29.3679 20.0267 28.2426 18.8452C27.1174 17.6637 25.5913 17 24 17C22.4087 17 20.8826 17.6637 19.7574 18.8452C18.6321 20.0267 18 21.6291 18 23.3V26H20.5714L21.4286 35H26.5714L27.4286 26H30V23.3Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M19.0332 18.1556C20.3418 16.7816 22.1273 16 24 16C25.8727 16 27.6582 16.7816 28.9668 18.1556C30.2738 19.5279 31 21.3792 31 23.3V26C31 26.5523 30.5523 27 30 27H28.3379L27.5669 35.0948C27.518 35.608 27.087 36 26.5714 36H21.4286C20.913 36 20.482 35.608 20.4331 35.0948L19.6621 27H18C17.4477 27 17 26.5523 17 26V23.3C17 21.3792 17.7262 19.5279 19.0332 18.1556ZM24 18C22.6901 18 21.4234 18.5459 20.4815 19.5349C19.5381 20.5255 19 21.879 19 23.3V25H20.5714C21.087 25 21.518 25.392 21.5669 25.9052L22.3379 34H25.6621L26.4331 25.9052C26.482 25.392 26.913 25 27.4286 25H29V23.3C29 21.879 28.4619 20.5255 27.5185 19.5349C26.5766 18.5459 25.3099 18 24 18Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M8 14V22H6V14H8Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M6 17H14V19H6V17Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M42 14V22H40V14H42Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M34 17H42V19H34V17Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.1317 28.6873C14.3044 29.2119 14.0191 29.7771 13.4945 29.9498C11.6759 30.5486 10.2567 31.2797 9.31257 32.0609C8.3634 32.8462 8 33.5864 8 34.2261C8 34.7963 8.28593 35.4417 9.02167 36.1348C9.75936 36.8298 10.8807 37.5017 12.3494 38.0869C15.2812 39.2552 19.3999 40 24 40C28.6001 40 32.7188 39.2552 35.6506 38.0869C37.1193 37.5017 38.2406 36.8298 38.9783 36.1348C39.7141 35.4417 40 34.7963 40 34.2261C40 33.5864 39.6366 32.8462 38.6874 32.0609C37.7433 31.2797 36.3241 30.5486 34.5055 29.9498C33.9809 29.7771 33.6956 29.2119 33.8683 28.6873C34.041 28.1627 34.6063 27.8774 35.1309 28.0502C37.0878 28.6944 38.7595 29.5247 39.9624 30.52C41.1603 31.5111 42 32.7625 42 34.2261C42 35.5264 41.3345 36.6629 40.3497 37.5906C39.3669 38.5165 37.9986 39.3042 36.3909 39.9448C33.1699 41.2283 28.7886 42 24 42C19.2114 42 14.8301 41.2283 11.6091 39.9448C10.0014 39.3042 8.63311 38.5165 7.65027 37.5906C6.66549 36.6629 6 35.5264 6 34.2261C6 32.7625 6.83974 31.5111 8.03759 30.52C9.24047 29.5247 10.9122 28.6944 12.8691 28.0502C13.3937 27.8774 13.959 28.1627 14.1317 28.6873Z" fill="#333333" />
                                </Svg>
                                <Text style={{ top: 18, fontFamily: 'OpenSans-Medium' }}>5 km</Text>
                            </View>

                            <Text style={{ top: 18 }}>All day average 6 km</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.heart}>
                        <Text style={{ fontFamily: 'OpenSans-Medium', }}>Calories</Text>
                        <Text style={{ color: '#808080', bottom: 7, fontSize: 10 }}>Just Now</Text>

                        <TouchableOpacity style={styles.bpm}>
                            <View style={styles.hmini}>
                                <Svg width="40" height="40" viewBox="0 0 48 48" fill="none"  >
                                    <Path d="M30 26.8182C30 30.2323 27.3137 33 24 33C20.6863 33 18 30.2323 18 26.8182C18 21.4091 24 15 24 15C24 15 30 21.4091 30 26.8182Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M24 31C26.1533 31 28 29.1844 28 26.8182C28 24.7373 26.7943 22.2053 25.3295 19.9805C24.8713 19.2844 24.4116 18.6537 24 18.1198C23.5885 18.6537 23.1288 19.2844 22.6705 19.9805C21.2057 22.2053 20 24.7373 20 26.8182C20 29.1844 21.8467 31 24 31ZM22.6966 16.5398C20.9318 18.7675 18 23.0371 18 26.8182C18 30.2323 20.6863 33 24 33C27.3137 33 30 30.2323 30 26.8182C30 23.0371 27.0683 18.7675 25.3035 16.5398C24.5436 15.5806 24 15 24 15C24 15 23.4565 15.5806 22.6966 16.5398Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.8607 10.8672C11.7227 13.0509 9.47039 16.2861 8.51148 19.987C7.55258 23.6878 7.95052 27.6097 9.63324 31.0425C11.316 34.4753 14.1722 37.1922 17.6849 38.7011C21.1976 40.21 25.1345 40.4113 28.7827 39.2686L29.3806 41.1771C25.2763 42.4628 20.8473 42.2363 16.8955 40.5387C12.9438 38.8412 9.73046 35.7847 7.83739 31.9228C5.94433 28.0609 5.49665 23.6488 6.57542 19.4853C7.65418 15.3219 10.1881 11.6823 13.7183 9.22559L14.8607 10.8672Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M33.1393 37.1329C36.2773 34.9492 38.5297 31.714 39.4886 28.0131C40.4475 24.3123 40.0495 20.3904 38.3668 16.9576C36.6841 13.5248 33.8278 10.8079 30.3151 9.299C26.8024 7.79006 22.8656 7.58877 19.2173 8.73156L18.6195 6.823C22.7238 5.53736 27.1527 5.76382 31.1045 7.46137C35.0563 9.15893 38.2696 12.2154 40.1626 16.0773C42.0557 19.9392 42.5034 24.3513 41.4246 28.5148C40.3459 32.6782 37.812 36.3178 34.2817 38.7745L33.1393 37.1329Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M14 10H7.00002V8H16V17H14V10Z" fill="#333333" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M34 38H41V40H32V31H34V38Z" fill="#333333" />
                                </Svg>
                                <Text style={{ top: 18, fontFamily: 'OpenSans-Medium' }}>164</Text>
                            </View>

                            <Text style={{ top: 18 }}>All day average 500</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.heart}>
                        <Text style={{ fontFamily: 'OpenSans-Medium', }}>Recent Workouts</Text>
                        <Text style={{ color: '#50C878', bottom: 7, fontSize: 10 }}>No Data --</Text>

                        <TouchableOpacity style={styles.bpm}>
                            <View style={styles.hmini}>
                                <Svg width="40" height="40" viewBox="0 0 48 48" fill="none"  >
                                    <Path d="M31.2502 8C31.2502 10.2091 29.4594 12 27.2502 12C25.0411 12 23.2502 10.2091 23.2502 8C23.2502 5.79086 25.0411 4 27.2502 4C29.4594 4 31.2502 5.79086 31.2502 8Z" fill="#50C878" />
                                    <Path d="M25.6928 28.3968L30.8857 33.5207C31.0848 33.7172 31.2405 33.9533 31.3427 34.2137L34.112 41.2693C34.5155 42.2975 34.0091 43.4582 32.9809 43.8617C31.9527 44.2653 30.7921 43.7589 30.3885 42.7307L27.7743 36.07L18.8455 27.2598C18.4087 26.8288 18.1939 26.2211 18.2629 25.6113L18.9781 19.2919C17.2542 21.0046 15.9244 23.4143 14.9053 26.607C14.5695 27.6592 13.4442 28.24 12.3919 27.9041C11.3396 27.5682 10.7589 26.4429 11.0948 25.3907C12.965 19.5312 16.0701 15.1454 21.2797 13.1341L21.3034 13.1251C22.6301 12.6321 24.0105 12.6718 25.2398 13.3074C26.4214 13.9182 27.2624 14.9731 27.8131 16.1554C28.0449 16.6532 28.2594 17.1184 28.4607 17.5551C28.9485 18.6129 29.3594 19.5041 29.7535 20.2873C30.3073 21.3877 30.7523 22.1161 31.1921 22.6285C31.5998 23.1034 32.0055 23.3952 32.5225 23.597C33.0782 23.8141 33.8572 23.9636 35.06 23.9997C36.1641 24.0328 37.0323 24.9547 36.9992 26.0588C36.966 27.1628 36.0442 28.031 34.9401 27.9979C33.4952 27.9546 32.2121 27.77 31.0673 27.323C29.8838 26.8608 28.9506 26.1584 28.157 25.2339C27.6565 24.6508 27.2176 23.9859 26.8062 23.2621L25.6928 28.3968Z" fill="#50C878" />
                                    <Path d="M18.2627 30.2198L21.5778 33.3994L20.0524 38.547C19.9343 38.9453 19.6952 39.297 19.3681 39.5531L14.2335 43.5755C13.364 44.2566 12.1069 44.1039 11.4257 43.2344C10.7445 42.3649 10.8972 41.1078 11.7668 40.4266L16.3987 36.7981L17.7944 32.0881L18.2627 30.2198Z" fill="#50C878" />
                                </Svg>
                                <Text style={{ top: 18, fontFamily: 'OpenSans-Medium' }}>No Data</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={styles.heart}>
                        <Text style={{ fontFamily: 'OpenSans-Medium', }}>Heart Rate</Text>
                        <Text style={{ color: '#808080', bottom: 7, fontSize: 10 }}>4 hours ago</Text>

                        <TouchableOpacity style={styles.bpm}>
                            <View style={styles.hmini}>
                                <Svg width="30" height="30" viewBox="0 0 48 48" fill="none"  >
                                    <Path d="M9 19.0345C9 13.3091 12.8117 8 18.0312 8C21.6533 8 24.341 10.382 26 13.7611C27.6589 10.3822 30.3466 8 33.9688 8C39.1889 8 43 13.31 43 19.0345C43 31.2888 26 40 26 40C26 40 14.5487 34.4872 10.4431 25.4444H20.5848L22.1968 22.5788L24.0797 29.1692L28.4891 23.5H34V21.5H27.5109L24.9203 24.8308L22.8032 17.4212L19.4152 23.4444H9.67984C9.89182 24.1288 10.1486 24.7957 10.4431 25.4444L6 25.4443V23.4443L9.67984 23.4444C9.24643 22.0453 9 20.5731 9 19.0345Z"
                                        fill="#FF2800" />
                                </Svg>
                                <Text style={{ top: 18, fontFamily: 'OpenSans-Medium' }}>54 bpm</Text>
                            </View>

                            <Text style={{ top: 18 }}>All day average 62 bpm</Text>
                        </TouchableOpacity>
                    </View> */}

                </ScrollView>

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
        width: '60%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
        // backgroundColor:'#000'
    },
    span1: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
    },
    heart: {
        display: 'flex',
        alignSelf: 'center',
        marginTop: '5%',
        width: '90%',
        height: '80',
        backgroundColor: '#E9EEFF',
        borderRadius: 15,
        padding: 10,
        gap: 8
    },
    bpm: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    hmini: {
        flexDirection: 'row',
        gap: 5
    }
})