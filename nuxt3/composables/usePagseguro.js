import _ from "lodash";

export default (opts1 = {}) => {
  opts1 = {
    sandbox: false,
    ...opts1,
  };

  let r = {};

  r.checkoutPost = (opts2 = {}) => {
    const r = useAxios(
      _.merge(
        {
          method: "post",
          url: `pagseguro${opts1.sandbox ? "-sandbox" : ""}://checkouts`,
          data: {
            customer: {
              phone: { country: "+55", area: "27", number: "999999999" },
              Name: "joao",
              email: "joao@teste.com",
              tax_id: "12345678909",
            },
            shipping: {
              address: {
                street: "Faria Lima",
                number: "1384",
                complement: "5 andar",
                locality: "Pinheiros",
                city: "São Paulo",
                region_code: "SP",
                country: "BRA",
                postal_code: "01452002",
              },
              box: {
                dimensions: { length: 15, width: 10, height: 14 },
                weight: 300,
              },
              service_type: "PAC",
              address_modifiable: true,
              amount: 99,
              type: "CALCULATE",
            },
            items: [
              {
                reference_id: "12345",
                name: "Nome do Produto",
                description: "aaa",
                quantity: 1,
                unit_amount: 500,
                image_url:
                  "https://www.petz.com.br/blog//wp-content/upload/2018/09/tamanho-de-cachorro-pet-1.jpg",
              },
            ],
            reference_id: "REFERÊNCIA DO PRODUTO",
            expiration_date: "2024-12-31T00:00:00-03:00",
            customer_modifiable: true,
            additional_amount: 99,
            discount_amount: 50,
            payment_methods: [
              // { type: "CREDIT_CARD" },
              // { type: "DEBIT_CARD" },
              // { type: "BOLETO" },
              { type: "PIX" },
            ],
            soft_descriptor: "xxxx",
            // redirect_url: "http://localhost:3000/tnm-test/test",
            // notification_urls: ["http://localhost:3000/tnm-test/test"],
            // payment_notification_urls: ["http://localhost:3000/tnm-test/test"],
          },
        },
        opts2
      )
    );

    return r;
  };

  return r;
};
