import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

/* ---------------- Dummy Data ---------------- */
const chats = [
    {
        id: "1",
        name: "Ali",
        message: "Where are you?",
        time: "10:30 AM",
        unread: 2,
        image: "https://i.pravatar.cc/150?img=1",
    },
    {
        id: "2",
        name: "Sara",
        message: "Okay done",
        time: "9:15 AM",
        unread: 1,
        image: "https://i.pravatar.cc/150?img=2",
    },
    {
        id: "3",
        name: "Ahmed",
        message: "See you soon",
        time: "Yesterday",
        unread: 0,
        image: "https://i.pravatar.cc/150?img=3",
    },
    {
        id: "4",
        name: "Fatima",
        message: "Thank you",
        time: "Yesterday",
        unread: 3,
        image: "https://i.pravatar.cc/150?img=4",
    },
];

const statuses = [
    {
        id: "1",
        name: "My Status",
        time: "Tap to add status update",
        image: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: "2",
        name: "Sara",
        time: "10 minutes ago",
        image: "https://i.pravatar.cc/150?img=6",
    },
    {
        id: "3",
        name: "Ahmed",
        time: "30 minutes ago",
        image: "https://i.pravatar.cc/150?img=7",
    },
    {
        id: "4",
        name: "Ali",
        time: "Today, 9:20 AM",
        image: "https://i.pravatar.cc/150?img=8",
    },
];

const calls = [
    {
        id: "1",
        name: "Ali",
        type: "Incoming",
        time: "Today, 2:00 PM",
        image: "https://i.pravatar.cc/150?img=9",
    },
    {
        id: "2",
        name: "Sara",
        type: "Outgoing",
        time: "Yesterday, 5:40 PM",
        image: "https://i.pravatar.cc/150?img=10",
    },
    {
        id: "3",
        name: "Ahmed",
        type: "Missed",
        time: "Monday, 1:10 PM",
        image: "https://i.pravatar.cc/150?img=11",
    },
];

/* ---------------- Reusable Header ---------------- */
function Header({ title }) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={styles.headerIcons}>
                <Ionicons name="search" size={22} color="#fff" style={styles.icon} />
                <Ionicons
                    name="ellipsis-vertical"
                    size={22}
                    color="#fff"
                    style={styles.icon}
                />
            </View>
        </View>
    );
}

/* ---------------- Chats Screen ---------------- */
function ChatsScreen() {
    const renderChat = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subText}>{item.message}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.time}>{item.time}</Text>
                {item.unread > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.unread}</Text>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.screen}>
            <Header title="WhatsApp" />
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={renderChat}
            />
        </View>
    );
}

/* ---------------- Status Screen ---------------- */
function StatusScreen() {
    const renderStatus = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.statusAvatar} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subText}>{item.time}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.screen}>
            <Header title="Status" />
            <FlatList
                data={statuses}
                keyExtractor={(item) => item.id}
                renderItem={renderStatus}
            />
        </View>
    );
}

/* ---------------- Calls Screen ---------------- */
function CallsScreen() {
    const renderCall = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.callRow}>
                    <Ionicons
                        name={item.type === "Missed" ? "arrow-down" : "arrow-up"}
                        size={14}
                        color={item.type === "Missed" ? "red" : "green"}
                    />
                    <Text style={styles.subText}> {item.time}</Text>
                </View>
            </View>
            <Ionicons name="call" size={22} color="#075E54" />
        </View>
    );

    return (
        <View style={styles.screen}>
            <Header title="Calls" />
            <FlatList
                data={calls}
                keyExtractor={(item) => item.id}
                renderItem={renderCall}
            />
        </View>
    );
}

/* ---------------- Main App ---------------- */
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: "#25D366",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        height: 60,
                        paddingBottom: 8,
                    },
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === "Chats") iconName = "chatbubble";
                        else if (route.name === "Status") iconName = "ellipse";
                        else if (route.name === "Calls") iconName = "call";

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Chats" component={ChatsScreen} />
                <Tab.Screen name="Status" component={StatusScreen} />
                <Tab.Screen name="Calls" component={CallsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: "#075E54",
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
    headerIcons: {
        flexDirection: "row",
    },
    icon: {
        marginLeft: 15,
    },
    itemContainer: {
        flexDirection: "row",
        padding: 15,
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd",
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 28,
    },
    statusAvatar: {
        width: 55,
        height: 55,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: "#25D366",
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    subText: {
        fontSize: 14,
        color: "gray",
        marginTop: 4,
    },
    right: {
        alignItems: "flex-end",
    },
    time: {
        fontSize: 12,
        color: "gray",
    },
    badge: {
        backgroundColor: "#25D366",
        borderRadius: 12,
        minWidth: 22,
        height: 22,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 6,
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    callRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
});