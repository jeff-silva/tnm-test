import Model from "./Model.js";

export default class DimonaProductModel extends Model {
  constructor(attrs = {}) {
    super();
    for (let attr in attrs) {
      this[attr] = attrs[attr];
    }
  }

  static search() {
    return useAxios({
      autoSubmit: true,
      method: "post",
      url: "dimona://api/backend/products/filtered",
      params: { page: 1 },
      data: {
        search: null,
        categories: [],
        collections: [],
        colors: [],
        sizes: [],
        customizable: "only",
        order_by: "sales",
        per_page: 100,
      },
      response: {
        data: [],
      },
      responseParse(data) {
        data.data = data.data.map((prod) => {
          prod.dimonaUrl = `https://camisadimona.com.br/produto/${prod.slug}/`;
          return new DimonaProductModel(prod);
        });
        return data;
      },
    });
  }
}
