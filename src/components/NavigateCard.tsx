import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import { NavFavourites } from "./NavFavourites";
import { Icon } from "react-native-elements";
import { RootStackParamList } from "../../App";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackParamList>();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good morning, Danny</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={toInputBoxStyles}
            placeholder="Where to?"
            fetchDetails={true}
            textInputProps={{
              returnKeyType: "search",
            }}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );

              navigation.navigate("RideOptionsCard");
            }}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>
        <NavFavourites />
      </View>
      <View
        style={tw`flex-row justify-evenly bg-white py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="car"
            type="font-awesome"
            color="white"
            size={16}
          />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },

  textInput: {
    backgroundColor: "00000F",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
