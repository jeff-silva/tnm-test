<template>
  <v-card>
    <!-- Preview image -->
    <v-expand-transition>
      <template v-if="preview.isImage()">
        <img
          :src="preview.url"
          alt=""
          style="width: 100%; margin-bottom: -4px"
        />
      </template>
    </v-expand-transition>

    <v-text-field
      v-model="preview.url"
      readonly
      hide-details
      v-bind="$attrs"
      :prepend-icon="null"
      :append-inner-icon="preview.url ? 'mdi-delete' : 'mdi-upload'"
      @click:append-inner="
        () => {
          if (preview.url) {
            preview.url = null;
            emit('update:modelValue', null);
            return;
          }
          fireUpload.browse();
        }
      "
    />

    <!-- <pre>fireUpload: {{ fireUpload }}</pre>
    <pre>preview: {{ preview }}</pre>
    <pre>preview.isImage(): {{ preview.isImage() }}</pre> -->
  </v-card>
</template>

<script setup>
const { storageUpload } = useFirebase();
const fireUpload = storageUpload({
  onSuccess(uploadData) {
    preview.url = uploadData.url;
    emit("update:modelValue", uploadData.url);
  },
});

const props = defineProps({
  modelValue: { type: [String], default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const preview = reactive({
  url: props.modelValue,
  // url: "https://firebasestorage.googleapis.com/v0/b/tnm-shop.appspot.com/o/563-800x600.jpg?alt=media&token=280d9be7-fe76-44f9-ad8f-529a2a574293",
  isImage() {
    if (this.url) {
      const u = new URL(this.url);
      if (u.pathname) {
        if (u.pathname.endsWith(".jpg")) return true;
        if (u.pathname.endsWith(".jpeg")) return true;
        if (u.pathname.endsWith(".gif")) return true;
        if (u.pathname.endsWith(".bmp")) return true;
        if (u.pathname.endsWith(".png")) return true;
        if (u.pathname.endsWith(".webp")) return true;
      }
    }

    return false;
  },
});

watch(
  () => props.modelValue,
  (propsModelValue) => {
    preview.url = propsModelValue;
  }
);
</script>
