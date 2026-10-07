class servErr extends Error {
  constructor(
    statusCode = 500,
    message = "Something unexpected happened on our side.",
  ) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = servErr;
