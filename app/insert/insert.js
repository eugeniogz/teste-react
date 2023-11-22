import { useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';

export default function Page() {

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

    return <View>
        <Button title="Go back" onPress={() => router.back()} />
        <Text>Blog post: </Text></View>;
}
