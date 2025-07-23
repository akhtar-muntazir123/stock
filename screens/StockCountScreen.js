import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function StockCountScreen({ route }) {
  const { project, warehouse } = route.params;
  const [barcode, setBarcode] = useState('');
  const [count, setCount] = useState('');

  const handleOk = () => {
    Alert.alert('Entry Saved', `Barcode: ${barcode}, Count: ${count}`);
    setBarcode('');
    setCount('');
  };

  const handleFinish = () => {
    Alert.alert('Finished', `Project: ${project}, Warehouse: ${warehouse}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Project: {project}</Text>
      <Text style={styles.header}>Warehouse: {warehouse}</Text>

      {/* Placeholder for future barcode scanner */}
      <TextInput
        placeholder="Enter Barcode"
        value={barcode}
        onChangeText={setBarcode}
        style={styles.input}
      />
      <Button title="Scan"  />

      <TextInput
        placeholder="Enter Count"
        value={count}
        onChangeText={setCount}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="OK" onPress={handleOk} disabled={!barcode || !count} />
      <View style={{ marginTop: 10 }}>
        <Button title="Finish" onPress={handleFinish} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
