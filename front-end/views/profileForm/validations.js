export const onEmailError = ({ email }) => {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase()) ? "" : "Ongeldig email adres";
};

export const onPhoneError = ({ phone_number }) => {
  if (isNaN(phone_number)) {
    return "Een telefoonnummer mag alleen cijfers bevatten";
  }

  if (phone_number.length > 10) {
    return "Een telefoonnummer mag niet langer zijn dan 10 cijfers";
  }

  return "";
};
