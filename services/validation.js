class Validation {
  emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\]^_`{|}~])(?=.{8,})/;

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  testEmailRegex() {
    if (!this.emailRegex.test(this.email)) {
      return 1;
    }
    return 0;
  }

  testPasswordRegex() {
    if (!this.passwordRegex.test(this.password)) {
      return 1;
    }
    return 0;
  }

  destructor() {
    this.email = null;
    this.password = null;
  }
}

module.exports = Validation
