<template>
  <v-card>
    <v-card-title class="font-weight-bold">{{ props.label }}</v-card-title>
    <v-card-text>
      <div class="d-flex flex-wrap ga-3">
        <template v-for="o in props.items">
          <template v-if="props.type == 'prints'">
            <v-btn
              size="150"
              flat
              class="bg-grey-lighten-2"
            >
              <v-avatar
                size="150"
                rounded="0"
              >
                <v-img :src="o.url" />
              </v-avatar>
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              :text="o.name"
              :color="
                o.hexadecimal
                  ? o.hexadecimal == '#ffffff'
                    ? 'grey'
                    : o.hexadecimal
                  : null
              "
              height="50"
              variant="outlined"
            />
          </template>
        </template>
      </div>
      <!-- <pre>{{ props.items }}</pre> -->
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [Number, String, Object], default: null },
  items: { type: [Array], default: () => [] },
  type: { type: [String], default: null },
  label: { type: [String], default: null },
});

const emit = defineEmits(["update:modelValue"]);
</script>
