import React, { useContext, useLayoutEffect } from "react";
import {  Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
// import { FavoritesContext } from "../store/context/favorites-context";

const MealDetailsScreen = ({ route, navigation}) => {
  // const favoriteMealsCtx = useContext(FavoritesContext)

  const favoritesMeals = useSelector((state) => state.favoriteMeals)  
  console.log("favoritesMeals",favoritesMeals)
  const dispatch = useDispatch();
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealsFavorite = favoritesMeals.ids.includes(mealId)
  function changeFavoriteStautsHandler(){
    // console.log('Pressed!')
    if(mealsFavorite){
      // favoriteMealsCtx.removeFavorite(mealId)
      console.log("object", mealId)
      dispatch(removeFavorite({id:mealId}))
    }else{
      // favoriteMealsCtx.addFavorite(mealId)
      dispatch(addFavorite({id:mealId}))
    }
  }

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight:()=>{
        return (
        <IconButton 
        icon={mealsFavorite ? 'star' : "star-outline"} 
        color='white' 
        onTap={changeFavoriteStautsHandler}
        />)
      }
    })
  },[navigation, changeFavoriteStautsHandler]);

  const {
    imageUrl,
    title,
    duration,
    complexity,
    affordability,
    ingredients,
    steps,
  } = selectedMeal;
  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <Text style={styles.title}>{title}</Text>
      <View>
        <MealDetails
          duration={duration}
          complexity={complexity}
          affordability={affordability}
          textStyle={styles.detailText}
        />
      </View>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
  rootContainer:{
    marginBottom:30
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
