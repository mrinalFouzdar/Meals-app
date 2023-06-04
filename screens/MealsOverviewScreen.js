import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MEALS,CATEGORIES } from '../data/dummy-data';
import { useRoute } from '@react-navigation/native';
import MealItem from '../components/MealItem';

const MealsOverviewScreen = ({route, navigation}) => {
  // const route = useRoute();
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem)=>{
    return mealItem.categoryIds.indexOf(catId)>=0
  })

  
  useLayoutEffect(()=>{
    const categoryTitle = CATEGORIES.find((category)=> category.id === catId).title
    navigation.setOptions({
      title: categoryTitle
    })

  },[catId,navigation])

  function renderMealItem(itemData){

    const item = itemData.item;

    const mealItemProps ={
      id:item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration
    }

    // function pressHandler(){
    //   navigation.navigate('MealsDetails',{
    //     mealId:item.id
    //   })
    // }

    return <MealItem {...mealItemProps} 
    // onPress={pressHandler} 
    />
  }

  return (
    <View style={styles.constainer}>
      <FlatList data={displayedMeals} 
      keyExtractor={(item)=>item.id} 
      renderItem={renderMealItem}
      />
    </View>
  )
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
    constainer:{
        flex:1,
        padding:16
    }
})