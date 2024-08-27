export default (options = {}) => {
  let r = {};

  r.list = useAxios({
    ...options,
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
        return prod;
      });
      return data;
    },
  });

  r.find = useAxios({
    ...options,
    method: "get",
    response: false,
    find(slug) {
      if (!slug) return;
      r.find.url = `dimona://api/backend/products/${slug}`;
      setTimeout(() => {
        r.find.submit();
      }, 1000);
    },
    beforeSubmit() {
      r.find.response = false;
    },
  });

  return r;
};
