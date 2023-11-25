import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Svg, Path, Circle, Defs, Stop, LinearGradient, Rect, G } from 'react-native-svg';

const Training = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.box} onPress={() => navigation.goBack()}>
                        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <G id="Iconly/Light/Arrow - Left 2">
                                <G id="Arrow - Left 2">
                                    <Path id="Stroke 1" d="M10.3333 12.6666L5.66659 7.99992L10.3333 3.33325" stroke="#1D1617" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                </G>
                            </G>
                        </Svg>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headText}>Your training routine</Text>
                        <Text style={styles.subText}>11 Exercises | 32mins | 320 Calories Burn</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.subMain}>
                        <View style={styles.topBar}>
                            <View style={styles.row}>
                                <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <Path d="M15.4363 18.4839V6.00098" stroke="#7B6F72" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M19.1742 14.7295L15.4362 18.4848L11.6982 14.7295" stroke="#7B6F72" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M6.33519 3.51367V15.9966" stroke="#7B6F72" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    <Path d="M2.59741 7.26846L6.33537 3.51318L10.0733 7.26846" stroke="#7B6F72" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                                <Text>Difficulty</Text>
                            </View>
                            <View style={styles.row}>
                                <Text>Beginner</Text>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <Path d="M5.66675 3.33317L10.3334 7.99984L5.66675 12.6665" stroke="#7B6F72" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                </Svg>
                            </View>
                        </View>
                        <View style={styles.secondRow}>
                            <Text style={styles.headText}>You will need</Text>
                            <Text style={styles.subText}>5 items</Text>
                        </View>
                        <View style={styles.item}>
                            <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <Circle cx="5" cy="5" r="5" fill="#c58bf2" />
                            </Svg>
                            <Text style={styles.itemName}>Barbell</Text>
                        </View>
                        <View style={styles.item}>
                            <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <Circle cx="5" cy="5" r="5" fill="#c58bf2" />
                            </Svg>
                            <Text style={styles.itemName}>Skipping Rope</Text>
                        </View>
                        <View style={styles.item}>
                            <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <Circle cx="5" cy="5" r="5" fill="#c58bf2" />
                            </Svg>
                            <Text style={styles.itemName}>Bottle 1L</Text>
                        </View>
                        <View style={styles.item}>
                            <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <Circle cx="5" cy="5" r="5" fill="#c58bf2" />
                            </Svg>
                            <Text style={styles.itemName}>Sports Shoes</Text>
                        </View>
                        <View style={styles.item}>
                            <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <Circle cx="5" cy="5" r="5" fill="#c58bf2" />
                            </Svg>
                            <Text style={styles.itemName}>Sports Outfit</Text>
                        </View>
                        <Text style={[styles.headText, { marginTop: 20, }]}>Jumping Jack</Text>
                        <Text style={styles.subText}>Easy | 10mins | 320 Calories Burn</Text>
                        <Text style={[styles.subText, { marginTop: 10, }]}>A jumping jack, also known as a star jump and called a side-straddle hop in the US military, is a physical jumping exercise performed by jumping to a position with the legs spread wide.</Text>
                        <View style={styles.secondRow}>
                            <Text style={styles.headText}>How To Do It</Text>
                            <Text style={styles.subText}>4 Steps</Text>
                        </View>
                        <View style={styles.stepRow}>
                            <Text style={styles.number}>01</Text>
                            <View style={styles.textBox}>
                                <Text style={styles.number}>Spread Your Arms</Text>
                                <Text style={styles.desc}>To make the gestures feel more relaxed, stretch your arms as you start this movement. No bending of hands.</Text>
                            </View>
                        </View>
                        <View style={styles.stepRow}>
                            <Text style={styles.number}>02</Text>
                            <View style={styles.textBox}>
                                <Text style={styles.number}>Rest at The Toe</Text>
                                <Text style={styles.desc}>
                                    The basis of this movement is jumping. Now, what needs to be considered is that you have to use the tips of your feet
                                </Text>
                            </View>
                        </View>
                        <View style={styles.stepRow}>
                            <Text style={styles.number}>03</Text>
                            <View style={styles.textBox}>
                                <Text style={styles.number}>Adjust Foot Movement</Text>
                                <Text style={styles.desc}>
                                    Jumping Jack is not just an ordinary jump. But, you also have to pay close attention to leg movements.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.stepRow}>
                            <Text style={styles.number}>04</Text>
                            <View style={styles.textBox}>
                                <Text style={styles.number}>Clapping Both Hands</Text>
                                <Text style={styles.desc}>
                                    This cannot be taken lightly. You see, without realizing it, the clapping of your hands helps you to keep your rhythm while doing the Jumping Jack
                                </Text>
                            </View>
                        </View>
                        <View style={styles.bottomBar}>
                            <Text style={styles.btnText}>Completed</Text>
                        </View>
                    </View>
                </ScrollView>
            </View >
        </View >
    );
};

export default Training;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    header: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    box: {
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f8f8',
        borderRadius: 8,
    },
    main: {
        marginTop: 45,
        paddingHorizontal: 25,
        padding: 10,
        marginBottom: 50,
    },
    headText: {
        fontSize: 20,
        fontFamily: 'OpenSans-Bold',
    },
    subText: {
        color: '#808080',
    },
    topBar: {
        width: '100%',
        marginTop: 20,
        backgroundColor: '#EEA4CE',
        height: 50,
        borderRadius: 16,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    secondRow: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    itemName: {
        fontSize: 16,
    },
    stepRow: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 10,
        width: '100%',
    },
    number: {
        color: '#c58bf2',
        fontSize: 20,
    },
    textBox: {
        gap: 10,
        width: '90%',
    },
    desc: {
        fontSize: 16,
    },
    subMain: {
        width: '100%',
    },
    bottomBar: {
        width: '100%',
        marginTop: 20,
        backgroundColor: '#EEA4CE',
        height: 50,
        borderRadius: 16,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    btnText: {
        
    },
})