import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image, ScrollView } from 'react-native';
import Footer from '../Common/Footer';

export default function Diet({ navigation }) {
    const screen = 'Diet';
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState('Breakfast');
    const [dietPlan, setDietPlan] = useState({
        Breakfast: [
            { id: '1', meal: 'Milk', description: 'Today | 7am', image: require('../assets/breakfast.png') },
            { id: '2', meal: 'Peanut Butter', description: 'Today | 8am', image: require('../assets/breakfast.png') },
            { id: '3', meal: 'Egg', description: 'Today | 9am', image: require('../assets/breakfast.png') }
            // Add more breakfast items as needed
        ],
        Lunch: [
            { id: '4', meal: 'Chapati', description: 'Today | 1pm', image: require('../assets/lunch.png') },
            { id: '5', meal: 'Paneer', description: 'Today | 1pm', image: require('../assets/lunch.png') },
            { id: '6', meal: 'Curd', description: 'Today | 1pm', image: require('../assets/lunch.png') },
            // Add more lunch items as needed
        ],
        Dinner: [
            { id: '7', meal: 'Salad', description: 'Today | 7pm', image: require('../assets/dinner.png') },
            { id: '8', meal: 'Rice', description: 'Today | 8pm', image: require('../assets/dinner.png') },
            { id: '9', meal: 'Dal', description: 'Today | 8pm', image: require('../assets/dinner.png') },
            // Add more dinner items as needed
        ],
    });

    const recommendations = [
        { id: '10', title: 'Vegetables', image: require('../assets/vegetables.png') },
        { id: '11', title: 'Fruits', image: require('../assets/fruits.png') },
        { id: '12', title: 'Nuts', image: require('../assets/nuts.png') },
        { id: '13', title: 'Milk', image: require('../assets/milk.png') },
        { id: '14', title: 'Eggs', image: require('../assets/eggs.png') },
        { id: '15', title: 'Paneer', image: require('../assets/paneer.png') },
        { id: '16', title: 'Curd', image: require('../assets/curd.png') },
        // Add more recommendations as needed
    ];

    const handleSelect = (meal) => {
        setSelectedMeal(meal);
        setShowModal(false);
    };

    const meals = ['Breakfast', 'Lunch', 'Dinner'];

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                {/* Header */}
                <View style={styles.rectangleLineargradient}>
                    <Text style={styles.rectangleText}>Daily Meal Schedule</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setShowModal(true)}
                        activeOpacity={0.8}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.buttonText}>{selectedMeal}</Text>
                            <Image source={require('../assets/dropdown.png')}
                                style={{ width: 20, height: 20, alignSelf: "center", marginLeft: 5 }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Diet Plan Section */}
                <View style={styles.dietPlanContainer}>
                    <Text style={styles.dietPlanTitle}>Today's Meal</Text>
                    <FlatList
                        data={dietPlan[selectedMeal]}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.dietPlanItemContainer}>
                                <View>
                                    <Image source={item.image} style={styles.dietPlanImage} />
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.dietPlanMeal}>{item.meal}</Text>
                                    <Text style={styles.dietPlanDescription}>{item.description}</Text>
                                </View>

                            </View>
                        )}
                    />
                </View>

                <Modal
                    transparent={true}
                    visible={showModal}
                    animationType="slide"
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={meals}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.dropdownItem}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </Modal>

                <Text style={styles.dietPlanTitle}>Recommendations</Text>

                {/* Recommendations Section */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationsScroll}>
                    {recommendations.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.recommendationBox}>
                            <Image source={item.image} style={styles.recommendationImage} />
                            <Text style={styles.recommendationText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>
            <View style={styles.footer}>
                <Footer navigation={navigation} screen={screen} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    main: {
        paddingHorizontal: 15,
        height: '100%',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    rectangleLineargradient: {
        borderRadius: 16,
        width: '100%',
        height: 57,
        flexDirection: 'row',
        backgroundColor: '#EAEFFF',
        marginTop: 55,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    rectangleText: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 27,
        letterSpacing: 0,
        color: 'black',
        alignSelf: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 40,
    },
    button: {
        backgroundColor: '#96B3FE',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    dietPlanContainer: {
        marginTop: 20,
    },
    dietPlanTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    },
    dietPlanItemContainer: {
        backgroundColor: '#EAEFFF',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
    },
    dietPlanImage: {
        width: 40,
        height: 40,
        borderRadius: 10,
        marginTop: 5,
        alignSelf: 'center',
    },

    dietPlanMeal: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dietPlanDescription: {
        fontSize: 14,
        color: 'gray',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
        width: '100%',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    dropdownItem: {
        backgroundColor: 'white',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    recommendationsScroll: {
        marginTop: 20,
    },
    recommendationBox: {
        width: 120,
        height: 120,
        backgroundColor: '#EAEFFF',
        borderRadius: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    recommendationImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    recommendationText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
