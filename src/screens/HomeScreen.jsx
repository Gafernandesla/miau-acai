import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <View style={styles.container}>
      
      <Image source={require('../../assets/acai-icon.png')} style={styles.icon} />

      <Text style={styles.title}>Bem-vindo ao Miau App 🍧</Text>
      <Text style={styles.deliveryTime}>Entrega em até 45 minutos!</Text>

      <Text style={styles.userEmail}>{user?.email}</Text>

      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu")}>
        <Text style={styles.buttonText}>Ver Cardápio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Orders")}>
        <Text style={styles.buttonText}>Meus Pedidos</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

      
      <View style={styles.contactInfoContainer}>
        <View style={styles.contactInfo}>
          <MaterialCommunityIcons name="phone" size={24} color="#7B1FA2" />
          <Text style={styles.contactText}>51 9283-5190</Text>
        </View>
        <View style={styles.contactInfo}>
          <MaterialCommunityIcons name="clock" size={24} color="#7B1FA2" />
          <Text style={styles.contactText}>12:00 até 00:00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFEBEE", 
    padding: 20,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 30, 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7B1FA2",
    marginBottom: 10,
    textAlign: "center",
  },
  deliveryTime: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50", 
    marginBottom: 20, 
    textAlign: "center",
  },
  userEmail: {
    fontSize: 18,
    color: "#777",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50", 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#FF5252", 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  contactInfoContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30, 
    width: "80%",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  contactText: {
    fontSize: 18,
    color: "#7B1FA2",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
