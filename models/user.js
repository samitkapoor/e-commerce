class User {
  constructor(id, name, email, password, wishlist) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.wishlist = wishlist;
  }
}

module.exports = User;
