/*import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: null,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          currentPosition: {
            latitude,
            longitude,
          },
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = Geolocation.watchPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({
        currentPosition: {
          latitude,
          longitude,
        },
      });
    });
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  render() {
    const { currentPosition } = this.state;

    let mapHtml = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;">
          <div id="map" style="width: 100%; height: 100%;"></div>
          <script>
            function initMap() {
              var map = L.map('map').setView([${currentPosition ? currentPosition.latitude : 0}, ${currentPosition ? currentPosition.longitude : 0}], 13);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
                maxZoom: 18,
              }).addTo(map);
              ${
                currentPosition
                  ? `L.marker([${currentPosition.latitude}, ${currentPosition.longitude}]).addTo(map);`
                  : ''
              }
            }
          </script>
          <script src="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.js"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.css">
          <style>html, body { height: 100%; margin: 0; }</style>
          <script>initMap();</script>
        </body>
      </html>
    `;

    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{ html: mapHtml }}
          style={styles.map}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
});

export default MapScreen;*/
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MapaScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default MapaScreen;