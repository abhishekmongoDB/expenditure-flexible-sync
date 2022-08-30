import React, { useState , useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
// import Realm from "realm";
import {
  Context as AuthenticationContext,
} from '../context/AuthenticationContext';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {  signup, signin} = useContext(   AuthenticationContext );



  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#FFFFFF"
          autoCapitalize={'none'}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#FFFFFF"
          secureTextEntry={true}
          autoCapitalize={'none'}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={{
        margin: 30
      }}>
        <Text>{error}</Text>

      </View>

      <TouchableOpacity style={styles.loginBtn}
      onPress={()=>{
       
       
        if(email.length > 0  && password.length){
          signin(email, password , function(result, error){
            if(result){
              setError("Signin successful")
            }else{

              if(error?.code === 50){
                setError("User not found, signup please" )
              }else{
                setError("Something went wrong, try again")
              }

            }
        })
         }else{
          setError("Please enter email and password")
         }
         
         
      }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}   onPress={()=>{
       if(email.length > 0  && password.length){
        signup(email, password, function(result, error){
          if(error != null || error  != undefined){
            if(error?.code === 49){
              setError("User already exists, try login " )
            }else{
              setError("Something went wrong")
            }

          }else{
            setError("Signup successful")
            signin(email, password , function(result, error){
              if(result){
                setError("Signin successful")
              }else{
                setError("Signin Failed")
              }});
          }
        })
       }else{
        setError("Please enter email and password")

       }
       
    
      }}>
        <Text style={styles.loginText}>SIGNUP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
  }
});