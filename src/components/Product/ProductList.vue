<template>
  <div class="min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2">Semua Produk</h1>
        <p class="text-gray-600">Temukan produk yang Anda cari</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <div class="flex-1">
          <label class="text-sm text-gray-600 mb-2 block">Kategori</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              :class="[
                'px-4 py-2 rounded-md text-sm transition-colors',
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'border hover:bg-gray-50'
              ]"
              @click="selectedCategory = cat"
            >
              {{ cat === 'all' ? 'Semua' : cat }}
            </button>
          </div>
        </div>

        <div class="w-full md:w-48 relative">
          <label class="text-sm text-gray-600 mb-2 block">Urutkan</label>
          <button
            @click="showSortDropdown = !showSortDropdown"
            class="w-full px-3 py-2 border rounded-md hover:bg-gray-50 transition-colors text-left flex items-center justify-between text-sm"
          >
            <span>{{ getSortLabel(sortBy) }}</span>
            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          
          <!-- Custom Dropdown Menu -->
          <div
            v-if="showSortDropdown"
            class="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
          >
            <button
              v-for="option in sortOptions"
              :key="option.value"
              @click="selectSort(option.value)"
              :class="[
                'w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors text-sm flex items-center gap-2',
                sortBy === option.value ? 'bg-blue-50 text-blue-600' : ''
              ]"
            >
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 p-3 lg:p-6">
      <div
        v-for="product in displayedProducts"
        :key="product.id"
        class="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border relative flex flex-col"
      >
        <!-- Wishlist Button -->
        <button
          @click.prevent="toggleWishlist(product)"
          :class="[
            'absolute top-2 right-2 z-10 p-2 rounded-full shadow-md transition-colors',
            isProductInWishlist(product.id) 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white hover:bg-gray-100'
          ]"
          :title="isProductInWishlist(product.id) ? 'Hapus dari wishlist' : 'Tambah ke wishlist'"
        >
          <svg class="h-5 w-5" :fill="isProductInWishlist(product.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        <router-link
          :to="`/products/${product.id}`"
          class="grow flex flex-col"
        >
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
          <div class="p-4 grow">
            <p class="text-sm text-gray-500 mb-1">{{ product.category }}</p>
            <h3 class="mb-2 line-clamp-2">{{ product.name }}</h3>
            
            <!-- Rating -->
            <div class="flex items-center gap-1 mb-2">
              <svg class="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="text-sm">{{ product.rating }}</span>
              <span class="text-sm text-gray-400">({{ product.reviews }})</span>
            </div>

            <!-- Price -->
            <div class="flex items-center gap-2">
              <span class="text-blue-600">{{ formatPrice(product.price) }}</span>
            </div>
          </div>
        </router-link>

        <div class="px-4 pb-4 mt-auto">
          <router-link
            :to="`/products/${product.id}`"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors block text-center"
          >
            Lihat Detail
          </router-link>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4">
      <!-- Load More Button -->
      <div v-if="hasMore" class="text-center mt-8">
        <button
          @click="loadMore"
          class="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Lihat Lebih Banyak
        </button>
      </div>

      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <p class="text-gray-500">Tidak ada produk ditemukan</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isInWishlist: {
    type: Function,
    default: null
  }
});

const emit = defineEmits(['addToWishlist', 'removeFromWishlist']);

const products = [
  {
    id: 1,
    name: "Kemoys Formal White Shirt",
    price: 275000,
    image: "/images/produk/Kemeja Putih.png",
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
    image: "/images/produk/Chino Khaki.png",
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
    image: "/images/produk/Loose Jeans.png",
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
    image: "/images/produk/Jogger Pants.png",
    category: "Celana",
    description: "Celana jogger hitam dengan material premium cotton blend. Elastic waistband dan ankle cuffs untuk fit yang sempurna. Sporty yet stylish untuk athleisure look. Side pockets dengan zipper untuk keamanan barang.",
    rating: 4.8,
    reviews: 412,
    stock: 68
  },
  {
    id: 5,
    name: "Kemoys Flannel Gray Check Shirt",
    price: 235000,
    image: "/images/produk/Flannel.png",
    category: "Kemeja",
    description: "Kemeja flanel dengan motif kotak merah yang stylish. Material flannel cotton yang hangat dan nyaman. Perfect untuk gaya casual dan outdoor activities. Slim fit dengan button-down collar.",
    rating: 4.7,
    reviews: 189,
    stock: 45
  },
  {
    id: 6,
    name: "Kemoys Premium Black T-Shirt",
    price: 125000,
    image: "/images/produk/Kaos Hitam.png",
    category: "Kaos",
    description: "Kaos polos hitam dengan material cotton combed 30s. Sablon tidak mudah luntur dan tetap nyaman sepanjang hari. Perfect untuk daily wear atau layering. Regular fit dengan jahitan rapi.",
    rating: 4.9,
    reviews: 532,
    stock: 120
  },
  {
    id: 7,
    name: "Kemoys Guns & Rookies Baseball Cap",
    price: 95000,
    image: "/images/produk/Baseball Cap.png",
    category: "Topi",
    description: "Topi baseball cap warna navy dengan material cotton twill. Adjustable strap untuk fit yang sempurna. Perfect untuk melindungi dari sinar matahari. Curved brim dengan bordir logo premium.",
    rating: 4.5,
    reviews: 178,
    stock: 85
  },
  {
    id: 8,
    name: "Kemoys Formal Black Shirt",
    price: 295000,
    image: "/images/produk/Kemeja Hitam.png",
    category: "Kemeja",
    description: "Kemeja denim biru muda dengan washed effect yang trendy. Material denim cotton yang soft dan breathable. Versatile untuk berbagai gaya. Classic fit dengan chest pocket.",
    rating: 4.6,
    reviews: 213,
    stock: 55
  },
  {
    id: 9,
    name: "Kemoys Cargo Cream Pants",
    price: 345000,
    image: "/images/produk/Cargo Cream.png",
    category: "Celana",
    description: "Celana cargo warna cream dengan multiple pockets yang fungsional. Material cotton canvas yang durable. Perfect untuk outdoor dan street style. Relaxed fit dengan adjustable hem.",
    rating: 4.7,
    reviews: 298,
    stock: 62
  },
  {
    id: 10,
    name: "Kemoys V-Neck Shirt",
    price: 135000,
    image: "/images/produk/Kemeja V-Neck.png",
    category: "Kemeja",
    description: "Kemeja V-neck abu-abu dengan material cotton combed premium. Soft texture dan breathable untuk kenyamanan maksimal. Cocok untuk casual dan semi-formal. Slim fit dengan cutting modern.",
    rating: 4.8,
    reviews: 445,
    stock: 95
  },
  {
    id: 11,
    name: "Kemoys Oversized T-Shirt", 
    price: 115000,
    image: "/images/produk/Kaos Oversize.png",
    category: "Kaos",
    description: "Kaos oversize warna cream dengan cutting modern. Material cotton combed 24s yang premium dan adem. Perfect untuk streetwear dan layering. Drop shoulder design dengan longline cut.",
    rating: 4.6,
    reviews: 156,
    stock: 70
  },
  {
    id: 12,
    name: "Kemoys Denim Cap",
    price: 315000,
    image: "/images/produk/Denim Cap.png",
    category: "Topi",
    description: "Topi denim warna biru tua dengan material cotton denim. Adjustable strap untuk fit yang nyaman. Perfect untuk gaya kasual dan streetwear. Curved brim dengan detail jahitan kontras.",
    rating: 4.7,
    reviews: 201,
    stock: 48
  }
];

const selectedCategory = ref('all');
const sortBy = ref('default');
const itemsPerLoad = ref(8); // 2 baris x 4 kolom = 8 produk
const displayCount = ref(8);
const showSortDropdown = ref(false);

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Termurah'},
  { value: 'price-high', label: 'Termahal'},
  { value: 'rating', label: 'Rating' }
];

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

const displayedProducts = computed(() => {
  return filteredProducts.value.slice(0, displayCount.value);
});

const hasMore = computed(() => {
  return displayCount.value < filteredProducts.value.length;
});

const loadMore = () => {
  displayCount.value += itemsPerLoad.value;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const isProductInWishlist = (productId) => {
  return props.isInWishlist ? props.isInWishlist(productId) : false;
};

const toggleWishlist = (product) => {
  if (isProductInWishlist(product.id)) {
    emit('removeFromWishlist', product.id);
  } else {
    emit('addToWishlist', product);
  }
};

const getSortLabel = (value) => {
  const option = sortOptions.find(opt => opt.value === value);
  return option ? option.label : 'Default';
};

const selectSort = (value) => {
  sortBy.value = value;
  showSortDropdown.value = false;
};
</script>
