import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { Svg, Path, Circle, Mask, G, Defs, Stop, LinearGradient } from 'react-native-svg';
import Footer from '../Common/Footer';

const user1 = require('../assets/images/profile1.jpg');
const user2 = require('../assets/images/profile2.jpg');
const user3 = require('../assets/images/profile3.jpg');
const user4 = require('../assets/images/profile4.jpg');
const user5 = require('../assets/images/profile5.jpg');
const post1 = require('../assets/images/post1.jpg');
const post2 = require('../assets/images/post2.jpg');
const post3 = require('../assets/images/post3.jpg');
const post4 = require('../assets/images/post4.jpg');
const post5 = require('../assets/images/post5.jpg');

export default function Social({ navigation }) {

    const screen = 'Social';

    const data = [
        { username: 'Gaurav Singh', userProfile: user1, post: post1, time: '18 min ago.', caption: 'Accepting a new challenge with new style.', kudos: 18, comments: 6, },
        { username: 'Rishabh', userProfile: user2, post: post2, time: '20 min ago.', caption: 'Starting martial art training', kudos: 24, comments: 2, },
        { username: 'Shivansh', userProfile: user3, post: post3, time: '25 min ago.', caption: 'Completed a hard core workout session', kudos: 21, comments: 1, },
        { username: 'Garvit', userProfile: user4, post: post4, time: '35 min ago.', caption: 'Starting martial art training', kudos: 20, comments: 9, },
        { username: 'Harshit', userProfile: user5, post: post5, time: '44 min ago.', caption: 'Starting martial art training', kudos: 12, comments: 5, },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Community</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <G id="User / Users_Group">
                            <Path id="Vector" d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </G>
                    </Svg>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <Post item={item} />}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginBottom: 60 }}
            />
            <TouchableOpacity style={styles.postButtonContainer}>  
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path d="M12 5V19" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    <Path d="M5 12H19" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </Svg>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Footer navigation={navigation} screen={screen} />
            </View>
        </View>
    )
}

const Post = ({ item }) => {

    const { userProfile, username, caption, post, time, kudos, comments } = item;

    return (
        <View style={styles.post}>
            <View style={styles.postHead}>
                <Image source={item.userProfile} style={styles.userProfile} />
                <View style={styles.nameBox}>
                    <Text style={styles.userName}>{item.username}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
            </View>
            <View style={styles.captionBox}>
                <Text style={styles.caption}>{item.caption}</Text>
            </View>
            <View style={styles.imagebox}>
                <Image source={item.post} style={styles.postImage} />
            </View>
            <View style={styles.reactBox}>
                <TouchableOpacity>
                    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <Path d="M19.0711 13.1421L13.4142 18.799C12.6332 19.58 11.3668 19.58 10.5858 18.799L4.92893 13.1421C2.97631 11.1895 2.97631 8.02369 4.92893 6.07107C6.88155 4.11845 10.0474 4.11845 12 6.07107C13.9526 4.11845 17.1184 4.11845 19.0711 6.07107C21.0237 8.02369 21.0237 11.1895 19.0711 13.1421Z"
                            stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                </TouchableOpacity>
            </View>
            <View style={styles.countRow}>
                <Text style={[styles.time, { color: '#ADA4A5' }]}>{item.kudos} kudos</Text>
                <Text style={[styles.time, { color: '#ADA4A5' }]}>{item.comments} comments</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    header: {
        marginTop: 55,
        paddingHorizontal: 25,
        padding: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ADA4A5',
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'OpenSans-Medium'
    },
    main: {
        marginBottom: 10,
    },
    post: {
        width: '100%',
        paddingVertical: 10,
    },
    postHead: {
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    userProfile: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    nameBox: {
        marginLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    userName: {
        fontSize: 16,
        fontFamily: 'OpenSans-Medium'
    },
    time: {
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
    },
    captionBox: {
        padding: 10,
        paddingHorizontal: 15,
        width: '100%',
    },
    caption: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
    },
    imagebox: {
        width: '100%',
        height: 250,
    },
    postImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    reactBox: {
        flexDirection: 'row',
        alignContent: 'center',
        height: 40,
        padding: 10,
        gap: 10,
        alignItems: 'center',
    },
    countRow: {
        flexDirection: 'row',
        alignContent: 'center',
        height: 20,
        paddingHorizontal: 10,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    postButtonContainer: {
        position: 'absolute',
        height: 60,
        width: 60,
        borderRadius: 30,
        bottom: 80,
        backgroundColor: 'white',
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})