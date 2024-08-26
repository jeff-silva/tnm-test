<template>
  <div
    class="bg-grey-lighten-4"
    style="height: 100vh; overflow: auto"
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
            text="Produtos"
            to="/product"
            variant="plain"
          />
        </div>
      </v-container>
    </div>
    <br />

    <slot></slot>
  </div>
</template>
