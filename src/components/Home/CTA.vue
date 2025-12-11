<template>
    <section class="py-8 sm:py-12 md:py-16 bg-blue-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl">Dapatkan Penawaran Terbaik</h2>
        <p class="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl">
          Daftar newsletter kami dan dapatkan diskon hingga 50%
        </p>
        <div class="flex flex-col rounded-md sm:flex-row gap-3 sm:gap-4 w-3/4 mx-auto">
          <input
            v-model="email"
            type="email"
            placeholder="Masukkan email Anda"
            class="flex-1 bg-white px-3 py-2 sm:px-4 rounded-md text-gray-900 text-sm sm:text-base"
          />
          <button @click="handleSubscribe" class="px-4 py-2 sm:px-6 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base">
            Subscribe
          </button>
        </div>

        <!-- Success Alert -->
        <div 
          v-if="showSuccessAlert"
          class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span>{{ alertMessage }}</span>
        </div>

        <!-- Error Alert -->
        <div 
          v-if="showErrorAlert"
          class="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          <span>{{ alertMessage }}</span>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      showSuccessAlert: false,
      showErrorAlert: false,
      alertMessage: ''
    }
  },
  methods: {
    handleSubscribe() {
      if (this.email) {
        this.alertMessage = `Terima kasih telah berlangganan newsletter kami!`;
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 3000);
        this.email = '';
      } else {
        this.alertMessage = 'Silakan masukkan email Anda terlebih dahulu';
        this.showErrorAlert = true;
        setTimeout(() => {
          this.showErrorAlert = false;
        }, 3000);
      }
    }
  }
}
</script>