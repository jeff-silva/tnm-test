<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
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
        </v-card>
      </v-col>

      <v-col cols="6"></v-col>

      <v-col cols="6">
        <v-card>
          <v-card-text>
            <div>Total: R$ {{ f.numberToMoney(shopCart.result.total) }}</div>
            <!-- <pre>shopCart: {{ shopCart }}</pre> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const f = useFormat();
const shopCart = useShopCart();
</script>
