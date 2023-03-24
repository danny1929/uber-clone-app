import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../../slices/navSlice";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "The University of Hong Kong, Pok Fu Lam",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "Long Yat Road, Yuen Long, Hong Kong",
  },
];

export const NavFavourites = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { location, icon, destination } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
