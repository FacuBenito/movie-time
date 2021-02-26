import React from 'react';
import { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const DetailsScreen = ( {navigation, route} ) => {
    const movie = route.params.movie;
    const [movieDetails, setMovieDetails] = useState({})

    useEffect(()=>{
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://www.omdbapi.com/?apikey=e20acf35&t=${movie.title}&y=${movie.release}`);
      xhr.send();

      xhr.onload = () => {
        if(xhr.status == 200){
          const response = JSON.parse(xhr.response);
          setMovieDetails(response);
        }else{
          console.log(`HTTP Request Failed ${xhr.status}`)
        }
      }

      xhr.onerror = () => {
        console.log('Error')
      }
    },[])


    return (
      <SafeAreaView style={styles.mainView}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>{movieDetails && movieDetails.Title}</Text>
          <Text style={styles.release}>{movieDetails && movieDetails.Released}</Text>
          <Text style={styles.plot}>{movieDetails && movieDetails.Plot}</Text>
        </ScrollView>
      </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,

  },
  scroll: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    flexDirection: 'column',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 10,
  },
  release: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  plot: {
    width: '80%',
    textAlign: 'justify',
    fontSize: 30
  }

});

export default DetailsScreen;