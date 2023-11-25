import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') {
            return;
        }

        const openaiApiKey = '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'; // Replace with the actual API key
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo-instruct",
                "prompt": inputMessage,
                "temperature": 1,
                "max_tokens": 256,
                "top_p": 1,
                "frequency_penalty": 0,
                "presence_penalty": 0
            }),
        };

        fetch('https://api.openai.com/v1/completions', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.json}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Handle the response data as needed
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, padding: 16 }}>
                {messages.map((message, index) => (
                    <Text key={index} style={{ marginBottom: 8, color: message.role === 'user' ? 'blue' : 'green' }}>
                        {message.content}
                    </Text>
                ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                <TextInput
                    style={{ flex: 1, borderWidth: 1, marginRight: 8, padding: 8 }}
                    placeholder="Type a message"
                    value={inputMessage}
                    onChangeText={(text) => setInputMessage(text)}
                />
                <Button title="Send" onPress={() => handleSendMessage()} />
            </View>
        </View>
    );
};

export default ChatBot;