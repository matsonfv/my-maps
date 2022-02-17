import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet, View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';



export default function Marcador({ navigation }) {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')

  async function fetchData() {
    const headerOptions = {
      method: 'POST',
            headers: {
              'Content-Type':'application/json',
              'Authorization': 'Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF',
            },
            body: JSON.stringify({
              latitude: latitude,
              longitude: longitude,
              title: title,
              description: description
            }),    
    }
    fetch('https://mobile.ect.ufrn.br:3003/markers', headerOptions);
    }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} >
    <MapView style={styles.map}
        onPress={(event) => {
            setLatitude(event.nativeEvent.coordinate.latitude)
            setLongitude(event.nativeEvent.coordinate.longitude)
            
              fetchData();
          
        }}>
        <Marker
            coordinate = {{latitude: latitude, longitude: longitude }}
            title = {title}
            description={description} />
            
    </MapView>
    </ScrollView>
      <View style={styles.caixatxt} >
            <TextInput style={styles.txtinput} placeholder='Titulo' value={title} onChangeText={setTitle} />
            <TextInput style={styles.txtinput} placeholder='Descrição' value={description} onChangeText={setDescription} />
            <TouchableOpacity onPress={() => alert('Marcador inserido!')}>
               <Text style={styles.adicionar}>
                ADICIONAR
               </Text>
            </TouchableOpacity>
      </View>      
    </View>
  );
    };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scroll: {
      height: 400,
    },
    caixatxt:{
      justifyContent: 'center',
      borderColor: 'gray',
      backgroundColor: 'white',
      padding: 13,
    },
    txtinput: {
      height: 40,
      marginTop: 10,
      borderWidth: 1.5,
      borderColor: 'gray',
      borderRadius: 5,
      backgroundColor: 'white',
      padding: 8,
    },
    adicionar: {
      padding: 15,
      width: 110,
      backgroundColor: '#f62',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 15,
      alignSelf: 'center',
      fontSize: 15,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });