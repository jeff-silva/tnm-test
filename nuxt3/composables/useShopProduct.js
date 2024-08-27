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
      data.slug = data.slug ?? null;
      data.sku = data.sku ?? null;
      data.thumbnail = data.thumbnail ?? null;
      data.active = data.active ?? null;
      data.dimonaProductSlug = data.dimonaProductSlug ?? null;
      data.colors = data.colors ?? [];
      data.sizes = data.sizes ?? [];
      return data;
    },
  });

  r.find = fire.firestoreFind({
    collection: "shop_product",
  });

  r.save = fire.firestoreSave({
    collection: "shop_product",
    data: DATA_DEFAULT,
    thumbnail: fire.storageUpload({
      onSuccess(uploadData) {
        console.log(uploadData);
      },
    }),
  });

  r.delete = fire.firestoreDelete({
    collection: "shop_product",
  });

  return r;
};
