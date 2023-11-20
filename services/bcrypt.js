class BcryptInterface {
  async hash() {
    throw new Error("Method not implemented");
  }

  async verify(userPassword) {
    throw new Error("Method not implemented");
  }
}

class Bcrypt extends BcryptInterface {
  #password = "";

  constructor(password) {
    super();
    this.#password = password;
  }

  async hash() {
    const hashedPassword = await bcrypt.hash(this.#password, 10);
    return hashedPassword;
  }

  async verify(userPassword) {
    const verifyPassword = await bcrypt.compare(this.#password, userPassword);
    return verifyPassword;
  }
}

module.exports = Bcrypt;
