<template>
  <div class="pa-4">
    <v-table class="border">
      <colgroup>
        <col width="*" />
        <col width="50px" />
        <col width="50px" />
      </colgroup>
      <tbody>
        <template v-for="o in products.listComputed">
          <tr>
            <td>{{ o.product.name }}</td>
            <td>
              <v-btn
                block
                text="Add"
                @click="dimonaOrder.productAdd(o.product)"
              />
            </td>
            <td>
              <v-btn
                block
                text="Remove"
                @click="dimonaOrder.productRemove(o.product)"
                v-if="o.cart"
              />
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td colspan="2">
            <v-btn
              text="Enviar pedito"
              block
              @click="dimonaOrder.submit()"
            />
          </td>
        </tr>
      </tfoot>
    </v-table>
    <pre>products: {{ products }}</pre>
    <pre>dimonaOrder: {{ dimonaOrder }}</pre>
    <!-- <pre>req: {{ req }}</pre> -->
  </div>
</template>

<script setup>
import _ from "lodash";

const products = reactive({
  filter: {
    q: null,
  },
  list: [
    {
      name: "Camisa Teste 1",
      sku: "test-1",
    },
    {
      name: "Camisa Teste 2",
      sku: "test-2",
    },
  ],
  listComputed: computed(() => {
    return products.list.map((product) => {
      const cart =
        dimonaOrder.data.items
          .filter((item) => item.sku == product.sku)
          .at(0) || null;
      return { product, cart };
    });
  }),
});

const dimonaOrder = useAxios({
  method: "post",
  url: "https://camisadimona.com.br/api/v2/order",
  headers: {
    "api-key": "44eb51cca73a4ee1f2e67ba1414afd62",
  },
  productAdd(product) {
    if (!product.sku) return;

    let itemFind = this.data.items
      .filter((item) => item.sku == product.sku)
      .at(0);

    if (!itemFind) {
      itemFind = {
        name: product.name ?? "",
        sku: product.sku ?? "",
        qty: 1,
      };
      this.data.items.push(itemFind);
    } else {
      itemFind.qty++;
    }
  },
  productRemove(product) {
    for (let i in this.data.items) {
      if (this.data.items[i].sku != product.sku) continue;
      this.data.items.splice(i, 1);
    }
  },
  data: {
    shipping_speed: "pac",
    delivery_method_id: "177",
    order_id: "order-001",
    customer_name: "Fulano da Silva",
    customer_document: "123.456.789-13",
    customer_email: "exemplo@gmail.com",
    // webhook_url: "https://option_webhook_url.com",
    items: [
      // {
      //   name: "Camisa Polo P Branca",
      //   sku: "12345",
      //   qty: 2,
      //   dimona_sku_id: "010603110108",
      //   designs: ["url_front", "url_back"],
      //   mocks: ["mock_front", "mock_back"],
      // },
      // {
      //   name: "Camisa Polo M Branca",
      //   sku: "12346",
      //   qty: 2,
      //   dimona_sku_id: "010603110109",
      //   designs: ["url_front", "url_back"],
      //   mocks: ["mock_front", "mock_back"],
      // },
      // {
      //   name: "Camisa Polo G Branca",
      //   sku: "12347",
      //   qty: 2,
      //   dimona_sku_id: "010603110110",
      //   designs: ["url_front", "url_back"],
      //   mocks: ["mock_front", "mock_back"],
      // },
    ],
    // nfe: {
    //   chave: "chave_com_44_digitos",
    //   serie: "1",
    //   numero: "1234",
    //   link: "https://link_para_nfe",
    // },
    address: {
      name: "Receiver Name",
      street: "Rua Buenos Aires",
      number: "334",
      complement: "Loja",
      city: "Rio de Janeiro",
      state: "RJ",
      zipcode: "20061000",
      neighborhood: "Centro",
      phone: "21 21093661",
      country: "BR",
    },
  },
});

// const req = useAxios({
//   url: "https://jsonplaceholder.typicode.com/todos/1",
//   autoSubmit: true,
//   response: {},
// });
</script>
