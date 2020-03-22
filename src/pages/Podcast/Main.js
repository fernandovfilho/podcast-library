import React, {useCallback, useEffect} from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform, RefreshControl, ScrollView, View, Text } from 'react-native';
import PodcastListItem from '../../components/PodcastListItem';
import api from '../../services/api';

import NotFoundIMage from '../../../assets/audience.svg';
import Global from '../../config/Global';

function Main({ navigation }){
    
    const [refreshing, setRefreshing] = React.useState(false);
    const [podcasts, setPodcasts] = React.useState([]);
    
    async function loadPodcasts(){
        
        setRefreshing(true);
        
        try {
            const podcasts = await api.get('/podcasts');
            setRefreshing(false);
            setPodcasts(podcasts.data);
            
        } catch (error) {
            setRefreshing(false);
            setPodcasts([]);
        }
        
        
    }
    
    useEffect(() => {
        
        loadPodcasts();
        
    }, []);
    
    const onRefresh = useCallback(() => {
        loadPodcasts();
    }, [refreshing]);
    
    return (
        <SafeAreaView style={ styles.container }>
        <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
        <ScrollView
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={ styles.gridView }
        >
        {podcasts.length < 1 && 
            <View style={styles.notFoundContent}>
            <NotFoundIMage style={styles.notFoundIMage} width={200} height={200} />
            <Text style={styles.notFoundText}>Nenhum podcast por aqui</Text>
            </View>
        }
        {
            podcasts.length > 0 && podcasts.map((item, index) => <PodcastListItem key={index + 1} podcast={item} navigation={navigation} />)
        }
        </ScrollView>
        </SafeAreaView>
        )
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: Platform.OS === 'android' ? 32 : 0,
            backgroundColor: 'lightgray'
        },
        gridView: {
            flex: 1,
            marginBottom: Global.playerHeight,
        },
        notFoundContent: {
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 30,
            marginVertical: 50
        },
        notFoundText: {
            fontSize: 20,
            marginHorizontal: 30,
            textAlign: 'center',
        }
    })
    
    export default Main;