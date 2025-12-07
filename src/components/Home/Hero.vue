<template>
  <div>
    <section
      class="relative text-white min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden bg-cover bg-center"
      style="background-image: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url('/Store.jpg');"
    >
      <div class="absolute inset-0 z-0"></div>
      
      <div class="container w-4xl px-4 relative z-10">
        <div class="max-w-3xl px-4 sm:px-6 md:px-8 lg:px-16">
          <span class="inline-block px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
            Belanja Hemat Setiap Hari
          </span>
          <h1 class="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Temukan Produk Favorit Anda di KemoySupply</h1>
          <p class="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-white/90">
            Ribuan produk berkualitas dengan harga terbaik. Gratis ongkir untuk pembelian pertama!
          </p>
          <div class="flex flex-wrap gap-3 sm:gap-4">
            <button
              class="px-4 py-2 sm:px-6 sm:py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm sm:text-base"
            >
            <router-link to="/products">
              Belanja Sekarang
            </router-link>
            </button>
            <router-link 
              to="/contact"
              class="px-4 py-2 sm:px-6 sm:py-3 bg-transparent text-white border border-white rounded-md hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              Pelajari Lebih Lanjut
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Overview Section -->
    <Overview/>

    <h1 class="text-center text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-4 px-4">Our products</h1>
    <ProductGrid/>

    <!-- View More Button -->
    <div class="py-6 sm:py-8 bg-gray-50 text-center px-4">
      <router-link to="/products" class="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-700 hover:text-white transition-colors font-semibold text-sm sm:text-base">
        View More Products
      </router-link>
    </div>

    <!-- CTA Section -->
    <CTA/>
  </div>
</template>

<script setup lang="ts">
import Overview from './Overview.vue';
import CTA from './CTA.vue';
import ProductGrid from '../Product/ProductHome.vue';
</script>