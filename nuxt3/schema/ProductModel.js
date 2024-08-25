import Model from "./Model.js";

export default class ProductModel extends Model {
  constructor(attrs = {}) {
    super();
    this.id = attrs.id ?? null;
    this.sku = attrs.sku ?? null;
    this.name = attrs.name ?? null;
  }

  static search() {
    const { storageList } = useFirebase();
    return storageList;
  }
}
