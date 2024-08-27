<template>
  <nuxt-layout name="site">
    <v-container v-if="shopProduct.find.data">
      <h1>{{ shopProduct.find.data.name }}</h1>
    </v-container>
  </nuxt-layout>
</template>

<script setup>
const route = useRoute();
const shopProduct = useShopProduct();

onMounted(() => {
  shopProduct.find.find(route.params.slug, "slug");
});
</script>
