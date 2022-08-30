import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
import DataManager from "../realm/DataManager";
import Schema from "../realm/schema/Schemas";


const Item = ({ item, onPress }) => {
  
  const datevalue  = item?.date
  return (
  
  <TouchableOpacity onPress={onPress} style={{...styles.item, backgroundColor: "#00000040"}}>
    <Text style={{...styles.title, color:'#FFFFFF'}}>Date : {""+datevalue}</Text>
     <Text style={{...styles.title, color:'#FFFFFF'}}>Item : {item?.item}</Text>
    <Text style={{...styles.title, color:'#FFFFFF'}}>Amount : {item?.amount}</Text> 
  </TouchableOpacity>
);
  }

const ExpenseList  = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [expenditureList, setExpenditure] = useState([]);


  useEffect(()=>{

    const datamanager = DataManager.getInstance();
    datamanager.initRealmManager()

    setTimeout(()=>{


      const expenseListRealm = datamanager.realmInstance;
      if(expenseListRealm != null){
        const syncExpenditure = expenseListRealm.objects(Schema.Expenditure);
        let sortedExpenditure = syncExpenditure.sorted("date");
    
        sortedExpenditure.addListener(() => {
          console.log("sortedExpenditure===>",sortedExpenditure)
          setExpenditure([...sortedExpenditure]);
        //   console.log("sortedExpenditure====>",sortedExpenditure)
        });
      }
     
    },1000)

  },[])

  const renderItem = ({ item }) => {
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        // onPress={() => setSelectedId(item.id)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={expenditureList}
        renderItem={renderItem}
        keyExtractor={(item) =>item?.id}
        // extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
});

export default ExpenseList ;


