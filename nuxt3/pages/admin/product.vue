<template>
  <nuxt-layout name="admin">
    <div>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Nome"
            v-model="appProduct.save.data.name"
          />
          <v-text-field
            label="Slug"
            v-model="appProduct.save.data.slug"
          />
          <v-text-field
            label="SKU"
            v-model="appProduct.save.data.sku"
          />
          <v-btn
            block
            @click="appProduct.save.thumbnail.browse()"
            >Upload</v-btn
          >
          <br />
          <div class="d-flex justify-end ga-3">
            <v-btn
              text="Limpar"
              @click="
                async () => {
                  appProduct.save.dataClear();
                }
              "
            />
            <v-btn
              text="Salvar"
              color="success"
              :loading="appProduct.save.busy"
              @click="
                async () => {
                  await appProduct.save.submit();
                  await appProduct.list.submit();
                  await appProduct.save.dataClear();
                }
              "
            />
          </div>
        </v-col>

        <v-col cols="6">
          <v-table class="border">
            <colgroup>
              <col width="*" />
              <col width="150px" />
              <col width="50px" />
              <!-- <col width="50px" /> -->
            </colgroup>
            <thead>
              <tr>
                <th>Nome</th>
                <th>SKU</th>
                <th></th>
                <!-- <th></th> -->
              </tr>
            </thead>
            <tbody>
              <template v-for="o in appProduct.list.data">
                <tr>
                  <td>{{ o.name }}</td>
                  <td>{{ o.sku }}</td>
                  <td class="pa-0">
                    <v-btn
                      rounded="0"
                      flat
                      icon="mdi-edit"
                      @click="appProduct.save.data = { ...o }"
                    />
                  </td>
                  <!-- <td class="pa-0">
                    <v-btn
                      rounded="0"
                      flat
                      icon="mdi-delete"
                      @click="appProduct.delete.submit(o)"
                    />
                  </td> -->
                </tr>
              </template>
            </tbody>
          </v-table>
          <br />
          <div class="d-flex justify-end ga-3">
            <v-btn
              text="Buscar"
              :loading="appProduct.list.busy"
              @click="
                async () => {
                  await appProduct.list.submit();
                }
              "
            />
          </div>
        </v-col>
      </v-row>
      <pre>appProduct: {{ appProduct }}</pre>
      <pre>dimonaProduct: {{ dimonaProduct }}</pre>
    </div>
  </nuxt-layout>
</template>

<script setup>
const dimonaProduct = useDimonaProduct();
const appProduct = useAppProduct();

onMounted(() => {
  appProduct.list.submit();
});
</script>
