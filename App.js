import { StatusBar } from 'expo-status-bar';
import { Suspense, Component, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

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
  
    return (
      <View style={styles.container}>
        {data.map((memo) => <Text key={memo.id}>{memo.content}</Text>)}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#c0c0c0",
      justifyContent: "center",
      alignItems: "center",
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