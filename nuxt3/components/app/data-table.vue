<template>
  <v-table class="border">
    <colgroup>
      <template v-for="o in propsHeaders()">
        <col :width="o.width || '*'" />
      </template>
      <template v-for="o in propsActions()">
        <col width="40px" />
      </template>
    </colgroup>
    <thead>
      <tr>
        <template v-for="o in propsHeaders()">
          <th>{{ o.name || null }}</th>
        </template>
        <template v-for="o in propsActions()">
          <th></th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-if="propsItems.length == 0">
        <tr>
          <td
            :colspan="propsHeaders().length + propsActions().length"
            class="text-center"
          >
            <slot name="empty">Nenhum dado encontrado</slot>
          </td>
        </tr>
      </template>
      <template v-for="o in propsItems">
        <tr>
          <template v-for="oo in propsHeaders()">
            <td>
              <slot :name="oo.field ? `row:${oo.field}` : null">
                {{ oo.field ? o.item[oo.field] : null }}
              </slot>
            </td>
          </template>
          <template v-for="o in propsActions({ ...o })">
            <td class="pa-0">
              <v-btn
                v-bind="o"
                rounded="0"
                flat
                block
                v-tooltip="o.text"
              />
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [String], default: "" },
  headers: { type: [Array], default: () => [] },
  actions: { type: [Function], default: () => [] },
  items: { type: [Array], default: () => [] },
});

const emit = defineEmits(["update:modelValue"]);

const propsHeaders = (merge = {}) => {
  return props.headers.map((item) => {
    return { field: null, name: null, width: null, ...item };
  });
};

const propsActions = (merge = {}) => {
  return props.actions(scope(merge));
};

const propsItems = computed(() => {
  return props.items.map((item, index) => {
    return { index, item };
  });
});

const scope = (merge = {}) => {
  return {
    ...merge,
  };
};
</script>
