<template>
  <div class="mb-5">
    <v-table class="border">
      <colgroup>
        <col width="*" />
        <col width="100px" />
      </colgroup>
      <thead>
        <tr>
          <th
            colspan="2"
            class="font-weight-bold text-uppercase"
          >
            {{ $attrs.label ?? "Atributos" }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="o in props.modelValue">
          <tr>
            <td>{{ o.name }}</td>

            <template v-if="props.type == 'colors'">
              <td>
                <v-btn
                  :color="o.hexadecimal"
                  block
                />
              </td>
            </template>

            <template v-if="props.type == 'sizes'">
              <td></td>
            </template>
          </tr>
        </template>
      </tbody>
    </v-table>
    <!-- <v-text-field v-bind="$attrs" /> -->
    <!-- <pre>{{ props.modelValue }}</pre> -->
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [Array], default: () => [] },
  type: { type: [String], default: null },
});

const emit = defineEmits(["update:modelValue"]);
</script>
