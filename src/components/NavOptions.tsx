import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../../slices/navSlice";
import { RootStackParamList } from "../../App";

const data = [
  {
    id: "123",
    title: "ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
];

export const NavOptions = () => {
  const navigation = useNavigation<RootStackParamList>();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          disabled={!origin}
        >
          <View style={tw.style(!origin && "opacity-20")}>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
