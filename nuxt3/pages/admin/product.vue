<template>
  <nuxt-layout name="admin">
    <div>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Nome"
            v-model="shopProduct.save.data.name"
          />
          <v-text-field
            label="Slug"
            v-model="shopProduct.save.data.slug"
          />
          <v-text-field
            label="SKU"
            v-model="shopProduct.save.data.sku"
          />
          <dimona-product-select
            label="Referencia produto Dimona"
            v-model="shopProduct.save.data.dimonaProductSlug"
            @update:attributes="
              (attrs) => {
                shopProduct.save.data.sizes = attrs.sizes;
                shopProduct.save.data.colors = attrs.colors;
              }
            "
          />
          <shop-product-attributes-edit
            label="Cores"
            type="colors"
            v-model="shopProduct.save.data.colors"
          />
          <shop-product-attributes-edit
            label="Tamanhos"
            type="sizes"
            v-model="shopProduct.save.data.sizes"
          />
          <v-btn
            block
            @click="shopProduct.save.thumbnail.browse()"
            >Upload</v-btn
          >

          <br />
          <div class="d-flex justify-end ga-3">
            <v-btn
              text="Limpar"
              @click="
                async () => {
                  shopProduct.save.dataClear();
                }
              "
            />
            <v-btn
              text="Salvar"
              color="success"
              :loading="shopProduct.save.busy"
              @click="
                async () => {
                  await shopProduct.save.submit();
                  await shopProduct.list.submit();
                  await shopProduct.save.dataClear();
                }
              "
            />
          </div>
        </v-col>

        <v-col cols="6">
          <app-data-table
            :items="shopProduct.list.data"
            :headers="[
              { name: 'Nome', field: 'name' },
              { name: 'SKU', field: 'sku', width: '200px' },
            ]"
            :actions="
              (scope) => [
                {
                  text: 'Edit',
                  color: 'primary',
                  icon: 'mdi-pen',
                  onClick() {
                    shopProduct.save.data = { ...scope.item };
                  },
                },
                {
                  text: 'Delete',
                  icon: 'mdi-delete',
                  color: 'error',
                  async onClick() {
                    await shopProduct.delete.delete(scope.item);
                    await shopProduct.list.submit();
                  },
                },
              ]
            "
          />

          <br />
          <div class="d-flex justify-end ga-3">
            <v-btn
              text="Buscar"
              :loading="shopProduct.list.busy"
              @click="
                async () => {
                  await shopProduct.list.submit();
                }
              "
            />
          </div>
        </v-col>
      </v-row>
      <pre>shopProduct: {{ shopProduct }}</pre>
      <pre>dimonaProduct: {{ dimonaProduct }}</pre>
    </div>
  </nuxt-layout>
</template>

<script setup>
const dimonaProduct = useDimonaProduct();
const shopProduct = useShopProduct();

onMounted(() => {
  shopProduct.list.submit();
});
</script>
