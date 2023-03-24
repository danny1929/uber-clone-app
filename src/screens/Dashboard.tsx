import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Alert,
  SafeAreaView,
  View,
  Image,
  Text,
} from "react-native";
import { NavOptions } from "../components/NavOptions";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin, setCurrent } from "../../slices/navSlice";
import { NavFavourites } from "../components/NavFavourites";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

type ILocation = {
  coords: Coords;
};

type Coords = {
  longitude: number;
  latitude: number;
};

type pointLocation = {
  coords: Coords;
  description: string;
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState<pointLocation>();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // get current location coordinates
      let selfLocation: ILocation = await Location.getCurrentPositionAsync({});

      // get current location full address
      Geocoder.init(GOOGLE_MAPS_APIKEY);
      Geocoder.from(selfLocation.coords.latitude, selfLocation.coords.longitude)
        .then((json) => {
          const full_address = json.results[0].formatted_address;
          setCurrentLocation({
            coords: {
              longitude: selfLocation.coords.longitude,
              latitude: selfLocation.coords.latitude,
            },
            description: full_address,
          });
        })
        .catch((error) => console.warn(error));
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (currentLocation) {
    text = JSON.stringify(currentLocation);
  }

  /*dispatch(setCurrent({
    location: currentLocation?.coords,
    description: currentLocation?.description
  }));*/

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Text style={tw`font-bold text-4xl my-8`}>UBER APP</Text>
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          textInputProps={{
            returnKeyType: "search",
          }}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />

        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
