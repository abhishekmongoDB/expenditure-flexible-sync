import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
import DataManager from "../realm/DataManager";
import { monthName } from "./AddSalary";


const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{...styles.item, backgroundColor: "#00000040"}}>
    <Text style={{...styles.title, color:'#FFFFFF'}}>{monthName[item?.month-1]?.label} - {item.year}</Text>
    <Text style={{...styles.title, color:'#FFFFFF'}}>Amount : {item.amount}</Text>
  </TouchableOpacity>
);

const SalaryList= () => {
  const [selectedId, setSelectedId] = useState(null);
  const [salaryList, setSalaryList] = useState([]);


  useEffect(()=>{
    const datamanager = DataManager.getInstance();
    const salaryRealm = datamanager.realmInstance;
    const syncSalary = salaryRealm.objects('SalaryRealm');
    let sortedSalary = syncSalary.sorted("month").sorted("year");

    sortedSalary.addListener(() => {
      setSalaryList([...sortedSalary]);
      console.log("sortedSalary====>",sortedSalary)
    });
  },[])

  const renderItem = ({ item }) => {
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={salaryList}
        renderItem={renderItem}
        keyExtractor={(item) =>item?.id}
        extraData={selectedId}
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
    fontSize: 32,
  },
});

export default SalaryList;