import React, { useState, useCallback,useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
// import Realm from "realm";
import { CustomPicker } from "react-native-custom-picker";
import { DatePickerModal } from 'react-native-paper-dates';

import {
    Context as AuthenticationContext,
} from '../context/AuthenticationContext';

import DatePicker from 'react-native-modern-datepicker';
import DataManager from "../realm/DataManager";
import { ExpenditureRealm } from "../realm/schema/ExpenditureRealm";
import Schema from "../realm/schema/Schemas";
import app from "../realm/RealmApp";


export default function AddExpense() {
    const [amount, setAmount] = useState(0);
    const [item, setItem] = useState('');
    const [error, setError] = useState("");
    const { state: { user } } = useContext(AuthenticationContext);

    const [selectedDate, setSelectedDate] = useState('Select Date');


    const addExpenditure = () => {
        try {

            console.log("item===>"+item)
            console.log("amount===>"+amount)
            console.log("selectedDate===>"+selectedDate)
            const currentDate = new Date()
            const currentDatevalue = (selectedDate === 'Select Date'?  currentDate.toDateString() : selectedDate)
            console.log("currentDate"+currentDatevalue)
            const datamanager = DataManager.getInstance();
            const expenditureRealm = datamanager.realmInstance;

            expenditureRealm.write(() => {

                const expenditureRealmObject =  new ExpenditureRealm({
                    item: item,
                    amount: amount,
                    date: currentDatevalue,
                    user_id: app?.currentUser?.id
                })
                console.log("321 reached",expenditureRealmObject)

                // console.log("123 reached"+app?.currentUser?.id)
                expenditureRealm.create(
                    Schema.Expenditure,
                     expenditureRealmObject
                );
                console.log("321 reached")

            });


            setError("Expenditure Added")
        } catch (error) {
            setError("Unable to Expenditure ==>" + error)
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={styles.container}>
            <Text>{error}</Text>

                <View style={styles.inputView}>
                    <TextInput
                        returnKeyType="next"

                        style={styles.TextInput}
                        placeholder="Item name"
                        placeholderTextColor="#000000"
                        autoCapitalize={'none'}
                        onChangeText={(value) => {
                            setItem(value)
                        }}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        keyboardType='number-pad'
                        returnKeyType="next"

                        style={styles.TextInput}
                        placeholder="Amount."
                        placeholderTextColor="#000000"
                        autoCapitalize={'none'}
                        onChangeText={(value) => {
                            const numberValue = value.replace(/[^0-9]/g, '')
                            setAmount(parseInt(numberValue))
                        }}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.TextInput}

                    >{selectedDate}</Text>
                </View>

                <DatePicker
                    onSelectedChange={date => setSelectedDate(date)}
                />



                <View style={{
                    margin: 1
                }}>
                
                </View>

                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => {


                        if (item.length > 0 && amount > 0 ) {
                            addExpenditure()
                        } else {
                            setError("Please enter item name and amount")
                        }


                    }}
                >
                    <Text style={styles.loginText}>Add</Text>
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        // justifyContent: "center",
        paddingTop: 20
    },

    image: {
        marginBottom: 10,
    },

    inputView: {
        backgroundColor: "#00000080",
        borderRadius: 10,
        width: "80%",
        height: 45,
        marginBottom: 5,
        // alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        // marginLeft: 20,
    },

    // forgot_button: {
    //   height: 30,
    //   marginBottom: 30,
    // },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        textShadowColor: '#FFFFFF',
        // borderRadius:10,
        borderColor: 'black',
        backgroundColor: "#000019",
    },
    loginText: {
        color: '#FFFFFF',
    },
    innerContainer: {
        flexDirection: "row",
        alignItems: "stretch"
    },
    text: {
        fontSize: 18
    },
    clearButton: {
        backgroundColor: "grey",
        borderRadius: 5,
        marginRight: 10,
        padding: 5
    },
    optionContainer: {
        padding: 10,
        borderBottomColor: "grey",
        borderBottomWidth: 0
    },
    optionInnerContainer: {
        flex: 1,
        flexDirection: "row"
    },
    box: {
        width: 20,
        height: 20,
        marginRight: 10
    }
});