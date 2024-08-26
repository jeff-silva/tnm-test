<template>
  <nuxt-layout name="site">
    <v-container>
      <v-row>
        <template v-for="o in appProduct.list.data">
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
const appProduct = useAppProduct();

onMounted(() => {
  appProduct.list.submit();
});
</script>
