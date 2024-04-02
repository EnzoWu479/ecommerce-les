export const getBrand = (cardNumber: string) => {
  const card = cardNumber.replace(/\s/g, '');
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(card)) {
    return 'Visa';
  }
  if (/^5[1-5][0-9]{14}$/.test(card)) {
    return 'Master Card';
  } else if (/^3[47][0-9]{13}$/.test(card)) {
    return 'Amex';
  } else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(card)) {
    return 'Discover';
  } else if (/^(?:2131|1800|35\d{3})\d{11}$/.test(card)) {
    return 'JCB';
  } else if (/^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/.test(card)) {
    return 'Maestro';
  } else {
    return 'Desconhecido';
  }
};
