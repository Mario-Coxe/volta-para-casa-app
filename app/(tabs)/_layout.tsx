/** @format */

import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 27,
          left: 16,
          right: 16,
          height: 72,
          elevation: 0,
          backgroundColor: "white",
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Página Inicial",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "#F02A4B" : "gray"}
                size={24}
              />
              <Text
                style={{
                  color: focused ? "#F02A4B" : "gray",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Home
              </Text>
            </View>
          ),

        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "Pesquisar",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={focused ? "#F02A4B" : "gray"}
                size={24}
              />
              <Text
                style={{
                  color: focused ? "#F02A4B" : "gray",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Pesquisar
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          headerTitle: "Registar",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 56,
                width: 56,
                borderRadius: 999,
                backgroundColor: "#F02A4B",
                marginBottom: 26
              }}
            >
              <Ionicons name="add" color="white" size={24} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="likes"
        options={{
          headerTitle: "Seguidos",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Ionicons
                name={focused ? "bookmark" : "bookmark-outline"}
                color={focused ? "#F02A4B" : "gray"}
                size={24}
              />

              <Text
                style={{
                  color: focused ? "#F02A4B" : "gray",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Seguidos
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Perfil",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={focused ? "#F02A4B" : "gray"}
                size={24}
              />
              <Text
                style={{
                  color: focused ? "#F02A4B" : "gray",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Perfil
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
