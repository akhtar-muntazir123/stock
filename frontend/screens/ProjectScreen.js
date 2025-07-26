import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function ProjectScreen({ navigation }) {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [project, setProject] = useState([])
  const [warehouse, setWarehouse] = useState([])

  const goToStockCount = () => {
    console.log("project",selectedProject)
    console.log("warehouse",selectedWarehouse)
    navigation.navigate('StockCount', { selectedProject,selectedWarehouse });
  };

  useEffect(() => {
    const fetchData = async () => {
      const resProject = await axios.get("http://192.168.29.183:1433/api/v1/project/getProjects")
      console.log("projects", resProject.data.data.Projects)
      setProject(resProject.data.data.Projects)
      const resWarehouse = await axios.get("http://192.168.29.183:1433/api/v1/warehouse/getWarehouses")
      console.log("warehouse", resWarehouse.data.data.Warehouses)
      setWarehouse(resWarehouse.data.data.Warehouses)
    }
    fetchData()
  }, [])
  return (
    <View style={styles.container}>

      <Text style={styles.label}>Choose Project:</Text>
      <Picker
        selectedValue={selectedProject}
        onValueChange={(itemValue, itemIndex) => setSelectedProject(itemValue)}
        style={styles.picker}
      >
        {
          project.map((item, index) => (
            <Picker.Item label={`${item.projectId} - ${item.projectName}`} value={`${item.projectId} - ${item.projectName}`} key={index} />
          ))
        }

      </Picker>

      <Text style={styles.label}>
        Choose Warehouse :
      </Text>
      <Picker
        selectedValue={selectedWarehouse}
        onValueChange={(itemValue, itemIndex) => setSelectedWarehouse(itemValue)}
        style={styles.picker}
      >
        {
          warehouse.map((item, index) => (
            <Picker.Item label={`${item.warehouseId} - ${item.warehouseName}`} value={`${item.warehouseId} - ${item.warehouseName}`} key={index} />
          ))
        }
      </Picker>


      {/* <TextInput
        placeholder="Warehouse Name"
        value={warehouse}
        onChangeText={setWarehouse}
        style={styles.input}
      /> */}
      <Button title="Continue" onPress={goToStockCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 40, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginBottom: 20, padding: 10, borderRadius: 5 },
  label: { fontSize: 16 },
  picker: { height: 50, width: '100%', marginBottom: 20 },
});
