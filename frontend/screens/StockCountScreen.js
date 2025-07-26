import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';

const { height: screenHeight } = Dimensions.get('window');
const ninetyVH = screenHeight * 0.9;

export default function StockCountScreen({ route,navigation }) {
  const { project, warehouse } = route.params;
  const [barcode, setBarcode] = useState('');
  const [count, setCount] = useState('');


  const handleOk = async () => {
    try {

      Alert.alert('Entry Saved', `Barcode: ${barcode}, Count: ${count}`);
      //get user from localstorage
      // const userId= localStorage.getItem("user")
      // console.log(userId)
      // sending a post request
      const res = await axios.post(`http://192.168.29.183:1433/api/v1/stockCount/addStockCount/${project}/${warehouse}`, {
        productId: barcode,//barcode id
        count: count,
        countedBy: "U001"//user Id
      })
      console.log("res", res.data.message)
      console.log('Entry Saved', `Barcode: ${barcode}, Count: ${count}`);
      setBarcode('');
      setCount('');
    } catch (error) {
      console.log("error saving data", error)
    }

  };

  const handleFinish = () => {
    Alert.alert('Finished', `Project: ${project}, Warehouse: ${warehouse}`);
    // localStorage.removeItem("user")
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { height: ninetyVH }]}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Project: {project}</Text>
        <Text style={styles.header}>Warehouse: {warehouse}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Barcode</Text>
        <TextInput
          placeholder="Enter Barcode"
          value={barcode}
          onChangeText={setBarcode}
          style={styles.input}
        />

        <Text style={styles.label}>Count</Text>
        <TextInput
          placeholder="Enter Count"
          value={count}
          onChangeText={setCount}
          style={styles.input}
          keyboardType="numeric"
        />

        <View style={{ marginTop: 15, width: 80 }}>
          <Button title="OK" onPress={handleOk} disabled={!barcode || !count} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Button title="Finish" onPress={handleFinish} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    padding: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});



// import React, { useState,useEffect,useRef } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { CameraView, useCameraPermissions } from 'expo-camera';



// export default function StockCountScreen({ route }) {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scannedData, setScannedData] = useState('');
//   const [scanned, setScanned] = useState(false);
//   const cameraRef = useRef(null);
//   const { project, warehouse } = route.params;
//   const [barcode, setBarcode] = useState('');
//   const [count, setCount] = useState('');

//   const handleOk = () => {
//     Alert.alert('Entry Saved', `Barcode: ${barcode}, Count: ${count}`);
//     setBarcode('');
//     setCount('');
//   };

//   const handleFinish = () => {
//     Alert.alert('Finished', `Project: ${project}, Warehouse: ${warehouse}`);
//   };
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     setScannedData(data);
//     alert(`Scanned: ${data}`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (
//     <>
//        <View style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         style={styles.camera}
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         barCodeScannerSettings={{
//           barCodeTypes: ['qr', 'ean13', 'code128', 'upc_a'], // Add more types if needed
//         }}
//       />
//       {scanned && (
//         <Button title="Scan Again" onPress={() => setScanned(false)} />
//       )}
//       {scannedData ? (
//         <Text style={styles.dataText}>Scanned Data: {scannedData}</Text>
//       ) : null}
//     </View>
//     </>
//     // <View style={styles.container}>
//     //   <Text style={styles.header}>Project: {project}</Text>
//     //   <Text style={styles.header}>Warehouse: {warehouse}</Text>

//     //   {/* Placeholder for future barcode scanner */}
//     //   <TextInput
//     //     placeholder="Enter Barcode"
//     //     value={barcode}
//     //     onChangeText={setBarcode}
//     //     style={styles.input}
//     //   />
//     //   <Button title="Scan" />

//     //   <TextInput
//     //     placeholder="Enter Count"
//     //     value={count}
//     //     onChangeText={setCount}
//     //     style={styles.input}
//     //     keyboardType="numeric"
//     //   />

//     //   <Button title="OK" onPress={handleOk} disabled={!barcode || !count} />
//     //   <View style={{ marginTop: 10 }}>
//     //     <Button title="Finish" onPress={handleFinish} />
//     //   </View>
//     // </View>
//   );
// }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, padding: 20 },
// //   header: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
// //   input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
// // });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   dataText: {
//     padding: 10,
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });