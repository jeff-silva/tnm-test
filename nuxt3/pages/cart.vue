<template>
  <nuxt-layout name="site">
    <v-container>
      <app-data-table
        :items="shopCart.items"
        :headers="[
          { field: 'name', name: 'Produto' },
          { field: 'quantity', name: 'Quantidade', width: '200px' },
        ]"
        :actions="
          (scope) => [
            {
              text: 'Delete',
              icon: 'mdi-delete',
              onClick() {
                shopCart.remove(scope.item.item);
              },
            },
          ]
        "
      >
        <template #item:name="scope">
          {{ scope.item.item.name }}
        </template>

        <template #item:quantity="scope">
          <input
            type="number"
            v-model="scope.item.quantity"
            class="w-100 pa-3"
          />
        </template>
      </app-data-table>
      <!-- <pre>shopCart: {{ shopCart }}</pre> -->
    </v-container>
  </nuxt-layout>
</template>

<script setup>
const shopCart = useShopCart();
</script>
