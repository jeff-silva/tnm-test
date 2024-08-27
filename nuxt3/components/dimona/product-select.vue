<template>
  <div class="mb-5">
    <v-autocomplete
      v-bind="$attrs"
      :items="dimonaProduct.list.response.data"
      :loading="dimonaProduct.list.busy || dimonaProduct.find.busy"
      item-value="slug"
      item-title="name"
      :model-value="props.modelValue"
      hide-details
      @update:modelValue="updateModelValueHandler"
      @update:search="updateSearch.handler"
    />

    <v-card v-if="dimonaProduct.find.busy">
      <v-card-text class="text-center">Carregando</v-card-text>
    </v-card>

    <v-card
      v-if="!dimonaProduct.find.busy && dimonaProduct.find.response"
      :loading="dimonaProduct.find.busy"
    >
      <div class="text-center font-weight-bold bg-success py-5">
        Preço Dimona: R$ {{ dimonaProduct.find.response.price }}
      </div>
      <!-- <v-card-text>
        <v-row>
          <v-col cols="4">aaa</v-col>
          <v-col cols="8">
            <div>{{ dimonaProduct.find.response.name }}</div>
            <div>{{ dimonaProduct.find.response.price }}</div>
          </v-col>
        </v-row>
      </v-card-text> -->

      <v-expansion-panels variant="accordion">
        <v-expansion-panel
          :title="`Cores (${dimonaProduct.find.response.colors.length})`"
        >
          <v-expansion-panel-text>
            <pre>{{ dimonaProduct.find.response.colors }}</pre>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel
          :title="`Tamanhos (${dimonaProduct.find.response.sizes.length})`"
        >
          <v-expansion-panel-text>
            <pre>{{ dimonaProduct.find.response.sizes }}</pre>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-card-actions class="justify-end">
        <v-btn
          text="Adicionar todos os atributos"
          class="bg-primary"
          @click="
            () => {
              emit('update:attributes', {
                colors: dimonaProduct.find.response.colors,
                sizes: dimonaProduct.find.response.sizes,
              });
            }
          "
        />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [Number, Object], default: null },
});

const emit = defineEmits(["update:modelValue", "update:attributes"]);

const dimonaProduct = useDimonaProduct();
// dimonaProduct.list.submit();

dimonaProduct.find.on("success", (resp) => {
  dimonaProduct.list.response.data = [resp.data];
});

const updateModelValueHandler = (value) => {
  emit("update:modelValue", value);
  dimonaProduct.find.find(value);
};

const updateSearch = reactive({
  t: null,
  handler(value) {
    if (!value) return;
    if (updateSearch.t) {
      clearTimeout(updateSearch.t);
    }
    updateSearch.t = setTimeout(() => {
      dimonaProduct.list.data.search = value;
      dimonaProduct.list.submit();
    }, 1000);
  },
});

watch(
  () => props.modelValue,
  (propsModelValue) => {
    dimonaProduct.find.response = false;
    dimonaProduct.find.find(propsModelValue);
  }
);
</script>
