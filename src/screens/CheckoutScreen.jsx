import React, { useEffect, useState, useContext } from "react";
import { Picker } from '@react-native-picker/picker';
import { View, Text, Button, FlatList, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../services/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { saveOrder } from "../services/OrderService";
import { CartContext } from "../context/CartContext"; 

const CheckoutScreen = ({ route }) => {
  const { user } = useAuth();
  const { cartItems, isCartEmpty } = useContext(CartContext); 
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit"); 

  
  useEffect(() => {
    console.log("Itens do carrinho recebidos:", cartItems);
    if (isCartEmpty()) {
      Alert.alert("Erro", "Carrinho vazio! Adicione itens antes de finalizar.");
      navigation.navigate("Cart"); 
    }
  }, [cartItems, isCartEmpty, navigation]);

  
  useEffect(() => {
    if (user) fetchAddresses();
  }, [user]);

  
  const fetchAddresses = async () => {
    try {
      const q = query(collection(db, "addresses"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      let fetchedAddresses = [];
      querySnapshot.forEach((doc) => {
        fetchedAddresses.push({ id: doc.id, ...doc.data() });
      });
      setAddresses(fetchedAddresses);
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
    }
  };

  
  const finalizeOrder = async () => {
    if (!selectedAddress) {
      Alert.alert("Erro", "Escolha um endereço para entrega.");
      return;
    }

    if (isCartEmpty()) {
      Alert.alert("Erro", "Carrinho vazio! Adicione itens antes de finalizar.");
      return;
    }

    try {
      
      const order = await saveOrder(user.uid, cartItems, selectedAddress.address, paymentMethod);

      if (order) {
        Alert.alert("Sucesso", `Pedido realizado com sucesso! Pagamento na entrega via ${paymentMethod}.`);
        navigation.navigate("Home");
      } else {
        Alert.alert("Erro", "Erro ao salvar pedido.");
      }
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      Alert.alert("Erro", "Ocorreu um erro ao finalizar o pedido.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um Endereço</Text>
      
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.addressButton,
              selectedAddress?.id === item.id && styles.selectedAddressButton,
            ]}
            onPress={() => setSelectedAddress(item)}
          >
            <Text style={styles.addressText}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedAddress && (
        <View style={styles.selectedAddressContainer}>
          <Text>Endereço Selecionado: {selectedAddress.address}</Text>
        </View>
      )}

      <Text style={styles.paymentMethodText}>Escolha o Método de Pagamento na Entrega:</Text>
      <Picker
        selectedValue={paymentMethod}
        onValueChange={(itemValue) => setPaymentMethod(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Crédito" value="credit" />
        <Picker.Item label="Débito" value="debit" />
        <Picker.Item label="PIX" value="pix" />
      </Picker>

      <TouchableOpacity
        style={[
          styles.finalizeButton,
          !selectedAddress && styles.disabledButton,
        ]}
        onPress={finalizeOrder}
        disabled={!selectedAddress}
      >
        <Text style={styles.finalizeButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Voltar para o Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFEBEE",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#7B1FA2",
  },
  addressButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedAddressButton: {
    backgroundColor: "#7B1FA2",
    borderColor: "#7B1FA2",
  },
  addressText: {
    fontSize: 16,
    color: "#333",
  },
  selectedAddressContainer: {
    marginTop: 20,
  },
  paymentMethodText: {
    fontSize: 18,
    marginTop: 20,
    color: "#7B1FA2",
  },
  picker: {
    height: 50,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  finalizeButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#ddd",
  },
  finalizeButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  backButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
