import { useLocalSearchParams, useRouter } from 'expo-router';
import { TextInput, View, Button } from 'react-native';
import React from 'react';
import styles from '../stylesReuse';
import url from '../config';
import { Icon } from '@rneui/themed';

export default function Page() {
    const { data } = useLocalSearchParams();
    memo = JSON.parse(decodeURIComponent(data));

    const [ret, setRet] = React.useState('inicio');
    const [text, setText] = React.useState(memo.content);
    const postData = async (txt) => {
      const response = await fetch((url) + memo.id,
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
        const response = await fetch((url) + memo.id,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
        
        );
        setRet(response.status);
      };
  
    const router = useRouter();
    if (ret!='inicio') {
        router.back();
    }
    
    return <View>
        <View style={styles.commandBar}>
        <Button style={styles.button} title="Salvar" onPress={() => postData(text)} />
        <Button style={styles.button} title="Apagar" onPress={() => deleteData()} />

        {/* <Icon name='save' style={{backgroundColor: "#808080", maxWidth: 35, minHeight: 35, maxHeight: 35}} onPress={() => postData(text)} reverse={false} color="white"/>
        <Icon name='delete' style={{backgroundColor: "#808080", maxWidth: 35, minHeight: 35, maxHeight: 35, verticalAlign: 'center'}} onPress={() => deleteData()} reverse={false} color="white"/> */}
        </View>
        <TextInput
        multiline={true}
        style={styles.input}
        onChangeText={setText}
        value={text}
        />
        </View>;
}

