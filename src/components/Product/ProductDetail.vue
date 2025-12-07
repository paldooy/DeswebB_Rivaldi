<template>
  <div v-if="!product" class="container mx-auto px-4 py-16 text-center">
    <h2 class="mb-4">Produk tidak ditemukan</h2>
    <router-link
      to="/products"
      class="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      Kembali ke Produk
    </router-link>
  </div>

  <div v-else class="min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- Breadcrumb -->
      <div class="mb-6 text-sm text-gray-600">
        <router-link to="/" class="cursor-pointer hover:text-blue-600">
          Home
        </router-link>
        {{ ' / ' }}
        <router-link to="/products" class="cursor-pointer hover:text-blue-600">
          Produk
        </router-link>
        {{ ' / ' }}
        <router-link to="/products" class="cursor-pointer hover:text-blue-600">
          {{ product.category }}
        </router-link>
        {{ ' / ' }}
        <span>{{ product.name }}</span>
      </div>

      <!-- Product Detail -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Image -->
        <div>
          <div class="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Info -->
        <div>
          <span class="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded mb-2">
            {{ product.category }}
          </span>
          <h1 class="mb-4">{{ product.name }}</h1>

          <!-- Rating -->
          <div class="flex items-center gap-2 mb-4">
            <div class="flex items-center">
              <svg
                v-for="i in 5"
                :key="i"
                :class="[
                  'h-5 w-5',
                  i <= Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                ]"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span>{{ product.rating }}</span>
            <span class="text-gray-400">({{ product.reviews }} ulasan)</span>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <div class="flex items-center gap-3">
              <span class="text-3xl text-blue-600">{{ formatPrice(product.price) }}</span>
            </div>
          </div>

          <div class="border-t my-6"></div>

          <!-- Description -->
          <div class="mb-6">
            <h3 class="mb-2">Deskripsi Produk</h3>
            <p class="text-gray-600">{{ product.description }}</p>
          </div>

          <!-- Stock -->
          <div class="mb-6">
            <p class="text-sm text-gray-600">
              Stok:
              <span :class="product.stock > 10 ? 'text-green-600' : 'text-orange-600'">
                {{ product.stock }} tersedia
              </span>
            </p>
          </div>

          <!-- Quantity -->
          <div class="mb-6">
            <label class="block mb-2">Jumlah</label>
            <div class="flex items-center gap-3">
              <button
                class="p-2 border rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                :disabled="quantity <= 1"
                @click="quantity--"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                </svg>
              </button>
              <span class="w-12 text-center">{{ quantity }}</span>
              <button
                class="p-2 border rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                :disabled="quantity >= product.stock"
                @click="quantity++"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              @click="handleAddToCart"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Tambah ke Keranjang
            </button>
            <div class="flex flex-row gap-3">
              <button 
                @click="handleToggleWishlist"
                :class="[
                  'w-full px-6 py-3 border rounded-md transition-colors flex items-center justify-center gap-2',
                  inWishlist ? 'bg-red-50 border-red-500 text-red-600 hover:bg-red-100' : 'hover:bg-gray-50'
                ]"
                :title="inWishlist ? 'Hapus dari wishlist' : 'Tambah ke wishlist'"
              >
                <svg class="h-5 w-5" :fill="inWishlist ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                {{ inWishlist ? 'Wishlist' : 'Wishlist' }}
              </button>
              <button 
                @click="handleShareProduct"
                class="px-6 py-3 border rounded-md hover:bg-gray-200 transition-colors"
                title="Bagikan produk"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Share Success Alert -->
          <div 
            v-if="showShareAlert"
            class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Link produk berhasil disalin!</span>
          </div>

          <!-- Features -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="border rounded-lg p-4 flex items-center gap-3">
              <div class="bg-blue-100 p-2 rounded">
                <svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
                </svg>
              </div>
              <div>
                <p class="text-sm">Gratis Ongkir</p>
                <p class="text-xs text-gray-500">Min. pembelian 100k</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0">
        <h2 class="mb-6">Produk Terkait</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
          <router-link
            v-for="relatedProduct in displayedRelatedProducts"
            :key="relatedProduct.id"
            :to="`/products/${relatedProduct.id}`"
            class="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border block"
          >
            <div class="aspect-square relative overflow-hidden">
              <img
                :src="relatedProduct.image"
                :alt="relatedProduct.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <p class="text-sm text-gray-500 mb-1">{{ relatedProduct.category }}</p>
              <h3 class="mb-2 line-clamp-2">{{ relatedProduct.name }}</h3>
              <span class="text-blue-600">{{ formatPrice(relatedProduct.price) }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <!-- Load More Button -->
      <div v-if="hasMore" class="text-center mt-8">
        <button
          @click="loadMore"
          class="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Lihat Lebih Banyak
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

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
    description: "Kaos V-neck abu-abu dengan material cotton combed premium. Soft texture dan breathable untuk kenyamanan maksimal. Cocok untuk casual dan semi-formal. Slim fit dengan cutting modern.",
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

const props = defineProps({
  productId: {
    type: Number,
    required: true
  },
  isInWishlist: {
    type: Function,
    default: null
  }
});

const emit = defineEmits(['addToCart', 'addToWishlist', 'removeFromWishlist']);

const quantity = ref(1);
const showShareAlert = ref(false);

const product = computed(() => products.find(p => p.id === props.productId));

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return products.filter(p => p.category === product.value.category && p.id !== product.value.id);
});

const itemsPerLoad = ref(4);
const displayCount = ref(0);

const displayedRelatedProducts = computed(() => {
  if (displayCount.value === 0) return relatedProducts.value.slice(0, 4);
  return relatedProducts.value.slice(0, displayCount.value);
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const handleAddToCart = () => {
  if (product.value) {
    emit('addToCart', product.value, quantity.value);
    quantity.value = 1;
  }
};

const handleToggleWishlist = () => {
  if (product.value) {
    if (inWishlist.value) {
      emit('removeFromWishlist', product.value.id);
    } else {
      emit('addToWishlist', product.value);
    }
  }
};

const inWishlist = computed(() => {
  return props.isInWishlist ? props.isInWishlist(props.productId) : false;
});

const handleShareProduct = async () => {
  try {
    const productUrl = window.location.href;
    await navigator.clipboard.writeText(productUrl);
    
    showShareAlert.value = true;
    setTimeout(() => {
      showShareAlert.value = false;
    }, 3000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const loadMore = () => {
  if (displayCount.value === 0) {
    displayCount.value = 4 + itemsPerLoad.value;
  } else {
    displayCount.value = Math.min(
      displayCount.value + itemsPerLoad.value,
      relatedProducts.value.length
    );
  }
};

const hasMore = computed(() => {
  const initial = displayCount.value === 0 ? 4 : displayCount.value;
  return initial < relatedProducts.value.length;
});

watch(
  () => props.productId,
  () => {
    displayCount.value = 0; // reset pagination when product changes
  }
);
</script>
