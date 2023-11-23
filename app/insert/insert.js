import React from 'react';
import { useNavigation, useRouter, router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
    const [ret, setRet] = React.useState('inicio');
    const [text, setText] = React.useState('');
    // const textRef = React.createRef();
    const postData = async (txt) => {
      const response = await fetch(Platform.OS === "android"?"http://192.168.0.36:3001/journals":"http://192.168.0.53:3001/journals",
      {
        method: "POST",
        body: JSON.stringify({
          id: uuidv4(),
          content: txt,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
      
      );
      setRet(response.status);
    };

    // useEffect(() => { 
      
    // }, []);

    // const exitListener = useRef(null);
    /*
    useEffect(() => { 
      const handleBack = (e) => {
        if (e.target.startsWith('insert/insert') && e.data.action.source?.startsWith('insert/insert')) {
          e.preventDefault();
          postData();
        } else {
          console.log('onback 2');
          navigation.dispatch(e.data.action); 
        }
      };

      // exitListener.current = navigation;

      navigation.addListener('beforeRemove', handleBack);
      // return () => { exitListener.current.removeListener('beforeRemove', handleBack) };
    }, []);
    */
    const router = useRouter();
    if (ret!='inicio') {
      router.back();
    }

    return <View>
      <Button title="Salvar" onPress={() => {postData(text) /*navigation.goBack()*/}} />
      <Button title="Cancelar" onPress={()=>router.back()}/>
        <TextInput
        style={styles.input}
        // ref={textRef}
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
  