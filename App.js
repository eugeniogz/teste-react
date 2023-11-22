import { StatusBar } from 'expo-status-bar';
import React, { Suspense, Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SAF from './SAF';
/*
export default function App() {
    // (async () => {
    //     var ret =  getData();
    //     console.log(ret);
    //     return ret});
    return <Suspense fallback={<ActivityIndicator size="large" color="#00ff00" />}><ParentThatFetches/></Suspense>
}

 
function pressionado() {
    console.log("Logando");
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
*/

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
        {/* <TouchableOpacity
          > */}
          <Ionicons onPress={()=> pressionado()} style={styles.floatingButton}
 name="add-circle" size={62} color="blue"/>
        {/* </TouchableOpacity> */}
        <ScrollView>
          <View style={styles.view}>
          <View style={styles.viewInterno}>
        {data1.map((memo) => <Text onPress={() => pressionado()} style={styles.memo} key={memo.id}>{memo.content}</Text>)}
          </View>
          <View style={styles.viewInterno}>
        {data2.map((memo) => <Text onPress={() => pressionado()} style={styles.memo} key={memo.id}>{memo.content}</Text>)}
          </View>
          </View>
          {/* <FloatingActionButton
              icon={{ name: 'add' }}
              onPress={()=> addItem()}
              style={{
                position: 'absolute',
                right: 20,
                bottom: 20,
              }}
          ></FloatingActionButton> */}
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
      flex: 1, flexDirection: 'row',
      // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
    },
    viewInterno: {
      flex: 0.5,
      // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
    },
    container: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
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
/*
class ParentThatFetches extends Component {
    constructor () {
      super();
      const [data, setData] = useState(null);
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
    
      return (
        <View style={styles.container}>
                {this.state.memos.map((memo) => <Text key={memo.id}>{memo.content}</Text>)}
                <Button onPress={() => pressionado()} title="Ok">Ok</Button>
                <StatusBar style="auto" />
        </View>
      );
    }
  
    fetchData() {
        fetch("http://192.168.0.36:3001/journals", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
                "x-rapidapi-key": "yourapikey"
            }
            })
            .then(response => response.json())
            .then(memos => setData(memos))
            .catch(err => {
                console.log(err);
                return <>{err.message}</>;
            });
            
        }
      
    renderX () {
        {
        this.state.memos && (
            <View style={styles.container}>
                {this.state.memos.map((memo) => <Text key={memo.id}>{memo.content}</Text>)}
                <Button onPress={() => pressionado()} title="Ok">Ok</Button>
                <StatusBar style="auto" />
            </View>
        )
        }
    }
}

*/