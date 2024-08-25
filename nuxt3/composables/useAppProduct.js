export default () => {
  const fire = useFirebase();

  let r = {};

  r.list = fire.firestoreList({
    collection: "product",
    responseParse(data) {
      data.id = data.id ?? null;
      data.name = data.name ?? null;
      data.sku = data.sku ?? null;
      data.thumbnail = data.thumbnail ?? null;
      return data;
    },
  });

  r.save = fire.firestoreSave({
    collection: "product",
    data: {
      id: null,
      name: null,
      sku: null,
      thumbnail: null,
    },
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
