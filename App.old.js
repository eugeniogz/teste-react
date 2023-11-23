import { StatusBar } from 'expo-status-bar';
import React, { Suspense, Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import SAF from './SAF';

const App = () => {
    const [data, setData] = useState(null);
  
    const fetchData = async () => {
      const response = await fetch(Platform.OS === "android"?"http://192.168.0.36:3001/journals":"http://192.168.0.53:3001/journals"); // dir: server, npm start
      const json = await response.json();
      setData(json);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    if (!data) {
      return (
        <View style={styles.container}>
          <Text>Carregando...</Text>
        </View>
      );
    }
  
    var data1 = [];
    var data2 = [];
    for (var i=0; i<data.length; i++) {
      if (i % 2 == 0) 
        data1.push(data[i]);
      else
        data2.push(data[i]);
    }
    return (
      <SAF style={styles.container}>
        <TouchableOpacity  style={styles.floatingButton}>
          <Link href={{pathname: "/edit/[id]", params: { id: data1[0].id }}}>
          <Ionicons  name="add-circle" size={62} color="red"/>
          </Link>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.view}>
          <View style={styles.viewInterno}>
            {data1.map((memo) => <Text onPress={() => pressionado()} style={styles.memo} key={memo.id}>{memo.content}</Text>)}
          </View>
          <View style={styles.viewInterno}>
            {data2.map((memo) => <Text onPress={() => pressionado()} style={styles.memo} key={memo.id}>{memo.content}</Text>)}
          </View>
          </View>
        </ScrollView>
      </SAF>
    );
  };

  const addItem = () => {
    console.log("Logando");
    //setItems([...items, { id: items.length + 1, name: `Item ${items.length + 1}` }]);
  };
 
  function pressionado() {
    console.log("Logando");
  }
  
  const styles = StyleSheet.create({
    memo: {
      // flex: 0.4,
      padding: 4,
      margin: 3,
      backgroundColor: "#c0c0c0",
    },
    view: {
      flex: 1, flexDirection: 'row'
    },
    viewInterno: {
      flex: 0.5
    },
    container: {
      flex: 1
    },
    floatingButton: {
      zIndex: 1,
      position: 'absolute',
      width: 60, height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30, bottom: 30, 
    }
  });
  
  export default App;