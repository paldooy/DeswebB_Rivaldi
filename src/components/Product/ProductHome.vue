<template>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 p-3 lg:p-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border flex flex-col"
        >
          <router-link :to="`/products/${product.id}`" class="grow flex flex-col">
            <div class="aspect-square relative overflow-hidden">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <span
                v-if="product.stock < 10"
                class="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded"
              >
                Stok Terbatas
              </span>
            </div>
            <div class="p-3 sm:p-4 grow">
              <p class="text-xs sm:text-sm text-gray-500 mb-1">{{ product.category }}</p>
              <h3 class="mb-2 line-clamp-2 text-sm sm:text-base">{{ product.name }}</h3>
              
              <!-- Rating -->
              <div class="flex items-center gap-1 mb-2">
                <svg class="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-xs sm:text-sm">{{ product.rating }}</span>
                <span class="text-xs sm:text-sm text-gray-400">({{ product.reviews }})</span>
              </div>

              <!-- Price -->
              <div class="flex items-center gap-2">
                <span class="text-blue-600 text-sm sm:text-base font-medium">{{ formatPrice(product.price) }}</span>
              </div>
            </div>
          </router-link>

          <div class="p-3 sm:p-4 pt-0 mt-auto">
            <router-link
              :to="`/products/${product.id}`"
              class="block w-full px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center text-sm sm:text-base"
            >
              Lihat Detail
            </router-link>
          </div>
        </div>
      </div>
</template>


<script setup>
import { ref, computed } from 'vue';

const products = [
  {
    id: 1,
    name: "Kemoys Formal White Shirt",
    price: 275000,
    image: "images/produk/Kemeja Putih.png",
    category: "Kemeja",
    description: "Kemeja formal oxford putih premium dengan detail jahitan rapi. Material katun berkualitas tinggi yang nyaman dan breathable. Perfect untuk acara formal dan business meetings. Tersedia ukuran S, M, L, XL, XXL.",
    rating: 4.8,
    reviews: 245,
    stock: 50
  },
  {
    id: 2,
    name: "Kemoys Chino Khaki Classic",
    price: 325000,
    image: "images/produk/Chino Khaki.png",
    category: "Celana",
    description: "Celana chino warna khaki dengan potongan classic yang versatile. Material twill cotton yang durable dan comfortable. Perfect match dengan berbagai jenis kemeja. Regular fit dengan detail pocket yang fungsional.",
    rating: 4.7,
    reviews: 267,
    stock: 72
  },
  {
    id: 3,
    name: "Light Blue Kemoys Loose Jeans",
    price: 395000,
    image: "images/produk/Loose Jeans.png",
    category: "Celana",
    description: "Celana jeans dark blue dengan potongan straight cut yang timeless. Premium selvedge denim dari raw material terbaik. Cocok untuk gaya casual maupun smart casual. Durable construction dengan riveted pocket.",
    rating: 4.6,
    reviews: 341,
    stock: 80
  },
  {
    id: 4,
    name: "Kemoys Premium Jogger Pants",
    price: 315000,
    image: "images/produk/Jogger Pants.png",
    category: "Celana",
    description: "Celana jogger hitam dengan material premium cotton blend. Elastic waistband dan ankle cuffs untuk fit yang sempurna. Sporty yet stylish untuk athleisure look. Side pockets dengan zipper untuk keamanan barang.",
    rating: 4.8,
    reviews: 412,
    stock: 68
  }
];

const selectedCategory = ref('all');
const sortBy = ref('default');

const categories = computed(() => {
  return ['all', ...Array.from(new Set(products.map(p => p.category)))];
});

const filteredProducts = computed(() => {
  let filtered = selectedCategory.value === 'all'
    ? [...products]
    : products.filter(p => p.category === selectedCategory.value);

  // Sort products
  if (sortBy.value === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy.value === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
</script>
