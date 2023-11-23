import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Svg, Path, Circle, Mask, G, Defs, Stop, LinearGradient, Rect } from 'react-native-svg';
import Footer from '../Common/Footer';
const arrow2 = require('../assets/images/arrow2.png');
const trainer = require('../assets/images/userProfile.png');
const edit = require('../assets/images/edit.png');
const reward = require('../assets/images/reward.png');
const prize = require('../assets/images/prize.png');
const profile = require('../assets/images/user2.png');
const bell = require('../assets/images/bell.png');
const info = require('../assets/images/info.png');
const privacy = require('../assets/images/privacy.png');
const settings = require('../assets/images/settings.png');
const wallet = require('../assets/images/wallet.png');
const question = require('../assets/images/question.png');
const logout = require('../assets/images/power-off.png');

export default function Profile({ navigation }) {

    const screen = 'Profile';

    const navigationLinks = [
        { icon: profile, name: 'Personal', icon2: arrow2, path: 'ProfileSettings' },
        { icon: settings, name: 'General', icon2: arrow2, path: 'ProfileSettings' },
        { icon: bell, name: 'Notification', icon2: arrow2, path: 'ProfileSettings' },
        { icon: privacy, name: 'Privacy', icon2: arrow2, path: 'ProfileSettings' },
        { icon: wallet, name: 'Payments', icon2: arrow2, path: 'ProfileSettings' },
        { icon: question, name: 'Help', icon2: arrow2, path: 'ProfileSettings' },
        { icon: info, name: 'About', icon2: arrow2, path: 'ProfileSettings' },
        { icon: logout, name: 'Logout', icon2: arrow2, path: 'ProfileSettings' },
    ]
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ backgroundColor: '#f7f8f8', width: '9%', height: '50%', alignItems: 'center', borderRadius: 8, top: 2, justifyContent: 'center' }} onPress={() => navigation.navigate("Home")}>
                        <Svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M5.33325 10.6666L0.666585 5.99992L5.33325 1.33325" stroke="#1D1617" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.noti}>Profile</Text>
                    <TouchableOpacity>
                        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Rect width="32" height="32" rx="8" fill="#F7F8F8" />
                            <Circle cx="13" cy="16" r="2" fill="#1D1617" />
                            <Circle cx="19" cy="16" r="2" fill="#1D1617" />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: -180 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.profileContent}>

                        <View style={{display:'flex', flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.editImg}>
                                <Image source={trainer} style={styles.profileImg} />
                                <View style={styles.editIconView}>
                                    <Image source={edit} style={styles.editIcon} />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.profileText}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    color: '#1d1617'
                                }}>
                                    Garvit Varshney
                                </Text>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    opacity: 0.6,
                                    color: '#7b6f72'
                                }}>
                                    garvitvarshney81@gmail.com
                                </Text>
                            </View>
                        </View>
                        <View style={styles.prizeCards}>
                            <View style={styles.rewardView}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    color: '#92A3FD'
                                }}>
                                    180cm
                                </Text>
                                <Text style={{
                                    fontSize: 12,
                                    opacity: 0.6,
                                }}>
                                    Height
                                </Text>
                            </View>
                            <View style={styles.rewardView}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    color: '#92A3FD'
                                }}>
                                    85Kg
                                </Text>
                                <Text style={{
                                    fontSize: 12,
                                    opacity: 0.6,
                                }}>
                                    Weight
                                </Text>
                            </View>

                            <View style={styles.rewardView}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    color: '#92A3FD'
                                }}>
                                    22yo
                                </Text>
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: '600',
                                    opacity: 0.6,
                                }}>
                                    Age
                                </Text>
                            </View>
                        </View>




                        <View style={{
                            backgroundColor: '#eee',
                            height: 2,
                            width: '100%',
                            margin: 15,
                        }}>
                        </View>




                        {/* navigation links start */}
                        <View style={styles.navBox}>
                            {navigationLinks.map((item) => (
                                <NavLink key={item.name} data={item} />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>


            <View style={styles.footer}>
                <Footer navigation={navigation} screen={screen} />
            </View>
        </View>
    )
}

const NavLink = ({ data }) => {
    return (
        <View style={{
            width: '100%',
        }}>
            <TouchableOpacity style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image source={data.icon}
                        style={{
                            height: 22,
                            width: 22,
                        }} />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '600',
                        opacity: 0.8,
                    }}>
                        {data.name}
                    </Text>
                </View>
                <Image source={data.icon2}
                    style={{
                        height: 20,
                        width: 20,
                        transform: [{ rotate: '180deg' }],
                    }} />
            </TouchableOpacity>
        </View>
    );
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
    },
    header: {
        backgroundColor: '#fff',
        marginTop: 25,
        padding: 20,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    noti: {
        color: '#000000',
        fontSize: 22,
        fontWeight: '500',
        fontFamily: 'OpenSans-Bold',
    },
    navImg: {
        height: 30,
        width: 40,
    },
    navText: {
        fontSize: 22,
        marginLeft: 10,
        fontWeight: '500',
    },
    profileContent: {
        padding: 10,
        width: '100%',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
    },
    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 60,
    },
    editImg: {
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    editIconView: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        bottom: 15,
        marginRight: 30,
        backgroundColor: '#5A4FCF',
        padding: 2,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    editIcon: {
        height: 20,
        width: 20,
        tintColor: '#fff',
        resizeMode: 'contain',
    },
    profileText: {
        marginTop: 10,
        marginRight: 40,
        alignContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    prizeCards: {
        flexDirection: 'row',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: -10,
    },
    rewardView: {
        backgroundColor: '#eee',
        height: 65,
        width: 95,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        gap: 5,
        shadowColor: '#fff',
        shadowRadius: 40,
        elevation: 40,
        shadowOpacity: 1,
    },
    rewardImg: {
        height: '100%',
        width: '100%',
    },
    prizeContent: {
        alignContent: 'center',
        alignItems: 'center',
    },
    navBox: {
        width: '100%',
        padding: 10,
        gap: 30,
    }
})