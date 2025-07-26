import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from "axios"

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response =await axios.post("http://192.168.29.183:1433/api/v1/user/login",
                {
                    userName: username,
                    password: password
                }
            )
            const userId= response.data.data.userId
            console.log("Login successful",userId)
            localStorage.setItem("user",userId)
            navigation.navigate('Project');
        }
        catch (err) {
            console.log("error connecting to the server",err)
            Alert.alert("Invalid credentials")
        }

    }


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
