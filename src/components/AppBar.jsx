import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Pressable,
  } from 'react-native';
  import React, { useState } from 'react';
  export function AppBar({ navigation }) {
    return (
      <View
        style={{
          height: 80,
          backgroundColor: 'rgba(0,0,0,0)',
          alignContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Text></Text>
        <Image
          style={{
            width: 70,
            height: 70,
            margin: 10,
            position: 'absolute',
            left: Dimensions.get('window').width / 2 - 45,
            zIndex: 1,
          }}
          source={require('../../assets/images/IsoBlanco.png')}
        />
      </View>
    );
  }
  