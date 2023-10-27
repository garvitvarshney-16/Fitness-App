import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';

export default function Home({ navigation }) {

    const [userInfo, setUserInfo] = useState();
    const [auth, setAuth] = useState();
    const [stepCount, setStepCount] = useState(0);

    const logout = async () => {
        try {
            await AuthSession.revokeAsync({
                token: auth.accessToken
            }, {
                revocationEndpoint: "https://oauth2.googleapis.com/revoke"
            });
        } catch (error) {
            alert("Error", error)
        }

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
                setAuth(authFromJson);
                console.log(authFromJson);
            }
            else {
                alert("Error in fetching access token");
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
            console.log(data);
            setUserInfo(data);
        });
    };

    const getGoogleFitData = async (authToken) => {
        const endpoint = "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";
        const dataType = "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps";
        const startTimeMillis = Date.now() - 24 * 60 * 60 * 1000; // Start time (e.g., 24 hours ago)
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
                if (response.bucket && response.bucket.length > 0) {
                    const dataset = response.bucket[0].dataset;
                    if (dataset && dataset.length > 0) {
                        const stepData = dataset[0].point;
                        if (stepData && stepData.length > 0) {
                            const stepValue = stepData[0].value[0].intVal;
                            setStepCount(stepValue);
                        }
                    }
                }
                // Process and handle the Google Fit data as needed.
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    useEffect(() => {
        if (auth) {
            getUserData();
            console.log(auth.accessToken);
        }
    }, [auth])



    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Text>{userInfo?.email}</Text>
            <Text>{stepCount}</Text>
            <Button title='Logout' onPress={() => logout()} />
            <Button title='Get Fitness Data' onPress={() => getGoogleFitData(auth.accessToken)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
})