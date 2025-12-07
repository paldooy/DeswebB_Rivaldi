<script setup>
import { ref } from 'vue';
import Header from './components/HeaderFooter/Header.vue'; 
import Footer from './components/HeaderFooter/Footer.vue';

const cartItems = ref([]);
const cartItemsCount = ref(0);
const wishlistItems = ref([]);

const handleAddToCart = (product, quantity) => {
  const existingItem = cartItems.value.find(item => item.product.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.value.push({ product, quantity });
  }
  
  cartItemsCount.value = cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  
};

const handleRemoveFromCart = (productId) => {
  cartItems.value = cartItems.value.filter(item => item.product.id !== productId);
  cartItemsCount.value = cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
};

const handleUpdateQuantity = (productId, newQuantity) => {
  const item = cartItems.value.find(item => item.product.id === productId);
  if (item) {
    item.quantity = newQuantity;
    cartItemsCount.value = cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  }
};

const handleOrderComplete = () => {
  cartItems.value = [];
  cartItemsCount.value = 0;
};

const handleAddToWishlist = (product) => {
  const exists = wishlistItems.value.find(item => item.id === product.id);
  if (!exists) {
    wishlistItems.value.push(product);
  }
};

const handleRemoveFromWishlist = (productId) => {
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== productId);
};

const isInWishlist = (productId) => {
  return wishlistItems.value.some(item => item.id === productId);
};
</script>

<template>
  <div class="overflow-x-hidden">
    <Header :cartItemsCount="cartItemsCount" :wishlistCount="wishlistItems.length" />
    
    <router-view 
    :cartItems="cartItems"
    :cartItemsCount="cartItemsCount"
    :wishlistItems="wishlistItems"
    :isInWishlist="isInWishlist"
    @addToCart="handleAddToCart"
    @removeFromCart="handleRemoveFromCart"
    @updateQuantity="handleUpdateQuantity"
    @orderComplete="handleOrderComplete"
    @addToWishlist="handleAddToWishlist"
    @removeFromWishlist="handleRemoveFromWishlist"
    />
    
    <Footer />
  </div>
</template>