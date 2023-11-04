import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Svg, Path, Circle, Mask, G, Rect } from 'react-native-svg';

export default function Notification({ navigation }) {
    const notifications = [
        {
            time: 'About 1 minute ago',
            message: "Hey, it's time for lunch",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },

        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        }, {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        {
            time: 'About 3 hours ago',
            message: "Don't miss your lower body workout",
        },
        // Add more notifications as needed
    ];
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ backgroundColor: '#f7f8f8', width: '9%', height: '26%', alignItems: 'center', borderRadius: 8, top: 2, justifyContent: 'center' }} onPress={() => navigation.navigate("Home")}>
                        <Svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M5.33325 10.6666L0.666585 5.99992L5.33325 1.33325" stroke="#1D1617" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.noti}>Notification</Text>
                    <TouchableOpacity>
                        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Rect width="32" height="32" rx="8" fill="#F7F8F8" />
                            <Circle cx="13" cy="16" r="2" fill="#1D1617" />
                            <Circle cx="19" cy="16" r="2" fill="#1D1617" />
                        </Svg>
                    </TouchableOpacity>
                </View>

                <View style={styles.n}>
                    <ScrollView style={styles.notification}>
                        {notifications.map((notification, index) => (
                            <View key={index} style={styles.notificationCard}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.about1Minutes}>{notification.message}</Text>
                                    <Text style={styles.heyItsTime2}>{notification.time}</Text>
                                </View>
                                <TouchableOpacity style={styles.svg}>
                                    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M7.00008 7.58341C7.32225 7.58341 7.58341 7.32225 7.58341 7.00008C7.58341 6.67792 7.32225 6.41675 7.00008 6.41675C6.67792 6.41675 6.41675 6.67792 6.41675 7.00008C6.41675 7.32225 6.67792 7.58341 7.00008 7.58341Z" fill="#ADA4A5" stroke="#ADA4A5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <Path d="M7.00008 3.49992C7.32225 3.49992 7.58341 3.23875 7.58341 2.91659C7.58341 2.59442 7.32225 2.33325 7.00008 2.33325C6.67792 2.33325 6.41675 2.59442 6.41675 2.91659C6.41675 3.23875 6.67792 3.49992 7.00008 3.49992Z" fill="#ADA4A5" stroke="#ADA4A5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <Path d="M7.00008 11.6667C7.32225 11.6667 7.58341 11.4055 7.58341 11.0833C7.58341 10.7612 7.32225 10.5 7.00008 10.5C6.67792 10.5 6.41675 10.7612 6.41675 11.0833C6.41675 11.4055 6.67792 11.6667 7.00008 11.6667Z" fill="#ADA4A5" stroke="#ADA4A5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#fff',
        marginTop: 5,
        padding: 20,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    notification: {
        top: '-5%',
        marginLeft: '5%'
    },
    noti: {
        color: '#000000',
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'OpenSans-Bold',
    },
    svg: {
        marginRight: '5%'
    },
    notificationCard: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
        gap: 7,
        marginTop: -15,
    },
    about1Minutes: {
        fontSize: 17,
        lineHeight: 30,
        color: '#1d1617',
        fontWeight: '500'
    },
    heyItsTime2: {
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 18,
        color: '#7b6f72',
    },
})
