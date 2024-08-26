<template>
  <nuxt-layout name="site">
    <v-container v-if="appProduct.find.data">
      <h1>{{ appProduct.find.data.name }}</h1>
    </v-container>
  </nuxt-layout>
</template>

<script setup>
const route = useRoute();
const appProduct = useAppProduct();

onMounted(() => {
  appProduct.find.find(route.params.slug, "slug");
});
</script>
