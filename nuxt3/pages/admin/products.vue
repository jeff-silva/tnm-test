<template>
  <div>
    <pre>appProduct: {{ appProduct }}</pre>
    <pre>dimonaProduct: {{ dimonaProduct }}</pre>
  </div>
</template>

<script setup>
const dimonaProduct = useDimonaProduct();
const appProduct = useAppProduct();
</script>
