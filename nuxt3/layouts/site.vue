<template>
  <v-app>
    <div
      class="bg-grey-lighten-4"
      style="
        display: flex;
        flex-direction: column;
        gap: 15px;
        height: 100vh;
        overflow: auto;
      "
    >
      <div class="bg-white">
        <v-container class="d-flex align-center">
          <div>
            <nuxt-link to="/">Logo</nuxt-link>
          </div>
          <div class="flex-grow-1"></div>
          <div class="d-flex ga-2">
            <v-btn
              text="Home"
              to="/"
              variant="plain"
            />
            <v-btn
              text="Busca"
              to="/product"
              variant="plain"
            />
            <v-btn
              text="Carrinho"
              to="/cart"
              variant="plain"
            />
          </div>
        </v-container>
      </div>

      <div style="flex-grow: 1; overflow: auto">
        <div style="min-height: calc(100vh - 340px)">
          <slot></slot>
        </div>

        <div class="bg-grey-lighten-2 py-6">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <div>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur magnam laudantium, dolores porro nulla quo
                  obcaecati. Error libero assumenda laborum, alias, perferendis
                  enim dolores, natus ab ipsum hic at asperiores!
                </div>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <div>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur magnam laudantium, dolores porro nulla quo
                  obcaecati. Error libero assumenda laborum, alias, perferendis
                  enim dolores, natus ab ipsum hic at asperiores!
                </div>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <div>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur magnam laudantium, dolores porro nulla quo
                  obcaecati. Error libero assumenda laborum, alias, perferendis
                  enim dolores, natus ab ipsum hic at asperiores!
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <div class="bg-black text-center">
          <v-container> &copy; 2024 - Todos Negros do Mundo </v-container>
        </div>
      </div>

      <!-- <v-navigation-drawer
        :model-value="true"
        location="end"
        width="400"
      >
        <app-data-table
          :items="shopCart.items"
          :headers="[
            { field: 'name', name: 'Produto' },
            { field: 'quantity', name: 'Quantidade', width: '100px' },
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
        <div class="bg-success text-center py-4">
          <div>Total</div>
          <div>R$ {{ f.numberToMoney(shopCart.result.total) }}</div>
        </div>
      </v-navigation-drawer> -->
    </div>
  </v-app>
</template>

<script setup>
const f = useFormat();
const shopCart = useShopCart();
</script>
