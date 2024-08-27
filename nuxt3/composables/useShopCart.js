import { useStorage } from "@vueuse/core";

export default () => {
  const r = reactive({
    result: computed(() => {
      const total = r.items.reduce(
        (sum, item) => sum + item.item.amount * item.quantity,
        0
      );
      const items = r.items.reduce((sum, item) => sum + item.quantity, 0);
      return { total, items };
    }),

    items: useStorage("shop_cart_items", []),

    add(item) {
      const itemExists = r.productExists(item);
      if (itemExists) {
        itemExists["quantity"]++;
        return;
      }
      r.items.push({ quantity: 1, item });
    },

    remove(item) {
      for (let i in r.items) {
        const o = r.items[i];
        if (o.item.id == item.id) {
          r.items.splice(i, 1);
        }
      }
    },

    productExists(item) {
      const itemExists = r.items.filter((o) => o.item.id == item.id);
      return itemExists[0] ?? null;
    },
  });

  return r;
};
