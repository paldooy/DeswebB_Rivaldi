<template>
  <header class="sticky top-0 z-50 bg-white border-b">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/">
          <h1 class="text-blue-600 text-xl sm:text-2xl font-bold">KemoySupply</h1>
        </router-link>

        <!-- Search Bar - Hidden on mobile -->
        <div class="hidden md:flex flex-1 max-w-md mx-8">
          <div class="relative w-full">
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Cari produk..."
              class="w-full pl-10 pr-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Desktop Navigation - Hidden on mobile/tablet -->
        <nav class="hidden lg:flex items-center gap-3">
          <router-link
            to="/"
            class="p-2 hover:bg-gray-100 rounded-md transition-colors"
            :class="$route.path === '/' ? 'bg-blue-50 text-blue-600' : ''"
            title="Home"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </router-link>

          <router-link
            to="/aboutme"
            class="p-2 hover:bg-gray-100 rounded-md transition-colors"
            :class="$route.path === '/aboutme' ? 'bg-blue-50 text-blue-600' : ''"
            title="About Me"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
          </router-link>

          <router-link
            to="/products"
            class="p-2 hover:bg-gray-100 rounded-md transition-colors"
            :class="$route.path === '/products' ? 'bg-blue-50 text-blue-600' : ''"
            title="Produk"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </router-link>
          
          <router-link
            to="/contact"
            class="p-2 hover:bg-gray-100 rounded-md transition-colors"
            :class="$route.path === '/contact' ? 'bg-blue-50 text-blue-600' : ''"
            title="Hubungi Kami"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </router-link>
        </nav>

        <!-- Mobile Navigation Icons + Burger -->
        <div class="flex items-center gap-3 mx-3">
          <!-- Wishlist - Desktop only -->
          <router-link
            to="/wishlist"
            class="hidden lg:block relative p-2 hover:bg-gray-100 rounded-md transition-colors"
            :class="$route.path === '/wishlist' ? 'bg-blue-50 text-blue-600' : ''"
            title="Wishlist"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </router-link>

          <!-- Cart - Desktop only -->
          <router-link
            to="/cart"
            class="hidden lg:block relative p-2 hover:bg-gray-100 rounded-md transition-colors"
            :class="$route.path === '/cart' ? 'bg-blue-50 text-blue-600' : ''"
            title="Keranjang Belanja"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span
              v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartItemsCount }}
            </span>
          </router-link>

          <!-- Profile - Desktop only -->
          <router-link
            to="/profil"
            class="hidden lg:block p-2 hover:bg-gray-100 rounded-md transition-colors"
            :class="$route.path === '/profil' ? 'bg-blue-50 text-blue-600' : ''"
            title="Profile"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </router-link>

          <button 
            @click="toggleMobileMenu" 
            class="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors" 
            title="Menu"
          >
            <svg v-if="!isMobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="isMobileMenuOpen" 
        class="lg:hidden border-t py-4 space-y-2"
      >
        <router-link
          to="/"
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
          :class="$route.path === '/' ? 'bg-blue-50 text-blue-600' : ''"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="font-medium">Home</span>
        </router-link>

        <router-link
          to="/products"
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
          :class="$route.path === '/products' ? 'bg-blue-50 text-blue-600' : ''"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span class="font-medium">Produk</span>
        </router-link>

        <router-link
          to="/contact"
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
          :class="$route.path === '/contact' ? 'bg-blue-50 text-blue-600' : ''"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span class="font-medium">Hubungi Kami</span>
        </router-link>

        <router-link
          to="/cart"
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
          :class="$route.path === '/cart' ? 'bg-blue-50 text-blue-600' : ''"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="font-medium">Keranjang</span>
          <span
            v-if="cartItemsCount > 0"
            class="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cartItemsCount }}
          </span>
        </router-link>

        <router-link
          to="/wishlist"
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
          :class="$route.path === '/wishlist' ? 'bg-blue-50 text-blue-600' : ''"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span class="font-medium">Wishlist</span>
        </router-link>

        <router-link
          to="/profil"
          @click="closeMobileMenu"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
          :class="$route.path === '/profil' ? 'bg-blue-50 text-blue-600' : ''"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="font-medium">Profil</span>
        </router-link>
      </div>

      <!-- Mobile Search -->
      <div class="md:hidden pb-4">
        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari produk..."
            class="w-full pl-10 pr-4 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  cartItemsCount: {
    type: Number,
    required: true
  },
  wishlistCount: {
    type: Number,
    default: 0
  }
});

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>
