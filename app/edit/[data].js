import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { TextInput, View, Button, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

export default function Page() {
    const { data } = useLocalSearchParams();
    memo = JSON.parse(decodeURIComponent(data));

    const [ret, setRet] = React.useState('inicio');
    const [text, setText] = React.useState(memo.content);
    const postData = async (txt) => {
      const response = await fetch((Platform.OS === "android"?"http://192.168.0.36:3001/journals/":"http://192.168.0.53:3001/journals/") + memo.id,
      {
        method: "PATCH",
        body: JSON.stringify({
          id: memo.id,
          content: txt,
          created_at: memo.created_at,
          updated_at: new Date().toISOString()
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
      
      );
      setRet(response.status);
    };

    const deleteData = async () => {
        const response = await fetch((Platform.OS === "android"?"http://192.168.0.36:3001/journals/":"http://192.168.0.53:3001/journals/") + memo.id,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
        
        );
        setRet(response.status);
      };
  
    
    // Navigation
    // const navigation = useNavigation();

    // Effect
    /*
    useEffect(() => { 
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            console.log('onback');
            // Do your stuff here
            navigation.dispatch(e.data.action);
        });
    }, []);
    */
    const router = useRouter();
    if (ret!='inicio') {
        router.back();
    }
    
    return <View>
        <Button title="Salvar" onPress={() => postData(text)} />
        <Button title="Apagar" onPress={() => deleteData()} />
        <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        />
        </View>;
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  
