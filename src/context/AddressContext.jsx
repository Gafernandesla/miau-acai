import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);

  
  const fetchAddresses = async () => {
    if (!user) return;

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

  useEffect(() => {
    fetchAddresses(); 
  }, [user]);

  
  const addAddress = async (newAddress) => {
    if (!user) return; 

    try {
      const docRef = await addDoc(collection(db, "addresses"), {
        userId: user.uid,
        ...newAddress,
      });

      setAddresses((prevAddresses) => [
        ...prevAddresses,
        { id: docRef.id, ...newAddress },
      ]);
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
    }
  };

  
  const updateAddress = async (id, updatedAddress) => {
    try {
      const addressRef = doc(db, "addresses", id);
      await updateDoc(addressRef, updatedAddress);

      setAddresses((prevAddresses) =>
        prevAddresses.map((addr) =>
          addr.id === id ? { ...addr, ...updatedAddress } : addr
        )  
      );
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
    }
  };

  
  const deleteAddress = async (id) => {
    try {
      await deleteDoc(doc(db, "addresses", id));
      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.id !== id)  
      );
    } catch (error) {
      console.error("Erro ao remover endereço:", error);
    }
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress }}>
      {children}
    </AddressContext.Provider>
  );
};


export const useAddress = () => {
  return useContext(AddressContext);
};
