<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <Hero/>

    <!-- Contact Section - Two Columns -->
    <section class="px-3 py-12 md:py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          
          <!-- Left Column - Google Maps -->
          <div class="h-full">
            <div class="bg-white rounded-xl shadow-md overflow-hidden h-[450px] lg:h-full min-h-[450px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249.30392125495618!2d116.84385214235999!3d-1.2540167118130108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1763088998024!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-full"
              ></iframe>
            </div>
          </div>

          <!-- Right Column - Contact Card -->
          <div class="h-full">
            <div class="bg-white rounded-xl shadow-md p-8 lg:p-10 h-full flex flex-col justify-center">
              <!-- Title -->
              <div class="mb-8">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Get In Touch</h2>
                <p class="text-blue-600 font-medium text-lg">We're here to help you.</p>
              </div>

              <!-- Description -->
              <p class="text-gray-600 mb-8 leading-relaxed">
                KemoySupply menyediakan berbagai produk kebutuhan dengan proses pemesanan yang mudah dan pelayanan yang cepat. Hubungi kami jika Anda membutuhkan bantuan atau informasi lebih lanjut.
              </p>

              <!-- Contact Information Blocks -->
              <div class="space-y-6 ">
                
                <!-- Customer Support -->
                <div class="flex items-start gap-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-800 mb-1">Customer Support</h3>
                    <a class="text-blue-600 font-medium text-lg hover:underline">
                      +62 895-1111-2222
                    </a>
                  </div>
                </div>

                <!-- Email Assistance -->
                <div class="flex items-start gap-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-800 mb-1">Email Assistance</h3>
                    <a class="text-purple-600 font-medium text-lg hover:underline">
                      support@ kemoysupply.com
                    </a>
                  </div>
                </div>

                <!-- Store Location -->
                <div class="flex items-start gap-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-800 mb-1">Store Location</h3>
                    <p class="text-gray-600 mb-2">
                      Jl. D.I Panjaitan No.7, Gunungsari Ulu, Kec. Balikpapan Tengah, Kota Balikpapan, Kalimantan Timur 76113
                    </p>
                    <a 
                      href="https://maps.app.goo.gl/dFrUgpfE8b7G8Csp9" 
                      target="_blank" 
                      class="text-sm text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Lihat di Google Maps
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <CTA/>
  </div>
</template>

<script setup>
import Hero from './Hero.vue';
import CTA from './CTA.vue';
</script>

<style scoped>
iframe {
  min-height: 450px;
}

@media (min-width: 1024px) {
  iframe {
    min-height: 100%;
  }
}
</style>
