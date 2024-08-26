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
    collection: "product",
    responseParse(data) {
      data.id = data.id ?? null;
      data.name = data.name ?? null;
      data.slug = data.slug ?? null;
      data.sku = data.sku ?? null;
      data.thumbnail = data.thumbnail ?? null;
      data.active = data.active ?? null;
      return data;
    },
  });

  r.find = fire.firestoreFind({
    collection: "product",
  });

  r.save = fire.firestoreFind({
    collection: "product",
    data: DATA_DEFAULT,
    thumbnail: fire.storageUpload({
      onSuccess(uploadData) {
        console.log(uploadData);
      },
    }),
  });

  // r.delete = r.firestoreDelete({
  //   collection: "product",
  // });

  return r;
};
