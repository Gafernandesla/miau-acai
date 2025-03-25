import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

/**
 * 
 * @param {string} userId
 * @param {string} address
 */
export const saveAddress = async (userId, address) => {
  try {
    await addDoc(collection(db, "addresses"), {
      userId,
      address,
      createdAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Erro ao salvar endereço:", error);
    return false;
  }
};
