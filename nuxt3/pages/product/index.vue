<template>
  <nuxt-layout name="site">
    <v-container>
      <v-row>
        <template v-for="o in shopProduct.list.data">
          <v-col cols="3">
            <div class="rounded border">
              <div
                class="bg-grey-lighten-3"
                style="height: 300px"
              ></div>
              <div class="pa-3">{{ o.name }}</div>
              <v-btn
                block
                text="Ver"
                color="primary"
                rounded="0"
                :to="`/product/${o.sku}`"
              />
            </div>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </nuxt-layout>
</template>

<script setup>
const shopProduct = useShopProduct();

onMounted(() => {
  shopProduct.list.submit();
});
</script>
