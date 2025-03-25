import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { AddressContext } from "../context/AddressContext";

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { addresses } = useContext(AddressContext);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione itens antes de finalizar o pedido.");
      return;
    }

    if (!user || !user.uid) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    
    if (addresses.length > 0) {
      navigation.navigate("Checkout", { cartItems }); 
    } else {
      
      navigation.navigate("Addresses");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho 🛒</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio!</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.itemDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Text style={styles.total}>Total: R$ {totalPrice.toFixed(2)}</Text>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleProceedToCheckout}>
        <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#7B1FA2",
    marginBottom: 20,
    textAlign: "center", 
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    paddingHorizontal: 15, 
  },
  itemDetails: {
    flex: 1, 
  },
  name: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5, 
  },
  price: {
    fontSize: 16,
    color: "#7B1FA2",
  },
  removeButton: {
    backgroundColor: "#FF5252", 
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    color: "#7B1FA2",
  },
  checkoutButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  checkoutButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  backButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
