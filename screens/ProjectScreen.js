import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function ProjectScreen({ navigation }) {
  const [project, setProject] = useState('');
  const [warehouse, setWarehouse] = useState('');

  const goToStockCount = () => {
    navigation.navigate('StockCount', { project, warehouse });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Project Name"
        value={project}
        onChangeText={setProject}
        style={styles.input}
      />
      <TextInput
        placeholder="Warehouse Name"
        value={warehouse}
        onChangeText={setWarehouse}
        style={styles.input}
      />
      <Button title="Continue" onPress={goToStockCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop:40, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginBottom: 20, padding: 10, borderRadius: 5 }
});
