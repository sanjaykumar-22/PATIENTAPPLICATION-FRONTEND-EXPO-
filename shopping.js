import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShoppingPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => {
        setCategories(json);
      })
      .catch(error => console.error('Error fetching categories:', error));
  };

  const fetchProducts = () => {
    setLoading(true);
    let url = 'https://fakestoreapi.com/products';
    
    if (selectedCategory) {
      url += `/category/${selectedCategory}`;
    } else if (searchQuery.trim() !== '') {
      url += `?title=${searchQuery}`;
    }
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Product', { item })}>
      <View style={styles.productContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for products"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
          style={styles.searchInput}
        />
        <Button
          title="Search"
          onPress={fetchProducts}
          color="#ff523b"
        />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoryLabel}>Categories:</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryButton, item === selectedCategory && styles.selectedCategoryButton]}
              onPress={() => setSelectedCategory(item === selectedCategory ? null : item)}
            >
              <Text style={styles.categoryButtonText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  categoryLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#ff523b',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#000',
  },
});

export default ShoppingPage;
