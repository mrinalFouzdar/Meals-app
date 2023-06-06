import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import MealItem from './MealItem';

const MealsList = ({items}) => {
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
          <FlatList data={items} 
          keyExtractor={(item)=>item.id} 
          renderItem={renderMealItem}
          />
        </View>
      )
}

export default MealsList
const styles = StyleSheet.create({
    constainer:{
        flex:1,
        padding:16
    }
})