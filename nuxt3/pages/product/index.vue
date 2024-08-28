<template>
  <nuxt-layout name="site">
    <v-container>
      <v-row>
        <template v-for="o in shopProduct.list.data">
          <v-col
            cols="12"
            md="3"
          >
            <v-card>
              <div
                class="bg-grey-lighten-3 pa-2"
                style="height: 300px"
              >
                <img
                  v-if="o.thumbnail"
                  :src="o.thumbnail"
                  alt=""
                  style="width: 100%; height: 100%; object-fit: contain"
                />
              </div>
              <v-card-title>{{ o.name }}</v-card-title>
              <v-card-actions class="justify-end">
                <v-btn
                  text="Ver"
                  class="bg-primary"
                  :to="`/product/${o.sku}`"
                />
              </v-card-actions>
            </v-card>
            <!-- <div class="rounded border">
              <div
                class="bg-grey-lighten-3 pa-2"
                style="height: 300px"
              >
                <img
                  v-if="o.thumbnail"
                  :src="o.thumbnail"
                  alt=""
                  style="width: 100%; height: 100%; object-fit: contain"
                />
              </div>
              <div class="pa-3">{{ o.name }}</div>
              <div class="d-flex ga-2">
                <div class="flex-grow-1">
                  <v-btn
                    block
                    text="Ver"
                    color="primary"
                    rounded="0"
                    :to="`/product/${o.sku}`"
                  />
                </div>
              </div>
            </div> -->
          </v-col>
        </template>
      </v-row>
    </v-container>
  </nuxt-layout>
</template>

<script setup>
const shopProduct = useShopProduct();
const shopCart = useShopCart();

onMounted(() => {
  shopProduct.list.submit();
});
</script>
