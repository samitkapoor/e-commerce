class User {
  constructor(id, name, email, password, wishlist, cart) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.wishlist = wishlist;
    this.cart = cart;
  }
}

module.exports = User;
