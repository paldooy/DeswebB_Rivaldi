<template>
  <div class="min-h-screen py-4 sm:py-6 md:py-8" style="min-height: calc(100vh - 72px - 300px);">
    <div class="container mx-auto px-3 sm:px-4">
      <h1 class="mb-4 sm:mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl">Profil Saya</h1>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg border p-4 sm:p-5 md:p-6">
            <!-- User Info -->
            <div class="text-center mb-4 sm:mb-5 md:mb-6">
              <div class="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg class="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 class="mb-1 text-base sm:text-lg">{{ user.name }}</h3>
              <p class="text-xs sm:text-sm text-gray-500">{{ user.email }}</p>
              <p class="text-xs text-gray-400 mt-1 sm:mt-2">Member sejak {{ user.memberSince }}</p>
            </div>

            <div class="border-t my-3 sm:my-4"></div>

            <!-- Menu -->
            <nav class="space-y-1 sm:space-y-2">
              <button @click="activeTab = 'account'" class="w-full px-3 py-2 sm:px-4 text-left hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2 text-sm sm:text-base">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Informasi Akun
              </button>
              <button @click="activeTab = 'orders'" class="w-full px-3 py-2 sm:px-4 text-left hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2 text-sm sm:text-base">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                Pesanan Saya
              </button>
              <button @click="activeTab = 'address'" class="w-full px-3 py-2 sm:px-4 text-left hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2 text-sm sm:text-base">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Alamat
              </button>
              <router-link to="/wishlist" class="w-full px-3 py-2 sm:px-4 text-left hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2 text-sm sm:text-base">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                Wishlist
              </router-link>
            </nav>

            <div class="border-t my-3 sm:my-4"></div>

            <button class="w-full px-3 py-2 sm:px-4 text-left text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2 text-sm sm:text-base">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Keluar
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-lg border">
            <!-- Tabs -->
            <div class="border-b overflow-x-auto">
              <div class="flex min-w-max">
                <button
                  :class="[
                    'px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 border-b-2 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap',
                    activeTab === 'orders'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent hover:border-gray-300'
                  ]"
                  @click="activeTab = 'orders'"
                >
                  Pesanan
                </button>
                <button
                  :class="[
                    'px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 border-b-2 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap',
                    activeTab === 'account'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent hover:border-gray-300'
                  ]"
                  @click="activeTab = 'account'"
                >
                  Informasi Akun
                </button>
                <button
                  :class="[
                    'px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 border-b-2 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap',
                    activeTab === 'address'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent hover:border-gray-300'
                  ]"
                  @click="activeTab = 'address'"
                >
                  Alamat
                </button>
              </div>
            </div>

            <!-- Orders Tab -->
            <div v-if="activeTab === 'orders'" class="p-3 sm:p-4 md:p-6">
              <h3 class="mb-3 sm:mb-4 text-base sm:text-lg">Riwayat Pesanan</h3>
              <div class="space-y-3 sm:space-y-4">
                <div
                  v-for="order in orders"
                  :key="order.id"
                  class="border rounded-lg p-3 sm:p-4"
                >
                  <div class="flex flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="text-sm sm:text-base">{{ order.id }}</span>
                        <span
                          :class="[
                            'text-xs px-2 py-1 rounded',
                            order.status === 'Sedang Dikirim'
                              ? 'bg-blue-500 text-white'
                              : 'bg-green-500 text-white'
                          ]"
                        >
                          {{ order.status }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-500">
                        {{ order.date }} • {{ order.items }} item
                      </p>
                    </div>
                    <div class="flex items-center gap-3 sm:gap-4">
                      <div class="text-right">
                        <p class="text-xs sm:text-sm text-gray-500">Total</p>
                        <p class="text-sm sm:text-base text-blue-600 font-medium">
                          {{ formatPrice(order.total) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="orders.length === 0" class="text-center py-8 sm:py-10 md:py-12">
                <svg class="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-300 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                <p class="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">Belum ada pesanan</p>
                <router-link
                to="/products"
                  class="inline-block px-4 py-2 sm:px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base">
                  Mulai Belanja
                </router-link>
              </div>
            </div>

            <!-- Account Tab -->
            <div v-if="activeTab === 'account'" class="p-3 sm:p-4 md:p-6">
              <h3 class="mb-3 sm:mb-4 text-base sm:text-lg">Informasi Akun</h3>
              <div class="space-y-3 sm:space-y-4">
                <div>
                  <label class="text-xs sm:text-sm text-gray-500">Nama Lengkap</label>
                  <p class="text-sm sm:text-base">{{ user.name }}</p>
                </div>
                <div class="border-t"></div>
                <div>
                  <label class="text-xs sm:text-sm text-gray-500">Email</label>
                  <p class="text-sm sm:text-base">{{ user.email }}</p>
                </div>
                <div class="border-t"></div>
                <div>
                  <label class="text-xs sm:text-sm text-gray-500">Nomor Telepon</label>
                  <p class="text-sm sm:text-base">{{ user.phone }}</p>
                </div>
                <div class="border-t"></div>
                <div>
                  <label class="text-xs sm:text-sm text-gray-500">Member Sejak</label>
                  <p class="text-sm sm:text-base">{{ user.memberSince }}</p>
                </div>
              </div>
            </div>

            <!-- Address Tab -->
            <div v-if="activeTab === 'address'" class="p-3 sm:p-4 md:p-6">
              <h3 class="mb-3 sm:mb-4 text-base sm:text-lg">Alamat Tersimpan</h3>
              <div class="space-y-3 sm:space-y-4">
                <div class="border rounded-lg p-3 sm:p-4">
                  <div class="flex justify-between items-start mb-2">
                    <span class="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-600 text-xs rounded">Utama</span>
                  </div>
                  <h3 class="mb-2 text-sm sm:text-base font-medium">Rumah</h3>
                  <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Jl. D.I. Panjaitan N0.03<br>
                    Kelurahan Sumber Rejo, Kecamatan Balikpapan Tengah<br>
                    Balikpapan, Kalimantan Timur<br>
                    76124<br>
                    {{ user.phone }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('orders');

// Mock user data
const user = {
  name: "Muhammad Rivaldi",
  email: "didii@example.com",
  phone: "+62 812-3456-7890",
  memberSince: "Januari 2024"
};

// Mock orders
const orders = [
  {
    id: "#SH123456",
    date: "10 Okt 2025",
    status: "Sedang Dikirim",
    total: 395000,
    items: 2
  },
  {
    id: "#SH123455",
    date: "5 Okt 2025",
    status: "Selesai",
    total: 150000,
    items: 1
  },
  {
    id: "#SH123454",
    date: "28 Sep 2025",
    status: "Selesai",
    total: 450000,
    items: 1
  }
];

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
</script>
