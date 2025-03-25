import React, { useContext } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { CartContext } from "../context/CartContext";

const acaiItems = [
  {
    id: "1",
    name: "Açaí Tradicional",
    price: 12.00,
    image: "https://media.istockphoto.com/id/1451849829/pt/foto/acai-cup-with-granola-and-condensed-milk-isolated-on-white-background.jpg?s=170667a&w=0&k=20&c=jdS4oHcYIaGeZIqXno7krlwSeAZ7Suc0vltryp4FAhs=",
    description: "Açaí puro, granola e leite condensado.",
  },
  {
    id: "2",
    name: "Açaí com Banana",
    price: 15.00,
    image: "https://media.istockphoto.com/id/1451849829/pt/foto/acai-cup-with-granola-and-condensed-milk-isolated-on-white-background.jpg?s=170667a&w=0&k=20&c=jdS4oHcYIaGeZIqXno7krlwSeAZ7Suc0vltryp4FAhs=",
    description: "Açaí batido com banana, granola e mel.",
  },
  {
    id: "3",
    name: "Açaí com Leite Ninho",
    price: 18.00,
    image: "https://media.istockphoto.com/id/1451849829/pt/foto/acai-cup-with-granola-and-condensed-milk-isolated-on-white-background.jpg?s=170667a&w=0&k=20&c=jdS4oHcYIaGeZIqXno7krlwSeAZ7Suc0vltryp4FAhs=",
    description: "Açaí cremoso com Leite Ninho e leite condensado.",
  },
];

export default function MenuScreen({ navigation }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (item) => {
    addToCart(item);
    ToastAndroid.show(`${item.name} adicionado ao carrinho!`, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio 🍨</Text>

      <FlatList
        data={acaiItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
              <Text style={styles.buttonText}>+ Carrinho</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate("Cart")}>
        <Text style={styles.cartButtonText}>Ir para o Carrinho 🛒</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFEBEE", 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7B1FA2",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: "#7B1FA2",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#7B1FA2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cartButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
    width: "100%",
  },
  cartButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 15,
    width: "100%",
  },
  backButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
