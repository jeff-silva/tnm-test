<template>
  <nuxt-layout name="site">
    <v-container v-if="shopProduct.find.data">
      <v-row>
        <v-col cols="12">
          <h1>{{ shopProduct.find.data.name }}</h1>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-card>
            <img
              :src="shopProduct.find.data.thumbnail"
              alt=""
              style="width: 100%; height: 500px; object-fit: contain"
              class="bg-grey-lighten-2 mb-n2"
            />
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex flex-column ga-4">
            <shop-product-attribute-select
              label="Tamanho"
              type="sizes"
              :items="shopProduct.find.data.sizes"
            />
            <shop-product-attribute-select
              label="Cor"
              type="colors"
              :items="shopProduct.find.data.colors"
            />
            <shop-product-attribute-select
              label="Etampa"
              type="prints"
              :items="shopProduct.find.data.prints"
            />
            <v-text-field
              label="Informe seu CEP para calcular entrega"
              append-inner-icon="mdi-magnify"
              hide-details
            />
            <div class="d-flex justify-end">
              <v-btn
                color="success"
                width="150"
                height="60"
                >Comprar</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- <pre>{{ shopProduct.find }}</pre> -->
    </v-container>
  </nuxt-layout>
</template>

<script setup>
const route = useRoute();
const shopProduct = useShopProduct();

onMounted(() => {
  shopProduct.find.find(route.params.sku, "sku");
});
</script>
