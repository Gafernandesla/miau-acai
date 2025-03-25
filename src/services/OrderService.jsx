import { db } from "./firebaseConfig";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";


export const saveOrder = async (userId, cartItems, paymentMethod, address) => {
  try {
    if (!userId) {
      console.error("Erro: Usuário não autenticado!");
      return null;
    }

    if (!cartItems || cartItems.length === 0) {
      console.error("Erro: Carrinho vazio!");
      return null;
    }

    const order = {
      userId, 
      items: cartItems,
      total: cartItems.reduce((total, item) => total + (item.price || 0), 0), 
      status: "Pendente", 
      paymentMethod, 
      address, 
      createdAt: serverTimestamp(), 
    };

    const docRef = await addDoc(collection(db, "orders"), order);
    return { id: docRef.id, ...order };
  } catch (error) {
    console.error("Erro ao salvar pedido:", error);
    return null;
  }
};


export const getOrdersByUser = async (userId) => {
  try {
    if (!userId) {
      console.error("Erro: Usuário não autenticado!");
      return [];
    }

    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc") 
    );

    const querySnapshot = await getDocs(q);
    let orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    return orders;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return [];
  }
};


export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    if (!orderId || !newStatus) {
      console.error("Erro: Parâmetros inválidos para atualizar pedido!");
      return false;
    }

    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
    return true;
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error);
    return false;
  }
};


export const getAllOrders = async () => {
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    let orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    return orders;
  } catch (error) {
    console.error("Erro ao buscar todos os pedidos:", error);
    return [];
  }
};
