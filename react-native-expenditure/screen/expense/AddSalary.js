import React, { useState, useContext, useRef, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
} from "react-native";
// import Realm from "realm";
import { CustomPicker } from "react-native-custom-picker";
import Realm from "realm";
import app from "../realm/RealmApp";

import {
    Context as AuthenticationContext,
} from '../context/AuthenticationContext';
import { SalaryRealm } from "../realm/schema/SalaryRealm";
import Schema from "../realm/schema/Schemas";
import { ExpenditureRealm } from "../realm/schema/ExpenditureRealm";
import DataManager from "../realm/DataManager";


export default function AddSalary() {
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const { state: { user } } = useContext(AuthenticationContext);

    const addSalary = () => {
        try {
          const datamanager = DataManager.getInstance();
            const salaryRealm = datamanager.realmInstance;
            salaryRealm.write(() => {
                salaryRealm.create(
                    Schema.Salary,
                    new SalaryRealm({
                        year: year,
                        month: month,
                        amount: parseInt(amount),
                        user_id: user?.id
                    })
                );
            });
            setError("Salary Added")
        } catch (error) {
            setError("Unable to add Salary" + JSON.stringify(error))
        }
    };

    return (
        <View style={styles.container}>


            <View style={styles.inputView}>
                <CustomPicker
                    containerStyle={
                        {
                            justifyContent: 'center',
                        }
                    }
                    placeholder={"Please select year"}
                    options={yearName}
                    getLabel={(item) => item.label}
                    optionTemplate={({ item, getLabel }) => {
                        return (
                            <View style={styles.optionContainer}>
                                <View style={styles.innerContainer}>
                                    <View style={[styles.box, { backgroundColor: item.color }]} />
                                    <Text style={{ color: item.color, alignSelf: "flex-start" }}>
                                        {getLabel(item)}
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                    onValueChange={({ value }) => {
                        setYear(parseInt(value))

                    }}
                />
            </View>
            <View style={styles.inputView}>
                <CustomPicker
                    containerStyle={
                        {
                            justifyContent: 'center',
                        }
                    }

                    placeholder={"Please select month"}
                    options={monthName}
                    getLabel={(item) => item.label}
                    optionTemplate={({ item, getLabel }) => {
                        return (
                            <View style={styles.optionContainer}>
                                <View style={styles.innerContainer}>
                                    <View style={[styles.box, { backgroundColor: item.color }]} />
                                    <Text style={{ color: item.color, alignSelf: "flex-start" }}>
                                        {getLabel(item)}
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                    onValueChange={({ value }) => {
                        setMonth(parseInt(value))

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
                        setAmount(numberValue)
                    }}
                />
            </View>


            <View style={{
                margin: 10
            }}>
                <Text>{error}</Text>

            </View>

            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {


                    if (year > 0 && month > 0 && amount > 0) {
                        addSalary()
                    } else {
                        setError(month + "month Please enter value year" + year)
                    }


                }}
            >
                <Text style={styles.loginText}>Add</Text>
            </TouchableOpacity>

        </View>
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
        marginBottom: 40,
    },

    inputView: {
        backgroundColor: "#00000080",
        borderRadius: 10,
        width: "80%",
        height: 45,
        marginBottom: 10,
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
        marginTop: 10,
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




const yearName = [
    {
        color: "#2660A4",
        label: "2022",
        value: 2022
    },
    {
        color: "#FF6B35",
        label: "2023",
        value: 2023
    },
    {
        color: "#FFBC42",
        label: "2024",
        value: 2024
    },
]
export const monthName = [
    {
        color: "#2660A4",
        label: "January",
        value: 1
    },
    {
        color: "#FF6B35",
        label: "February",
        value: 2
    },
    {
        color: "#FFBC42",
        label: "March",
        value: 3
    },
    {
        color: "#AD343E",
        label: "April",
        value: 4
    },
    {
        color: "#051C2B",
        label: "May",
        value: 5
    }, {
        color: "#2660A4",
        label: "June",
        value: 6
    },
    {
        color: "#FF6B35",
        label: "July",
        value: 7
    },
    {
        color: "#FFBC42",
        label: "August",
        value: 8
    },
    {
        color: "#AD343E",
        label: "September",
        value: 9
    },
    {
        color: "#051C2B",
        label: "October",
        value: 10
    }, {
        color: "#2660A4",
        label: "November",
        value: 11
    },
    {
        color: "#FF6B35",
        label: "December",
        value: 12
    },
];
