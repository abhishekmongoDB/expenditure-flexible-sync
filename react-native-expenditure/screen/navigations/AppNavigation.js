import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import Login from '../authentication/Login';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Context as AuthenticationContext,
} from '../context/AuthenticationContext';
import User from '../expense/User';
import ExpenseList from '../expense/ExpenseList';
import AddExpense from '../expense/AddExpense';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SalaryList from '../expense/SalaryList';
import AddSalary from '../expense/AddSalary';
import Setting from '../expense/Setting';
import DataManager from '../realm/DataManager';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const AppNavigation = ({ }) => {
    const { state: {
        user
    } } = useContext(AuthenticationContext);

    useEffect(() => {
      if(user != null){
        const datamanager = DataManager.getInstance();
        datamanager.initRealmManager()
      }
    }, [user])

    return (
        <>
            <NavigationContainer>
                {
                    user == null ?
                        <Stack.Navigator>
                            <Stack.Screen name="Login" component={Login} />
                        </Stack.Navigator>
                        : <>
                            <Tab.Navigator
                                screenOptions={({ route }) => ({
                                    tabBarActiveTintColor: 'tomato',
                                    tabBarInactiveTintColor: 'gray',
                                    headerShown: false,
                                    tabBarIcon: ({ focused, color, size }) => {
                                        let iconName;
                            
                                        if (route.name === 'Expenditure') {
                                          iconName = 'money';
                                        } 
                                         if (route.name === 'Setting') {
                                          iconName = 'gears';
                                        }
                                         if (route.name === 'Salary') {
                                            iconName = 'bitcoin';
                                        }
                              
                            
                                        // You can return any component that you like here!
                                        return <Icon name={iconName} size={size} color={color} />;
                                      },
                            
                                })}
                            >
                                <Tab.Screen name="Expenditure" component={ExpenseNavigator} />
                                <Tab.Screen name="Salary" component={SalaryNavigator} />
                                {/* <Tab.Screen name="Profile" component={ProfileNavigator} /> */}
                                <Tab.Screen name="Setting" component={SettingNavigator} />
                            </Tab.Navigator>

                        </>
                }
            </NavigationContainer>
        </>
    );
}


const SettingNavigator = ({navigation}) => {
    const {signout} = useContext(AuthenticationContext);

    return <Stack.Navigator>
        <Stack.Screen name="Settings" component={Setting} options={{ headerShown: true ,
        headerRight: () => (
            <Button
              onPress={() => {
                signout()
              }}
              title="Signout"
              color="#000"
            />
          )}}  />
   </Stack.Navigator>
}




const ProfileNavigator = ({navigation}) => {
    return <Stack.Navigator>
        <Stack.Screen name="Profile" component={User} options={{ headerShown: false }}  />
   </Stack.Navigator>
}





const ExpenseNavigator = ({navigation}) => {
    return <Stack.Navigator>
              {/* <Stack.Screen name="AddSalary" component={AddSalary} /> */}

        <Stack.Screen name="Expense" component={ExpenseList} options={{ headerShown: true , headerRight: () => (
            <Button
            onPress={() => {
                navigation.navigate("AddExpense")
              }}
              title="Add Expense"
              color="#000"
            />
          )}} 
         />
        <Stack.Screen name="AddExpense" component={AddExpense} options={{ headerShown: true }}  />
   </Stack.Navigator>
}




const SalaryNavigator = ({navigation}) => {
    return <Stack.Navigator>
        <Stack.Screen name="SalaryList" component={SalaryList} options={{ headerShown: true,
        //   headerTitle: (props) => <Text>Salary</Text>,
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate("AddSalary")
              }}
              title="Add Salary"
              color="#000"
            />
          )}} 
       
           />
        <Stack.Screen name="AddSalary" component={AddSalary} />
   </Stack.Navigator>
}


export default AppNavigation;
