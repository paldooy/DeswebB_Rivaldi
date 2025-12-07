<template>
  <div v-if="cartItems.length === 0" class="min-h-screen py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto text-center bg-white rounded-lg border p-12">
        <svg class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <h2 class="mb-2">Keranjang Kosong</h2>
        <p class="text-gray-600 mb-6">
          Belum ada produk di keranjang Anda
        </p>
        <router-link
          to="/products"
          class="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Mulai Belanja
        </router-link>
      </div>
    </div>
  </div>

  <div v-else class="lg:min-h-screen py-8">
    <div class="container mx-auto px-4">
      <h1 class="mb-8">Keranjang Belanja</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.product.id"
            class="bg-white rounded-lg border p-4"
          >
            <div class="flex gap-4">
              <!-- Image -->
              <div class="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Info -->
              <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="mb-1">{{ item.product.name }}</h3>
                    <p class="text-sm text-gray-500">{{ item.product.category }}</p>
                  </div>
                  <button
                    class="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    @click="emit('removeFromCart', item.product.id)"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <!-- Price -->
                  <div>
                    <span class="text-blue-600">
                      {{ formatPrice(item.product.price) }}
                    </span>
                  </div>

                  <!-- Quantity -->
                  <div class="flex items-center gap-3">
                    <button
                      class="h-8 w-8 border rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center disabled:opacity-50"
                      :disabled="item.quantity <= 1"
                      @click="emit('updateQuantity', item.product.id, item.quantity - 1)"
                    >
                      <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                      </svg>
                    </button>
                    <span class="w-8 text-center">{{ item.quantity }}</span>
                    <button
                      class="h-8 w-8 border rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center disabled:opacity-50"
                      :disabled="item.quantity >= item.product.stock"
                      @click="emit('updateQuantity', item.product.id, item.quantity + 1)"
                    >
                      <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                      </svg>
                    </button>
                  </div>

                  <!-- Subtotal -->
                  <div class="sm:text-right">
                    <span>
                      {{ formatPrice(item.product.price * item.quantity) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg border p-6 sticky top-20">
            <h3 class="mb-4">Ringkasan Belanja</h3>

            <div class="space-y-3 mb-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Ongkir</span>
                <span :class="shipping === 0 ? 'text-green-600' : ''">
                  {{ shipping === 0 ? 'GRATIS' : formatPrice(shipping) }}
                </span>
              </div>
              <p v-if="shipping === 0" class="text-xs text-green-600">
                Selamat! Anda mendapat gratis ongkir
              </p>
            </div>

            <div class="border-t my-4"></div>

            <div class="flex justify-between mb-6">
              <span>Total</span>
              <span class="text-blue-600">{{ formatPrice(total) }}</span>
            </div>

            <router-link
              to="/checkout"
              class="block w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-3 text-center"
            >
              Lanjut ke Pembayaran
            </router-link>

            <router-link
              to="/products"
              class="block w-full px-6 py-2 border rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              Lanjut Belanja
            </router-link>

            <p v-if="subtotal < 100000" class="text-xs text-gray-500 mt-4 text-center">
              Belanja {{ formatPrice(100000 - subtotal) }} lagi untuk gratis ongkir
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['updateQuantity', 'removeFromCart']);

const subtotal = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
});

const shipping = computed(() => {
  return subtotal.value > 100000 ? 0 : 15000;
});

const total = computed(() => {
  return subtotal.value + shipping.value;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
</script>
