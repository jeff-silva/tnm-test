<template>
  <v-text-field
    v-bind="$attrs"
    ref="inputRef"
    v-maska="{
      mask: '9.99#,##',
      reversed: true,
      tokens: { 9: { pattern: /[0-9]/, repeated: true } },
    }"
    v-model="input.string"
    @update:modelValue="
      (value) => {
        input.number = f.moneyToNumber(value);
        emit('update:modelValue', input.number);
      }
    "
    @focus="$event.target.select()"
  />
</template>

<script setup>
import { vMaska } from "maska/vue";
const f = useFormat();

const props = defineProps({
  modelValue: { type: [Number], default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref(null);

const input = reactive({
  number: 0,
  string: "",
});

input.number = props.modelValue || 0;
input.string = f.numberToMoney(input.number);

watch(
  () => props.modelValue,
  (propsModelValue) => {
    if (
      document.activeElement == inputRef.value.$el ||
      inputRef.value.$el.contains(document.activeElement)
    )
      return;
    input.number = propsModelValue || 0;
    input.string = f.numberToMoney(input.number);
  }
);
</script>
