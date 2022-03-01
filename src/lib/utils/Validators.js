export const isNotEmpty = value => {
  return !(!value || /^\s*$/.test(value));
};

export const validateEmail = mail => {
  mail = mail.toLowerCase();
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2,4}|capital)$/.test(mail)) {
    return true;
  }
  return false;
};

export const matchValues = (first, second) => {
  return first === second ? true : false;
};

export const validateUrl = str => {
  try {
    new URL(str);
  } catch (_) {
    return false;
  }
  return true;
};
export const isValidDate=(dateObject)=>{
  return new Date(dateObject).toString() !== 'Invalid Date';
}
export const isPhoneNumberValid = (number) =>{
  var phoneRegExp = /^[0-9]*$/gm
  if (number.match(phoneRegExp)) {
    return true
  }
  else {
    return false
  }
}