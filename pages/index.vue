<template>
  <main class="home-page">
    <main-container>
      <gallery :items="items" />
    </main-container>
  </main>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#app";

import { useHead } from "@vueuse/head";
import { useProductsStore } from "~/store/products";
import { storeToRefs } from "pinia";
import { ref } from "@vue/reactivity";
import { STATUS_APPROVED } from "~/types/constants";
import { useSettingsGalleryStore } from "~/store/gallerySettings";
import MainContainer from "~/components/Layout/MainContainer.vue";
import { useAuthStore } from "~~/store/auth";
import { useUserStore } from "~~/store/user";
import { useCategoriesStore } from "~~/store/categories";
import { useTextsStore } from "~~/store/texts";
const title = ref("");
const description = ref("");
const products = useProductsStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const { items } = storeToRefs(products);
const gallerySettings = useSettingsGalleryStore();
const { order_by } = storeToRefs(gallerySettings);
const autoStore = useAuthStore();
const textsStore = useTextsStore();
const config = useRuntimeConfig();
const categoriesStore = useCategoriesStore();
onMounted(async () => {
  products.updateFilter({
    categories: null,
    status: STATUS_APPROVED,
    user_id: null,
    order_by,
    username: null,
    author: null,
  });

  await autoStore.rememberToken();
  await categoriesStore.fetch();
  await textsStore.fetchAll();
  await products.fetchAll();
  await userStore.fetch();
});

useHead({
  title: title,
  meta: [
    { name: "description", content: description },
    { name: "content-type", content: "text/html; charset=UTF-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
  ],
  // script: [
  //   {
  //     src: `https://maps.googleapis.com/maps/api/js?key=${config.public.GOOGLE_MAP_API_KEY}=places`,
  //   },
  // ],
});
</script>
