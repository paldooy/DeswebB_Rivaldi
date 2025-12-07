<template>
  <div class="md:min-h-screen py-8 bg-gray-50" style="min-height: calc(100vh - 72px - 300px);">
    <div class="container mx-auto flex flex-col justify-center px-4" style="min-height: calc(100vh - 72px - 300px);">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2">Wishlist Saya</h1>
        <p class="text-gray-600">{{ wishlistItems.length }} produk dalam wishlist</p>
      </div>

      <!-- Empty State -->
      <div v-if="wishlistItems.length === 0" class="min-w-1/2 min-h-1/2 flex flex-col items-center justify-center text-center py-16 rounded-lg border">
        <svg class="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        <h2 class="mb-4 text-gray-600">Wishlist Kosong</h2>
        <p class="text-gray-500 mb-6">Belum ada produk yang ditambahkan ke wishlist</p>
        <router-link
          to="/products"
          class="inline-block px-6 py-3 mb-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Lihat Produk
        </router-link>
      </div>

      <!-- Wishlist Grid -->
      <div v-else class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <div
          v-for="item in wishlistItems"
          :key="item.id"
          class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative flex flex-col"
        >
          <!-- Remove Button -->
          <button
            @click="removeFromWishlist(item.id)"
            class="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
            title="Hapus dari wishlist"
          >
            <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Product Image -->
          <router-link :to="`/products/${item.id}`" class="grow flex flex-col">
            <div class="aspect-square relative overflow-hidden bg-gray-100">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Product Info -->
            <div class="p-4 grow">
              <p class="text-sm text-gray-500 mb-1">{{ item.category }}</p>
              <h3 class="mb-2 line-clamp-2 hover:text-blue-600 transition-colors">{{ item.name }}</h3>
              
              <!-- Rating -->
              <div class="flex items-center gap-1">
                <div class="flex items-center">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    :class="[
                      'h-4 w-4',
                      i <= Math.floor(item.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    ]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span class="text-sm text-gray-600">{{ item.rating }}</span>
              </div>
            </div>
          </router-link>

          <!-- Actions -->
          <div class="p-4 pt-0 mt-auto">
            <div class="flex gap-2">
              <button
                @click="addToCart(item)"
                :disabled="item.stock === 0"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  wishlistItems: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['removeFromWishlist', 'addToCart']);

const removeFromWishlist = (productId) => {
  emit('removeFromWishlist', productId);
};

const addToCart = (product) => {
  emit('addToCart', product, 1);
  // Optionally remove from wishlist after adding to cart
  // emit('removeFromWishlist', product.id);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
</script>
