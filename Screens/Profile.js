import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Svg, Path, Circle, Mask, G, Defs, Stop, LinearGradient, Rect } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../Common/Footer';
const trainer = require('../assets/images/userProfile.png');
const edit = require('../assets/images/edit.png');

export default function Profile({ navigation }) {

    const screen = 'Profile';

    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setUserInfo(undefined);
        await AsyncStorage.removeItem("auth");
        navigation.navigate('Onboard');
    };

    useEffect(() => {
        const getAuthData = async () => {
            setLoading(true);
            const jsonValue = await AsyncStorage.getItem("userInfo");
            if (jsonValue != null) {
                const authFromJson = JSON.parse(jsonValue);
                console.log("User Data", authFromJson);
                setUserInfo(authFromJson);
                setLoading(false);
            }
        }
        getAuthData();
        setLoading(false);
    }, [])

    if (loading) {
        <ActivityIndicator
            size='large'
            color='#2B3F6C'
        />
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.profileContent}>
                        <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 20, }}>
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
                                    {userInfo?.name}
                                </Text>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    opacity: 0.6,
                                    color: '#7b6f72'
                                }}>
                                    {userInfo?.email}
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
                                    180 cm
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
                                    85 kg
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
                                    22 Y
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
                        <View style={styles.navLinks}>
                            <TouchableOpacity style={styles.navLink}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M20.0378 2.7201C19.0731 1.75945 17.5097 1.76004 16.5457 2.72142L9.0903 10.1583C8.49401 10.753 8.14344 11.5492 8.10796 12.3891L8.00182 14.9018C7.9535 16.046 8.87116 16.9998 10.0203 16.9999L12.4924 17C13.4 17 14.2692 16.6349 14.9029 15.9874L22.2984 8.40804C23.2425 7.44344 23.2326 5.90152 22.2761 4.94907L20.0378 2.7201ZM17.4985 3.67018C17.9366 3.23319 18.6473 3.23293 19.0858 3.66958L21.3241 5.89856C21.7588 6.33149 21.7634 7.03236 21.3342 7.47082L19.8489 8.98837L16.0046 5.16008L17.4985 3.67018ZM15.0526 6.10956L10.043 11.1071C9.68526 11.4639 9.47492 11.9416 9.45363 12.4456L9.3475 14.9583C9.33139 15.3397 9.63728 15.6576 10.0203 15.6576L12.4924 15.6577C13.037 15.6578 13.5585 15.4387 13.9388 15.0502L18.9084 9.94931L15.0526 6.10956Z" fill="#2B3F6C" />
                                    <Path d="M21 13V17C21 19.7614 18.7614 22 16 22H8C5.23858 22 3 19.7614 3 17V9C3 6.23858 5.23858 4 8 4H12" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                                </Svg>
                                <Text style={styles.linkText}>
                                    Edit details
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navLink}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                                    <Rect x="2" y="2" width="20" height="20" rx="10" stroke="#2B3F6C" stroke-width="1.5" />
                                    <Path d="M19 4.8584C15.0549 8.72587 15.0549 15.2738 19 19.1413" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                                    <Path d="M5 5C8.93819 8.78423 8.93819 15.2158 5 19" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                                    <Path d="M12 2V22" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                                    <Path d="M22 12L2 12" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                                </Svg>
                                <Text style={styles.linkText}>
                                    Your game
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navLink}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <Rect x="2" y="6" width="20" height="16" rx="5" stroke="#2B3F6C" stroke-width="1.5" />
                                    <Path d="M19 6.5V6.5C19 4.17692 16.8678 2.43898 14.5924 2.90744L5.99174 4.67817C3.66769 5.15665 2 7.20267 2 9.57546L2 13" stroke="#2B3F6C" stroke-width="1.5" />
                                    <Path d="M6 17.5H12" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M15 14C15 12.6193 16.1193 11.5 17.5 11.5H22V16.5H17.5C16.1193 16.5 15 15.3807 15 14V14Z" stroke="#2B3F6C" stroke-width="1.5" />
                                    <Path d="M17.5 14H17.7" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                                <Text style={styles.linkText}>
                                    Payments
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navLink}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <Circle cx="3" cy="3" r="3" transform="matrix(-1 0 0 1 15 9)" stroke="#2B3F6C" stroke-width="1.5" />
                                    <Path d="M16.5001 4.9375L16.8751 4.28798L16.8751 4.28798L16.5001 4.9375ZM16.5001 19.0621L16.1251 18.4126L16.5001 19.0621ZM7.50005 19.0621L7.12505 19.7117H7.12505L7.50005 19.0621ZM7.50005 4.9375L7.87505 5.58702L7.50005 4.9375ZM8.92299 3.01508L8.19229 2.84601L8.92299 3.01508ZM5.31189 18.7402L5.13971 18.0102L5.31189 18.7402ZM4.403 18.503L4.97254 18.015L4.403 18.503ZM9.53927 21.695L9.72325 20.9679L9.53927 21.695ZM8.92305 20.9848L9.65376 20.8158L8.92305 20.9848ZM15.0771 20.9848L14.3464 20.8158L15.0771 20.9848ZM14.4609 21.695L14.6448 22.422L14.4609 21.695ZM19.597 18.503L19.0275 18.015L19.597 18.503ZM21.4437 8.70289L22.1518 8.45569L21.4437 8.70289ZM21.0936 9.68352L20.6167 9.10469L21.0936 9.68352ZM18.688 5.2595L18.5159 4.52952L18.688 5.2595ZM21.0936 14.3165L20.6167 14.8953L21.0936 14.3165ZM21.4437 15.2971L20.7356 15.0499L21.4437 15.2971ZM15.0772 3.01511L14.3465 3.18418L15.0772 3.01511ZM14.3465 3.18418C14.5723 4.16005 15.1879 5.04592 16.1251 5.58702L16.8751 4.28798C16.3127 3.96329 15.9439 3.43381 15.8079 2.84603L14.3465 3.18418ZM16.1251 5.58702C16.986 6.08408 17.9639 6.2008 18.8601 5.98949L18.5159 4.52952C17.9767 4.65663 17.3922 4.5865 16.8751 4.28798L16.1251 5.58702ZM22.1518 8.45569C21.7062 7.17937 21.0272 6.01337 20.1663 5.00871L19.0273 5.98471C19.7687 6.85004 20.3527 7.85328 20.7356 8.95008L22.1518 8.45569ZM20.75 12C20.75 11.3006 21.0682 10.6762 21.5705 10.2624L20.6167 9.10469C19.7834 9.79128 19.25 10.8337 19.25 12H20.75ZM21.5705 13.7376C21.0682 13.3238 20.75 12.6994 20.75 12H19.25C19.25 13.1663 19.7834 14.2087 20.6167 14.8953L21.5705 13.7376ZM20.1666 18.991C21.0273 17.9864 21.7063 16.8205 22.1518 15.5443L20.7356 15.0499C20.3528 16.1466 19.7688 17.1497 19.0275 18.015L20.1666 18.991ZM16.8751 19.7117C17.3922 19.4131 17.9768 19.343 18.516 19.4702L18.8603 18.0102C17.964 17.7988 16.9861 17.9155 16.1251 18.4126L16.8751 19.7117ZM15.8078 21.1538C15.9437 20.566 16.3126 20.0364 16.8751 19.7117L16.1251 18.4126C15.1877 18.9538 14.5721 19.8398 14.3464 20.8158L15.8078 21.1538ZM12 22.75C12.9117 22.75 13.7979 22.6363 14.6448 22.422L14.2769 20.9679C13.5493 21.152 12.7866 21.25 12 21.25V22.75ZM9.3553 22.4221C10.2022 22.6363 11.0883 22.75 12 22.75V21.25C11.2134 21.25 10.4508 21.152 9.72325 20.9679L9.3553 22.4221ZM7.12505 19.7117C7.68749 20.0364 8.05637 20.566 8.19233 21.1538L9.65376 20.8158C9.42802 19.8398 8.81238 18.9538 7.87505 18.4126L7.12505 19.7117ZM5.48406 19.4702C6.02327 19.343 6.60793 19.4131 7.12505 19.7117L7.87505 18.4126C7.01401 17.9155 6.03606 17.7988 5.13971 18.0102L5.48406 19.4702ZM1.84822 15.5443C2.29374 16.8205 2.97273 17.9864 3.83347 18.991L4.97254 18.015C4.23118 17.1498 3.64726 16.1466 3.2644 15.0499L1.84822 15.5443ZM3.25004 12C3.25004 12.6994 2.93185 13.3238 2.42953 13.7376L3.38336 14.8953C4.21668 14.2087 4.75004 13.1663 4.75004 12H3.25004ZM2.42953 10.2623C2.93185 10.6762 3.25004 11.3006 3.25004 12H4.75004C4.75004 10.8337 4.21668 9.79126 3.38336 9.10468L2.42953 10.2623ZM3.83375 5.00867C2.97288 6.01334 2.29379 7.17934 1.84822 8.45567L3.2644 8.95007C3.6473 7.85326 4.23132 6.85001 4.97279 5.98468L3.83375 5.00867ZM7.12505 4.28798C6.60798 4.58651 6.02337 4.65664 5.4842 4.5295L5.13994 5.98946C6.03623 6.20081 7.01409 6.0841 7.87505 5.58702L7.12505 4.28798ZM8.19229 2.84601C8.05629 3.43379 7.68743 3.96329 7.12505 4.28798L7.87505 5.58702C8.81227 5.04591 9.42788 4.16003 9.65368 3.18415L8.19229 2.84601ZM12 1.25C11.0883 1.25 10.2021 1.36366 9.35521 1.57796L9.72318 3.03213C10.4508 2.84802 11.2134 2.75 12 2.75V1.25ZM14.645 1.578C13.798 1.36368 12.9118 1.25 12 1.25V2.75C12.7867 2.75 13.5494 2.84803 14.277 3.03217L14.645 1.578ZM9.65368 3.18415C9.66929 3.11668 9.69574 3.06909 9.71626 3.04413C9.73389 3.02269 9.73703 3.02862 9.72318 3.03213L9.35521 1.57796C8.66401 1.75286 8.30711 2.3498 8.19229 2.84601L9.65368 3.18415ZM3.38336 9.10468C3.32248 9.05451 3.28709 9.00024 3.27289 8.96394C3.26095 8.93341 3.26974 8.93478 3.2644 8.95007L1.84822 8.45567C1.58221 9.21766 1.99436 9.9038 2.42953 10.2623L3.38336 9.10468ZM5.13971 18.0102C5.07248 18.0261 5.01821 18.0235 4.98674 18.0162C4.95969 18.0099 4.96341 18.0044 4.97254 18.015L3.83347 18.991C4.29652 19.5314 4.98849 19.5871 5.48406 19.4702L5.13971 18.0102ZM9.72325 20.9679C9.73711 20.9714 9.73396 20.9773 9.71634 20.9559C9.69581 20.9309 9.66936 20.8833 9.65376 20.8158L8.19233 21.1538C8.30711 21.6501 8.66402 22.2471 9.3553 22.4221L9.72325 20.9679ZM14.3464 20.8158C14.3308 20.8833 14.3043 20.9309 14.2838 20.9559C14.2662 20.9773 14.263 20.9714 14.2769 20.9679L14.6448 22.422C15.3361 22.2471 15.693 21.6501 15.8078 21.1538L14.3464 20.8158ZM19.0275 18.015C19.0366 18.0043 19.0403 18.0098 19.0133 18.0161C18.9818 18.0235 18.9276 18.0261 18.8603 18.0102L18.516 19.4702C19.0116 19.587 19.7035 19.5314 20.1666 18.991L19.0275 18.015ZM20.7356 8.95008C20.7303 8.93479 20.7391 8.93343 20.7271 8.96395C20.7129 9.00025 20.6775 9.05452 20.6167 9.10469L21.5705 10.2624C22.0057 9.90381 22.4178 9.21767 22.1518 8.45569L20.7356 8.95008ZM3.2644 15.0499C3.26974 15.0652 3.26095 15.0666 3.27289 15.0361C3.28709 14.9998 3.32248 14.9455 3.38336 14.8953L2.42953 13.7376C1.99436 14.0962 1.58221 14.7823 1.84822 15.5443L3.2644 15.0499ZM18.8601 5.98949C18.9273 5.97364 18.9816 5.97624 19.0131 5.98357C19.0401 5.98987 19.0364 5.99537 19.0273 5.98471L20.1663 5.00871C19.7033 4.46835 19.0114 4.41269 18.5159 4.52952L18.8601 5.98949ZM4.97279 5.98468C4.96366 5.99534 4.95994 5.98984 4.98699 5.98354C5.01845 5.97621 5.07271 5.97361 5.13994 5.98946L5.4842 4.5295C4.98867 4.41265 4.29678 4.4683 3.83375 5.00867L4.97279 5.98468ZM20.6167 14.8953C20.6775 14.9455 20.7129 14.9997 20.7271 15.036C20.7391 15.0666 20.7303 15.0652 20.7356 15.0499L22.1518 15.5443C22.4178 14.7823 22.0057 14.0962 21.5705 13.7376L20.6167 14.8953ZM15.8079 2.84603C15.6931 2.34983 15.3362 1.75292 14.645 1.578L14.277 3.03217C14.2631 3.02866 14.2663 3.02273 14.2839 3.04417C14.3044 3.06913 14.3309 3.11672 14.3465 3.18418L15.8079 2.84603Z" fill="#2B3F6C" />
                                </Svg>
                                <Text style={styles.linkText}>
                                    More settings
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navLink}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <Path d="M4 7.03285C4 6.66968 4.19689 6.33506 4.51436 6.15869L11.5144 2.2698C11.8164 2.10201 12.1836 2.10201 12.4856 2.2698L19.4856 6.15869C19.8031 6.33506 20 6.66968 20 7.03285V11.6715C20 15.3032 18.0311 18.6494 14.8564 20.4131L12.4856 21.7302C12.1836 21.898 11.8164 21.898 11.5144 21.7302L9.14357 20.4131C5.96892 18.6494 4 15.3032 4 11.6715V7.03285Z" stroke="#2B3F6C" stroke-width="1.5" />
                                    <Path d="M9.5 12L11.5 14L15.5 10" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                                <Text style={styles.linkText}>
                                    Privacy policy
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navLink}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <Rect x="2" y="2" width="20" height="20" rx="5" stroke="#2B3F6C" stroke-width="1.5" />
                                    <Path d="M12.5 17L12.5 11" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M10.5 11L12.5 11" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M12.5 8L12.5 7" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                                <Text style={styles.linkText}>
                                    About
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navLink} onPress={() => logout()}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                                    <Path d="M16 16V18C16 20.2091 14.2091 22 12 22H7C4.79086 22 3 20.2091 3 18V6C3 3.79086 4.79086 2 7 2H12C14.2091 2 16 3.79086 16 6V8" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                                    <Path d="M19 15L21.2929 12.7071C21.6834 12.3166 21.6834 11.6834 21.2929 11.2929L19 9" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                                    <Path d="M21 12L9 12" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" />
                                </Svg>
                                <Text style={styles.linkText}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    main: {
        marginTop: 45,
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
        gap: 5,
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
    navLinks: {
        flexDirection: 'column',
        width: '100%',
        padding: 10,
        gap: 20,
    },
    navLink: {
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    linkText: {
        fontSize: 18,
        color: '#2B3F6C',
    }
})