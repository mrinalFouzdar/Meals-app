import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {Ionicons} from '@expo/vector-icons'
import FavoritesScreen from "./screens/FavoritesScreen";
import FavoritesContextProvider from "./store/context/favorites-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: '#351401'},
        drawerInactiveBackgroundColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#e4baa1'
      }}
    >
      <Drawer.Screen 
       name="Categories" 
       component={CategoriesScreen} 
       options={{
        title: 'All Categories',
        drawerIcon:({color, size}) => 
        <Ionicons name="list" color={color} size={size}/>
       }}
       />
      <Drawer.Screen 
      name="Favorites" 
      component={FavoritesScreen} 
      options={{
        drawerIcon:({color, size}) => 
        <Ionicons name="star" color={color} size={size}/>
       
      }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <FavoritesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#351401" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#3f2f25" },
          }}
        >
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverviewScreen}
            // options={({route , navigation})=>{
            //   const catId = route.params.categoryId;
            //   return {
            //     title: catId
            //   }
            // }}
          />
          <Stack.Screen
            name="MealsDetails"
            component={MealDetailsScreen}
            // options={{
            //   headerRight: () => {
            //     return <Button title="Tap me!"/>;
            //   },
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
