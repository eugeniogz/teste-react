import React from 'react';
import { useNavigation, useRouter, router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import styles from '../stylesReuse';
import url from '../config';

export default function Page() {
    const [ret, setRet] = React.useState('inicio');
    const [text, setText] = React.useState('');
    const postData = async (txt) => {
      const response = await fetch(url,
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

    // Tentativa de capturar e tratar o back, não tive sucesso em remover o listener
    // sem esse tipo de tratamento, no android, ao clicar em back (botao fisico) sai da tela sem salvar
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
      <View style={styles.commandBar}>
      <Button style={styles.button} title="Salvar" onPress={() => {postData(text) /*navigation.goBack()*/}} />
      <Button style={styles.button} title="Cancelar" onPress={()=>router.back()}/>
      </View>
      <TextInput
        style={styles.input}
        multiline={true}
        onChangeText={setText}
        value={text}
      />
    </View>;
}