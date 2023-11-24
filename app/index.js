import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import url from './config';

const App = () => {
    const [data, setData] = useState([]);
  
    const fetchData = async () => {
      const response = await fetch(url);
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
      <View  style={styles.container}>
        <TouchableOpacity  style={styles.floatingButton}>
          <Link href={{pathname: "/insert/insert"}} key="9876123" asChild>
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
      </View>
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
      padding: 4,
      margin: 3,
      backgroundColor: "#c0c0c0",
      maxHeight: 400,
      minHeight: 100
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
      right: 30, bottom: 15, 
    }
  });
  
  export default App;