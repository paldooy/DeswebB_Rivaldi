import { createRouter, createWebHistory } from 'vue-router';
import Hero from '../components/Home/Hero.vue';
import Contact from '../components/Contact/Contact.vue';
import Cart from '../components/Cart/Cart.vue';
import Checkout from '../components/Cart/Checkout.vue';
import ProductList from '../components/Product/ProductList.vue';
import ProductDetail from '../components/Product/ProductDetail.vue';
import Profil from '@/components/Profil/Profil.vue';
import Wishlist from '@/components/Wishlist/Wishlist.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Hero,
    meta: { title: 'Home - KemoySupply' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact - KemoySupply' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { title: 'Cart - KemoySupply' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { title: 'Checkout - KemoySupply' }
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductList,
    meta: { title: 'Products - KemoySupply' }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { title: 'Product Detail - KemoySupply' },
    props: route => ({ productId: Number(route.params.id) })
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
    meta: { title: 'Profil - KemoySupply'},
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
    meta: { title: 'Wishlist - KemoySupply' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'KemoySupply';
  next();
});

export default router;
