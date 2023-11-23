import { StatusBar } from 'expo-status-bar';
import React, { Suspense, Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { SafeAreaView as SAF } from 'react-native';

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
    var ct = data1[0].content;
    return (
      <SAF style={styles.container}>
        <TouchableOpacity  style={styles.floatingButton}>
          <Link href={{pathname: "/insert/insert"}}>
          <Ionicons  name="add-circle" size={62} color="blue"/>
          </Link>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.view}>
          <View style={styles.viewInterno}>
            {data1.map((memo) => memoCard(memo))}
          </View>
          <View style={styles.viewInterno}>
            {data2.map((memo) => memoCard(memo))}
          </View>
          </View>
        </ScrollView>
      </SAF>
    );
  };

  
  function memoCard(memo) {
    var data = JSON.stringify(memo);
    var idlink = memo.id + '1';
    return <Link href={{pathname: "/edit/[data]", params: { data: data }}}  key={idlink} asChild>
                <Text style={styles.memo} key={memo.id}>{memo.content}</Text>
            </Link>
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