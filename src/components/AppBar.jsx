//RESPONSIVE
import {
    View,
    Image,
    Dimensions,
  } from 'react-native';
  import React from 'react';
  export function AppBar() {
    return (
      <View
        style={{
          height: Dimensions.get("window").height / 10.5,
          backgroundColor: 'rgba(0,0,0,0)',
          alignContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Image
          style={{
            width: Dimensions.get("window").width / 6,
            height: Dimensions.get("window").height / 12,
            margin: Dimensions.get("window").width / 40,
            position: 'absolute',
            marginTop:Dimensions.get("window").height*0.030,
            left: Dimensions.get('window').width / 2.60,
            zIndex: 1,
          }}
          source={require('../../assets/images/IsoBlanco.png')}
        />
      </View>
    );
  }
  