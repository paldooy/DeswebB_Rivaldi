<script setup>
import { ref } from 'vue';
import Header from './components/headerfooter/Header.vue'; 
import Footer from './components/headerfooter/Footer.vue';
import Hero from './components/Home/Hero.vue';
import Contact from './components/Contact/Contact.vue';

const currentPage = ref('home');
const cartItemsCount = ref(0);

const navigateTo = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <Header 
    :currentPage="currentPage" 
    :cartItemsCount="cartItemsCount"
    @navigate="navigateTo"
  />
  
  <!-- Home Page -->
  <Hero v-if="currentPage === 'home'" @navigate="navigateTo" />
  
  <!-- Contact Page -->
  <Contact v-if="currentPage === 'contact'" @navigate="navigateTo" />
  
  <Footer/>
</template>