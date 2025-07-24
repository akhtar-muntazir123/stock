import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions,TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const { height: screenHeight } = Dimensions.get('window');
const ninetyVH = screenHeight * 0.9;

export default function StockCountScreen({ route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const cameraRef = useRef(null);
  const { project, warehouse } = route.params;
  const [barcode, setBarcode] = useState('');
  const [count, setCount] = useState('');

  const handleOk = () => {
    Alert.alert('Entry Saved', `Barcode: ${barcode}, Count: ${count}`);
    console.log(barcode)
    setBarcode('');
    setCount('');
    console.log('Entry Saved', `Barcode: ${barcode}, Count: ${count}`)
  };

  const handleFinish = () => {
    Alert.alert('Finished', `Project: ${project}, Warehouse: ${warehouse}`);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    setBarcode(data);
    alert(`Scanned: ${data}`);
  };

  if (!permission) return <Text>Requesting camera permission...</Text>;
  if (!permission.granted)
    return (
      <View>
        <Text>No access to camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );

  return (
    <View style={[styles.container, { height: ninetyVH }]}>
      <View style={{display:"flex",flexDirection:"row", backgroundColor:"white"}}>
        <Text style={styles.header}>Project: {project}</Text>
        <Text style={styles.header}>Warehouse: {warehouse}</Text>
      </View>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'code128', 'upc_a'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      
      <View style={styles.inputContainer}>
         <TextInput
        placeholder="Enter Barcode"
        value={barcode}
        onChangeText={setBarcode}
        style={styles.input}
      />
      {scanned && (
        <Button title="Scan Again" onPress={() => setScanned(false)} />
      )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  camera: {
    height: '45%', // You can adjust this portion
    width: '100%',
  },
  inputContainer: {
    padding: 10,
  },
  header: { fontWeight: 'semiBold', fontSize: 16, marginBottom: 10,marginTop:10 ,paddingLeft:20},
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
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