import axios from "axios";
import _ from "lodash";

export default (options = {}) => {
  options = _.merge(
    {
      url: null,
      method: "get",
      data: {},
      params: {},
      headers: {},
      response: null,
      autoSubmit: false,
      beforeSubmit: (self) => null,
      responseParse: (data) => data,
      onSuccess: (data) => data,
      onError: (data) => data,
    },
    options
  );

  const conf = useRuntimeConfig();

  const presets = {
    "dimona://": {
      baseURL: "https://camisadimona.com.br",
      headers: {
        "api-key": conf.public.DIMONA_API_KEY,
      },
    },
    "pagseguro://": {
      baseURL:
        "https://thingproxy.freeboard.io/fetch/https://api.pagseguro.com",
      headers: {
        Authorization: `Bearer ${conf.public.PAGBANK_PUBLIC_KEY}`,
        "Content-type": "application/json",
      },
    },
    "pagseguro-sandbox://": {
      baseURL:
        "https://thingproxy.freeboard.io/fetch/https://sandbox.api.pagseguro.com",
      headers: {
        Authorization: `Bearer ${conf.public.PAGBANK_SANDBOX_PUBLIC_KEY}`,
        "Content-type": "application/json",
      },
    },
  };

  const r = reactive({
    busy: false,
    ready: false,

    ...options,

    error: new (class {
      constructor() {
        this.code = null;
        this.message = null;
        this.details = {};
      }

      set(code, message, details = {}) {
        this.code = code;
        this.message = message;
        this.details = details;
        return this;
      }

      clear() {
        return this.set(null, null);
      }
    })(),

    submit() {
      return new Promise(async (resolve, reject) => {
        r.busy = true;
        r.beforeSubmit(r);

        let axiosOptions = {
          url: options.url,
          method: options.method,
          data: options.data,
          params: options.params,
          headers: options.headers,
        };

        for (let attr in axiosOptions) {
          if (typeof axiosOptions[attr] == "function") {
            axiosOptions[attr] = axiosOptions[attr]();
          }
        }

        for (let prefix in presets) {
          if (axiosOptions.url.startsWith(prefix)) {
            axiosOptions.url = axiosOptions.url.replace(prefix, "");
            axiosOptions = _.merge(axiosOptions, presets[prefix]);
          }
        }

        try {
          const resp = await axios(axiosOptions);
          r.ready = true;
          r.response = r.responseParse(resp.data);
          options.onSuccess(resp);
          resolve(resp);
        } catch (err) {
          r.error.set(
            err.code,
            err.message,
            err.response ? err.response.data : {}
          );
          options.onError(r.error);
          reject(r.error);
        }

        r.busy = false;
      });
    },
  });

  if (options.autoSubmit) {
    r.submit();
  }

  return r;
};
