<template>
  <div
    class="d-flex"
    style="height: 100vh"
  >
    <div style="min-width: 250px">
      <v-list>
        <v-list-item
          text="Admin"
          to="/admin"
        />
        <v-list-item
          text="Produtos"
          to="/admin/product"
        />
      </v-list>
    </div>
    <div class="flex-grow-1 bg-grey-lighten-4 pa-3">
      <slot></slot>
    </div>
  </div>
</template>
