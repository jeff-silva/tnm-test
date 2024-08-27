export default () => {
  return {
    numberToMoney(_number) {
      return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(_number);
    },

    moneyToNumber(_string) {
      _string = _string.replace(".", "");
      _string = _string.replace(",", ".");
      _string = parseFloat(_string || "0");
      return _string;
    },

    stringSlugify(value) {
      value = (value || "").toLowerCase().trim();
      value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      value = value.replace(/[^a-z0-9\s-]/g, " ").trim();
      value = value.replace(/[\s-]+/g, "-");
      return value;
    },
  };
};
