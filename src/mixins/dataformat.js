const dataformat = {
  methods: {
    calcMedio(numinator, demonimator) {
      const result = numinator / demonimator;
      return result.toFixed(2);
    },
    calcMulti(valeu1, value2) {
      const result = valeu1 * value2;
      return result.toFixed(2);
    },
    calcSubtracao(oldValue, newValue) {
      const result = newValue - oldValue;
      return result.toFixed(2);
    },
    calcPercentual(numinator, demonimator) {
      const result = (numinator / demonimator - 1) * 100;
      return result.toFixed(2);
    },
    inputconvertData(dataTimestamp) {
      const a = new Date(dataTimestamp * 1000);
      const year = a.getFullYear();
      const montha = a.getMonth() + 1;
      const month = montha < 10 ? `0${montha}` : montha;
      const day = a.getDate();
      return `${year}-${month}-${day}`;
    }
  },
  filters: {
    convertData(dataTimestamp) {
      const a = new Date(dataTimestamp * 1000);
      const year = a.getFullYear();
      const month = a.getMonth() + 1;
      const day = a.getDate();
      return `${day}/${month}/${year}`;
    },
    valueFormat(value) {
      return value.toFixed(2);
    }
  }
};

export default dataformat;
