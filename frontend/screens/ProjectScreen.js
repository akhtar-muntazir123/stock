import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function ProjectScreen({ navigation }) {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [project, setProject] = useState([]);
  const [warehouse, setWarehouse] = useState([]);

  const goToStockCount = () => {
    if (!selectedProject || !selectedWarehouse) {
      alert("Please select both project and warehouse");
      return;
    }

    console.log("project", selectedProject);
    console.log("warehouse", selectedWarehouse);
    navigation.navigate('StockCount', { selectedProject, selectedWarehouse });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProject = await axios.get("http://192.168.29.183:1433/api/v1/project/getProjects");
        setProject(resProject?.data?.data?.Projects);

        const resWarehouse = await axios.get("http://192.168.29.183:1433/api/v1/warehouse/getWarehouses");
        setWarehouse(resWarehouse?.data?.data?.Warehouses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose Project:</Text>
      <Picker
        selectedValue={selectedProject}
        onValueChange={(itemValue) => setSelectedProject(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Project" value="" enabled={false} />
        {project?.map((item, index) => (
          <Picker.Item
            label={`${item?.projectId} - ${item?.projectName}`}
            value={`${item?.projectId}`}
            key={index}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Choose Warehouse:</Text>
      <Picker
        selectedValue={selectedWarehouse}
        onValueChange={(itemValue) => setSelectedWarehouse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Warehouse" value="" enabled={false} />
        {warehouse?.map((item, index) => (
          <Picker.Item
            label={`${item?.warehouseId} - ${item?.warehouseName}`}
            value={`${item?.warehouseId}`}
            key={index}
          />
        ))}
      </Picker>

      <Button title="Continue" onPress={goToStockCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});