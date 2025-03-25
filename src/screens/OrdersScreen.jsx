import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getOrdersByUser } from "../services/OrderService";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user || !user.uid) return;

    const fetchOrders = async () => {
      try {
        const userOrders = await getOrdersByUser(user.uid);
        setOrders(userOrders);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>

      {orders.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.orderText}>Pedido ID: {item.id}</Text>
              <Text style={styles.orderText}>Total: R$ {item.total.toFixed(2)}</Text>
              <Text style={styles.orderText}>Status: {item.status}</Text>
              <Text style={styles.orderText}>
                Criado em: {new Date(item.createdAt.seconds * 1000).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFEBEE" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#7B1FA2",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
    marginTop: 20,
  },
  orderItem: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  orderText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: "#1976D2",
    padding: 12,
    borderRadius: 5,
    marginTop: 30,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
