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
      return value;
    },
  };
};
