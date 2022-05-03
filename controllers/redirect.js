exports.handleRedirect = ({ withMessage, responseMessage }) => (request, response) => {
  if (withMessage) {
    response.status(200).json({ message: responseMessage })
  }
};
