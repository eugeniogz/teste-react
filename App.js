import { StatusBar } from 'expo-status-bar';
import React, { Suspense, Component, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatingActionButton } from 'react-native-floating-action';
import { Button, StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
//import { FloatingActionButton } from 'react-native-elements'

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
      const response = await fetch("http://192.168.0.36:3001/journals"); // dir: server, npm start
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
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.view}>
          <View style={styles.viewInterno}>
        {data1.map((memo) => <Text onPress={() => pressionado()} style={styles.memo} key={memo.id}>{memo.content}</Text>)}
          </View>
          <View style={styles.viewInterno}>
        {data2.map((memo) => <Text onPress={() => pressionado()} style={styles.memo} key={memo.id}>{memo.content}</Text>)}
          </View>
          </View>
          <FloatingActionButton
              icon={{ name: 'add' }}
              onPress={()=> addItem()}
              style={{
                position: 'absolute',
                right: 20,
                bottom: 20,
              }}
          ></FloatingActionButton>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const addItem = () => {
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