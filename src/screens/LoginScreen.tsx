import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import tw from 'twrnc';
import { auth } from '../../firebase';
import BioAuth from '../../bioAuth';
import { RootStackParamList } from '../../App';

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation<RootStackParamList>();
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user){
          return navigation.replace("Dashboard");
        }
      });
      return unsubscribe;
    }, [])
    

    const signIn = () => {

    };

    return (
        <KeyboardAvoidingView 
          behavior='padding' 
          style={tw`flex-1 items-center justify-center p-10 bg-white`}
        >
          <StatusBar barStyle={"light-content"} />
        <Text>Login Screen</Text>
        <View style={tw`w-75`}>
            <Input 
              placeholder="Email" 
              autoFocus
              textContentType="emailAddress"
              value={email}
              onChangeText={(text)=>setEmail(text)}
            />
            <Input 
              placeholder="Password" 
              secureTextEntry
              textContentType="password"
              value={password}
              onChangeText={(text)=>setPassword(text)}
            />
        </View>
        <Button style={tw`w-50 mt-2.5`} title="Login" onPress={signIn} />
        <Button style={tw`w-50 mt-2.5`} type="outline" title="Register" onPress={()=> navigation.navigate("RegisterScreen")}/>
        <BioAuth />
        <View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  export default LoginScreen;

  const style = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }
  })