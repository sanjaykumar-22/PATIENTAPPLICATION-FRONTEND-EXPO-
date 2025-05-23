import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductDetails = ({ route }) => {
  const { item } = route.params;
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();

  const addToCart = () => {
    const newItem = { ...item, quantity };
    setCartItems([...cartItems, newItem]);
    console.log('Item added to cart:', newItem);
  };

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, quantity + value)); // Ensure quantity is always at least 1
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
      <View style={styles.quantityContainer}>
        <Text>Quantity:</Text>
        <View style={styles.quantityControls}>
          <Button title="-" onPress={() => handleQuantityChange(-1)} />
          <Text>{quantity}</Text>
          <Button title="+" onPress={() => handleQuantityChange(1)} />
        </View>
      </View>
      {cartItems.find(product => product.id === item.id) ? (
        <View style={styles.cartInfo}>
          <Text>Quantity in Cart: {cartItems.find(product => product.id === item.id).quantity}</Text>
        </View>
      ) : (
        <Button title="Add to Cart" onPress={addToCart} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 60,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ProductDetails;
