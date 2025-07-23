import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username.trim() && password == 'Hello@123') {
            navigation.navigate('Project');
        }
        else {
            Alert.alert("not a valid user")
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry={true}
            />

            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginTop: 40, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, marginBottom: 20, padding: 10, borderRadius: 5 }
});
