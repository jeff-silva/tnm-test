<template>
  <div>
    <div><a href="">Refresh</a></div>
    <v-btn
      text="Pagar"
      @click="pagseguroCheckout.submit()"
      :loading="pagseguroCheckout.busy"
    />
    <pre>pagseguroCheckout: {{ pagseguroCheckout }}</pre>
  </div>
</template>

<script setup>
const pagseguro = usePagseguro({ sandbox: true });
const pagseguroCheckout = pagseguro.checkoutPost({
  onSuccess(resp) {
    console.log(resp.data.id);
  },
});
</script>
