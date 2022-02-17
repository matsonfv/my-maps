import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ActionButton from 'react-native-action-button';


export default function HomeScreen({ navigation }) {
    const [markers, setMarkers] = useState([]);
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)


    const headerOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF'
      }
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOptions);
            const markers = await response.json();
            setMarkers(markers);
            }
            fetchData();
        }, []);
        

    return (
      <View style={styles.container}>
        <StatusBar style='auto'/>
        <Text style={styles.txtmapa} >Mapa</Text>
        <MapView style={styles.map}
            onPress={(event) => {
            setLatitude(event.nativeEvent.coordinate.latitude)
            setLongitude(event.nativeEvent.coordinate.longitude)
        }}>
            {
              markers.map((marker, id) => <Marker
              key = {id}
              coordinate = {{latitude: marker.latitude, longitude: marker.longitude}}
              title = {marker.title}
              description = {marker.description} />)
            }
        </MapView>
        <TouchableOpacity

          onPress={() => navigation.navigate('Marcador')}
          style={styles.icon}>
          <Image source={{ 
            uri: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',}}
            style={styles.image}
          />
        </TouchableOpacity>
        
      </View>
    );
  }    
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  txtmapa: {
    width: 70,
    height: 30,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  icon: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  image: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});