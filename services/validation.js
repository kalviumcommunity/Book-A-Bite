class Validation {
  static emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  static passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\]^_`{|}~])(?=.{8,})/;

  static testEmailRegex(email) {
      return Validation.emailRegex.test(email);
  }

  static testPasswordRegex(password) {
      return Validation.passwordRegex.test(password);
  }

}

module.exports = Validation