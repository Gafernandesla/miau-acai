import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { AddressProvider } from "./context/AddressContext";

import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import OrdersScreen from "./screens/OrdersScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import AddressScreen from "./screens/AddressScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AddressProvider> 
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Registro" }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
              <Stack.Screen name="Menu" component={MenuScreen} options={{ title: "Cardápio" }} />
              <Stack.Screen name="Cart" component={CartScreen} options={{ title: "Carrinho" }} />
              <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Finalizar Pedido" }} /> 
              <Stack.Screen name="Addresses" component={AddressScreen} options={{ title: "Meus Endereços" }} /> 
              <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: "Meus Pedidos" }} />
            </Stack.Navigator>
          </NavigationContainer>
        </AddressProvider>
      </CartProvider>
    </AuthProvider>
  );
}
