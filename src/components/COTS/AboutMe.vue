<template>
    <div class="grid grid-rows-2 w-full md:h-full border-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 w-full border-2 p-6 xl:p-12">
            <div class="border-2 text-center md:text-start ">
                <h1 class="text-lg">
                    Muhammad Rivaldi
                </h1>
                <div>
                    <h2 class="flex text-md gap-6 justify-center md:justify-start">
                        <span>11231062</span>
                        <span>Informatika</span>
                        <span>ITK</span>
                    </h2>
                </div>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                
            </div>
            <img src="/logo.png" alt="Foto Profil"
            class="border-2 invisible md:visible">
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4 p-3 lg:p-6">
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
                    
                </div>
                </router-link>

                
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
    name: "FOTOGRAFI",
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
    name: "STREET WEAR",
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
    name: "BAKING",
    price: 395000,
    image: "/images/produk/Loose Jeans.png",
    category: "Celana",
    description: "Celana jeans dark blue dengan potongan straight cut yang timeless. Premium selvedge denim dari raw material terbaik. Cocok untuk gaya casual maupun smart casual. Durable construction dengan riveted pocket.",
    rating: 4.6,
    reviews: 341,
    stock: 80
  },
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