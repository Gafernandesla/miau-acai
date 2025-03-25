import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { db } from "../services/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useAddress } from "../context/AddressContext";


const AddressScreen = () => {
  const { user } = useAuth();
  const { addresses, addAddress, updateAddress, deleteAddress } = useAddress();
  const [newAddress, setNewAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchAddresses();
    }
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
      Alert.alert("Erro", "Falha ao carregar os endereços.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    if (addresses.length >= 3) {
      Alert.alert("Limite atingido", "Você pode salvar no máximo 3 endereços.");
      return;
    }
    if (!newAddress.trim()) {
      Alert.alert("Erro", "O endereço não pode estar vazio.");
      return;
    }

    try {
      await addAddress({ address: newAddress.trim() });
      setNewAddress("");
      Alert.alert("Sucesso", "Endereço adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
      Alert.alert("Erro", "Falha ao adicionar o endereço.");
    }
  };

  const handleEditAddress = async (id, updatedText) => {
    if (!updatedText.trim()) {
      Alert.alert("Erro", "O endereço não pode estar vazio.");
      return;
    }

    try {
      await updateAddress(id, { address: updatedText.trim() });
      Alert.alert("Sucesso", "Endereço atualizado!");
    } catch (error) {
      console.error("Erro ao editar endereço:", error);
      Alert.alert("Erro", "Falha ao editar o endereço.");
    }
  };

  const handleDeleteAddress = (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir este endereço?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            await deleteAddress(id);
            Alert.alert("Sucesso", "Endereço excluído.");
          } catch (error) {
            console.error("Erro ao excluir endereço:", error);
            Alert.alert("Erro", "Falha ao excluir o endereço.");
          }
        },
      },
    ]);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Seus Endereços</Text>

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}>
              <TextInput
                value={item.address}
                onChangeText={(text) => handleEditAddress(item.id, text)}
                style={{ borderBottomWidth: 1, marginBottom: 5 }}
              />
              <Button title="Excluir" onPress={() => handleDeleteAddress(item.id)} color="red" />
            </View>
          )}
        />
      )}

      {addresses.length < 3 && (
        <>
          <TextInput
            placeholder="Digite um novo endereço"
            value={newAddress}
            onChangeText={setNewAddress}
            style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 }}
          />
          <Button title="Adicionar Endereço" onPress={handleAddAddress} />
        </>
      )}
    </View>
  );
};

export default AddressScreen;
