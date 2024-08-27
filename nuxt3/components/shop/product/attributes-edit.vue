<template>
  <div class="mb-5">
    <app-data-table
      :headers="[
        { field: 'name', name: 'Nome' },
        { field: 'value', name: 'Valor', width: '150px' },
      ]"
      :items="list.items"
      :actions="
        (scope) => [
          {
            text: 'Upload',
            icon: 'mdi-upload',
            showIf() {
              return props.type == 'prints';
            },
            onClick() {
              const fireUpload = storageUpload({
                onSuccess(uploadData) {
                  scope.item.url = uploadData.url;
                  emit('update:modelValue', list.items);
                },
              });

              fireUpload.browse();
            },
          },
          {
            text: 'Deletar',
            icon: 'mdi-delete',
            onClick() {
              list.remove(scope.item);
            },
          },
        ]
      "
    >
      <template #item:name="scope">
        <input
          type="text"
          v-model="scope.item.name"
          class="w-100 pa-3"
          placeholder="Nome"
          @input="
            () => {
              emit('update:modelValue', list.items);
            }
          "
        />
      </template>
      <template #item:value="scope">
        <v-btn
          v-if="props.type == 'colors'"
          :color="scope.item.hexadecimal"
          block
        />

        <div v-if="props.type == 'sizes'"></div>

        <div v-if="props.type == 'prints'">
          <img
            v-if="scope.item.url"
            :src="scope.item.url"
            alt=""
            style="width: 100%; height: 100px; object-fit: contain"
          />
        </div>
      </template>
    </app-data-table>

    <v-btn
      block
      text="Add"
      color="primary"
      @click="list.add()"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [Array], default: () => [] },
  type: { type: [String], default: null },
});

const emit = defineEmits(["update:modelValue"]);

const attrsDefaults = {
  colors: { id: null, name: null, hexadecimal: null },
  sizes: { id: null, name: null },
  prints: { id: null, name: null, url: null },
};

const { storageUpload } = useFirebase();

const list = reactive({
  items: [],
  add(item = {}) {
    list.items.push(list.defaults(item));
    emit("update:modelValue", list.items);
  },
  remove(item) {
    const index = list.items.indexOf(item);
    list.items.splice(index, 1);
    emit("update:modelValue", list.items);
  },
  set(items) {
    list.items = props.modelValue.map((item) => {
      return list.defaults(item);
    });
  },
  defaults(item) {
    if (typeof attrsDefaults[props.type] != "undefined") {
      return { ...attrsDefaults[props.type], ...item };
    }
    return item;
  },
});

list.set(props.modelValue);

watch(
  () => props.modelValue,
  (propsModelValue) => {
    list.set(propsModelValue);
  }
);
</script>
