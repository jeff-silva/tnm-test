export default () => {
  const DATA_DEFAULT = {
    id: null,
    name: null,
    sku: null,
    thumbnail: null,
    active: null,
  };

  const fire = useFirebase();
  let r = {};

  r.list = fire.firestoreList({
    collection: "shop_product",
    responseParse(data) {
      data.id = data.id ?? null;
      data.name = data.name ?? null;
      data.sku = data.sku ?? null;
      data.thumbnail = data.thumbnail ?? null;
      data.amount = data.amount ?? 0;
      data.active = data.active ?? null;
      data.dimonaProductSlug = data.dimonaProductSlug ?? null;
      data.colors = data.colors ?? [];
      data.sizes = data.sizes ?? [];
      data.prints = data.prints ?? [];
      return data;
    },
  });

  r.find = fire.firestoreFind({
    collection: "shop_product",
  });

  r.save = fire.firestoreSave({
    collection: "shop_product",
    data: DATA_DEFAULT,
  });

  r.delete = fire.firestoreDelete({
    collection: "shop_product",
  });

  return r;
};
