import React from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';

const Leaderboard = () => {
    // Sample data for athletes
    const data = [
        { id: '1', name: 'John Doe', efficiency: 85, performance: 'High' },
        { id: '2', name: 'Jane Smith', efficiency: 75, performance: 'Medium' },
        { id: '3', name: 'Michael Johnson', efficiency: 90, performance: 'High' },
        { id: '4', name: 'Sara Williams', efficiency: 80, performance: 'Medium' },
        { id: '5', name: 'David Brown', efficiency: 95, performance: 'High' },
        { id: '6', name: 'Emily Davis', efficiency: 70, performance: 'Low' },
        { id: '7', name: 'Chris Evans', efficiency: 88, performance: 'High' },
        { id: '8', name: 'Emma White', efficiency: 82, performance: 'Medium' },
        { id: '9', name: 'Alex Turner', efficiency: 91, performance: 'High' },
        { id: '10', name: 'Olivia Clark', efficiency: 78, performance: 'Medium' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image
                source={require('../assets/profile.png')}
                style={styles.avatar}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Efficiency: {item.efficiency}%</Text>
                    <Text style={styles.detailText}>Performance: {item.performance}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Leaderboard</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 50,
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 8,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 3,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    detailsContainer: {
        marginTop: 10,
    },
    detailText: {
        fontSize: 14,
        color: '#555',
    },
});

export default Leaderboard;
