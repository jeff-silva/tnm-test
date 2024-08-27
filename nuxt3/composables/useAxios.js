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

  const PRESETS = {
    "dimona://": {
      url: "https://camisadimona.com.br",
      headers: {
        "api-key": conf.public.DIMONA_API_KEY,
      },
    },
    "pagseguro://": {
      url: "https://thingproxy.freeboard.io/fetch/https://api.pagseguro.com",
      headers: {
        Authorization: `Bearer ${conf.public.PAGBANK_PUBLIC_KEY}`,
        "Content-type": "application/json",
      },
    },
    "pagseguro-sandbox://": {
      url: "https://thingproxy.freeboard.io/fetch/https://sandbox.api.pagseguro.com",
      headers: {
        Authorization: `Bearer ${conf.public.PAGBANK_SANDBOX_PUBLIC_KEY}`,
        "Content-type": "application/json",
      },
    },
  };

  const evt = reactive({
    items: [],
    on(name, call) {
      evt.items.push({ name, call });
    },
    dispatch(name, args = []) {
      return evt.items
        .filter((item) => item.name == name)
        .map((item) => {
          return item.call.apply(null, args);
        });
    },
  });

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

    optionsSync() {
      let optionsSync = {
        url: r.url,
        method: r.method,
        data: r.data,
        params: r.params,
        headers: r.headers,
      };

      for (let i in optionsSync) {
        if (typeof options[i] == "function") {
          optionsSync[i] = options[i]();
        }
      }

      for (let prefix in PRESETS) {
        let preset = PRESETS[prefix];
        if ((optionsSync.url || "").startsWith(prefix)) {
          optionsSync.url = optionsSync.url.replace(prefix, `${preset.url}/`);
        }
      }

      for (let i in optionsSync) {
        r[i] = optionsSync[i];
      }
    },

    on: evt.on,
    dispatch: evt.dispatch,

    submit() {
      return new Promise(async (resolve, reject) => {
        r.optionsSync();
        r.busy = true;
        r.beforeSubmit(r);

        try {
          const resp = await axios({
            url: r.url,
            method: r.method,
            data: r.data,
            params: r.params,
            headers: r.headers,
          });
          r.ready = true;
          r.response = r.responseParse(resp.data);
          options.onSuccess(resp);
          r.dispatch("success", [resp]);
          resolve(resp);
        } catch (err) {
          r.error.set(
            err.code,
            err.message,
            err.response ? err.response.data : {}
          );
          options.onError(r.error);
          r.dispatch("error", [resp]);
          reject(r.error);
        }

        r.busy = false;
      });
    },
  });

  if (options.autoSubmit) {
    r.submit();
  }

  r.optionsSync();
  return r;
};
