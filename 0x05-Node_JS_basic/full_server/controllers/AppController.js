class AppController {
  static getHomePage(request, response) {
    response.status(200);
    response.send('Hello Holberton School!');
  }
}

module.exports = AppController;
