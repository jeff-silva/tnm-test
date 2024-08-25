export default () => {
  const fire = useFirebase();

  let r = {};

  r.list = fire.firestoreList({
    collection: "product",
  });

  r.save = fire.firestoreSave({
    collection: "product",
  });

  r.delete = reactive({});

  return r;
};
