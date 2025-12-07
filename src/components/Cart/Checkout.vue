<template>
  <div v-if="orderComplete" class="md:min-h-screen py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto text-center bg-white rounded-lg border p-12">
        <svg class="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h2 class="mb-2">Pesanan Berhasil!</h2>
        <p class="text-gray-600 mb-2">
          Terima kasih telah berbelanja di KemoySupply
        </p>
        <p class="text-sm text-gray-500 mb-6">
          Nomor pesanan: #SH{{ orderNumber }}
        </p>
        <div class="space-y-3">
          <button
            class="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            @click="$router.push('/profil')"
          >
            Lihat Pesanan
          </button>
          <button
            class="w-full px-6 py-2 border rounded-md hover:bg-gray-50 transition-colors"
            @click="$router.push('/')"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen py-8">
    <div class="container mx-auto px-4">
      <h1 class="mb-8">Checkout</h1>

      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Form Section -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Shipping Address -->
            <div class="bg-white rounded-lg border p-6">
              <h3 class="mb-4">Alamat Pengiriman</h3>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm mb-1">Nama Depan</label>
                    <input
                      id="firstName"
                      v-model="form.firstName"
                      type="text"
                      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm mb-1">Nama Belakang</label>
                    <input
                      id="lastName"
                      v-model="form.lastName"
                      type="text"
                      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm mb-1">Email</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label for="phone" class="block text-sm mb-1">Nomor Telepon</label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label for="address" class="block text-sm mb-1">Alamat Lengkap</label>
                  <input
                    id="address"
                    v-model="form.address"
                    type="text"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label for="city" class="block text-sm mb-1">Kota</label>
                    <input
                      id="city"
                      v-model="form.city"
                      type="text"
                      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label for="province" class="block text-sm mb-1">Provinsi</label>
                    <input
                      id="province"
                      v-model="form.province"
                      type="text"
                      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label for="postalCode" class="block text-sm mb-1">Kode Pos</label>
                    <input
                      id="postalCode"
                      v-model="form.postalCode"
                      type="text"
                      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-white rounded-lg border p-6">
              <h3 class="mb-4">Metode Pembayaran</h3>
              <div class="space-y-3">
                <label class="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="credit-card"
                    class="w-4 h-4 text-blue-600"
                  />
                  <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                  <div class="flex-1">
                    <span>Kartu Kredit/Debit</span>
                  </div>
                </label>

                <label class="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="e-wallet"
                    class="w-4 h-4 text-blue-600"
                  />
                  <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                  <div class="flex-1">
                    <span>E-Wallet (GoPay, OVO, Dana)</span>
                  </div>
                </label>

                <label class="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="bank-transfer"
                    class="w-4 h-4 text-blue-600"
                  />
                  <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <div class="flex-1">
                    <span>Transfer Bank</span>
                  </div>
                </label>
              </div>

              <div v-if="paymentMethod === 'credit-card'" class="mt-4 space-y-4">
                <div>
                  <label for="cardNumber" class="block text-sm mb-1">Nomor Kartu</label>
                  <input
                    id="cardNumber"
                    v-model="form.cardNumber"
                    type="text"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="expiry" class="block text-sm mb-1">Tanggal Kadaluarsa</label>
                    <input
                      id="expiry"
                      v-model="form.expiry"
                      type="text"
                      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label for="cvv" class="block text-sm mb-1">CVV</label>
                    <input
                      id="cvv"
                      v-model="form.cvv"
                      type="text"
                      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg border p-6 sticky top-20">
              <h3 class="mb-4">Ringkasan Pesanan</h3>

              <!-- Products -->
              <div class="space-y-3 mb-4">
                <div
                  v-for="item in cartItems"
                  :key="item.product.id"
                  class="flex justify-between text-sm"
                >
                  <span class="text-gray-600">
                    {{ item.product.name }} x{{ item.quantity }}
                  </span>
                  <span>{{ formatPrice(item.product.price * item.quantity) }}</span>
                </div>
              </div>

              <div class="border-t my-4"></div>

              <!-- Totals -->
              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Subtotal</span>
                  <span>{{ formatPrice(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Ongkir</span>
                  <span :class="shipping === 0 ? 'text-green-600' : ''">
                    {{ shipping === 0 ? 'GRATIS' : formatPrice(shipping) }}
                  </span>
                </div>
              </div>

              <div class="border-t my-4"></div>

              <div class="flex justify-between mb-6">
                <span>Total</span>
                <span class="text-blue-600">{{ formatPrice(total) }}</span>
              </div>

              <button
                type="submit"
                class="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                :disabled="isProcessing"
              >
                {{ isProcessing ? 'Memproses...' : 'Bayar Sekarang' }}
              </button>

              <p class="text-xs text-gray-500 mt-4 text-center">
                Dengan melakukan pembayaran, Anda menyetujui syarat dan ketentuan kami
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  cartItems: {
    type: Array,
    required: true
  }
});

const paymentMethod = ref('credit-card');
const isProcessing = ref(false);
const orderComplete = ref(false);
const orderNumber = ref('');

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
});

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

const handleSubmit = () => {
  isProcessing.value = true;
  
  // Simulate payment processing
  setTimeout(() => {
    isProcessing.value = false;
    orderComplete.value = true;
    orderNumber.value = Math.random().toString(36).substr(2, 9).toUpperCase();
  }, 2000);
};
</script>
