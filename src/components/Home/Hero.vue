<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-16 py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <span class="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
            Belanja Hemat Setiap Hari
          </span>
          <h1 class="mb-6">Temukan Produk Favorit Anda di ShopHub</h1>
          <p class="mb-8 text-xl text-white/90">
            Ribuan produk berkualitas dengan harga terbaik. Gratis ongkir untuk pembelian pertama!
          </p>
          <div class="flex flex-wrap gap-4">
            <button
              class="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              Belanja Sekarang
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
            <button class="px-6 py-3 bg-transparent text-white border border-white rounded-md hover:bg-white/10 transition-colors">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Overview Section -->
    <Overview/>

    <!-- CTA Section -->
    <CTA/>
  </div>
</template>

<script setup lang="ts">
import Overview from './Overview.vue';
import CTA from './CTA.vue';

defineEmits<{
  navigate: [page: string];
}>();
</script>