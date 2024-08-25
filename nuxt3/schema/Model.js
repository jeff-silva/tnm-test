export default class Model {
  static search() {
    return useAxios({});
  }

  static make(attrs = {}) {
    return reactive(new this(attrs));
  }
}
