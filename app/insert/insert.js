import React from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Header } from 'react-native-elements';


export default function Page() {
    uuid=uuidv4();
    console.log(uuid);
    console.log(new Date().toISOString());
    const [text, onChangeText] = React.useState('');
    console.log(text);
    
    // Navigation
    const navigation = useNavigation();
    // Effect
    useEffect(() => { 
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            console.log('onback');
            // Do your stuff here
            navigation.dispatch(e.data.action);
        });
    }, []);

    const router = useRouter();

    return <View><Header><Button title="Go back" onPress={() => router.back()} color="white" /><Button title="Delete" onPress={() => router.back()} color="white"/></Header>
        <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      /></View>;
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  