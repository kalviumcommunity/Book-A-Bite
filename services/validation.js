class Validation {
  static emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  static passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\]^_`{|}~])(?=.{8,})/;

  testEmailRegex(email) {
      return this.emailRegex.test(email)? 0 : 1;
  }

  testPasswordRegex(password) {
      return this.passwordRegex.test(password) ? 0 : 1;
  }

}

module.exports = Validation