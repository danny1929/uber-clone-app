import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, StatusBar } from 'react-native';

import { Input, Button } from 'react-native-elements';
import tw from 'twrnc';
import { auth } from '../../firebase';

const RegisterScreen = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<string>("")

    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: "Back to Login",
      });
    }, [navigation])

    const register = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(authUser.user, {displayName: name,
          photoURL: imageUrl || "http://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",    
        }).then(()=>{})
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });

    };

    return (
        <KeyboardAvoidingView 
          behavior='padding' 
          style={tw`flex-1 items-center justify-center p-10 bg-white`}
        >
          <StatusBar barStyle="light-content" />
        <Text style={tw`mb-12 text-xl`}>Create an account</Text>
        <View style={tw`w-75`}>
            <Input 
              placeholder="Full Name" 
              autoFocus
              textContentType="name"
              value={name}
              onChangeText={(text : string)=>setName(text)}
            />            
            <Input 
              placeholder="Email" 
              textContentType="emailAddress"
              value={email}
              onChangeText={(text : string)=>setEmail(text)}
            />
            <Input 
              placeholder="Password" 
              secureTextEntry
              textContentType="password"
              value={password}
              onChangeText={(text : string)=>setPassword(text)}
            />
             <Input 
              placeholder="Profile Picture URL (optional)" 
              textContentType="URL"
              value={imageUrl}
              onChangeText={(text : string)=>setImageUrl(text)}
              onSubmitEditing={register}
            />
        </View>
        <Button style={tw`w-50 mt-2.5`} title="Register" onPress={register} raised/>

        <View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  export default RegisterScreen;

  const style = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }
  })