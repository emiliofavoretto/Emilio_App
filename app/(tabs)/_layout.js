import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: "#0f62fe",
        tabBarLabelStyle: {
          fontSize: 12,
            fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
            headerTitle: "Sobre",

        }}
      />
      <Tabs.Screen
        name="aulas"
        options={{
          title: "Aulas",
          headerTitle: "Conteúdo",
        }}
      />
      <Tabs.Screen
        name="interface"
        options={{
          title: "interface",
          headerTitle: "interface",
        }}
      />
    </Tabs>
  );
}
