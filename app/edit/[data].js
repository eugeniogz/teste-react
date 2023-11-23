import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Text, View, Button } from 'react-native';
import { useEffect } from 'react';

export default function Page() {
    const { data } = useLocalSearchParams();
    memo = JSON.parse(decodeURIComponent(data));
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
        <Text>Blog post: {memo.content}</Text></View>;
}
