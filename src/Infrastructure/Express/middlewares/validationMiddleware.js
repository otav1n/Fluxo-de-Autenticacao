function validationMiddleware(DTOClass) {
  return (req, res, next) => {
    try {
      req.validatedBody = new DTOClass(req.body);
      next();
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Erro de validação", error: err.message });
    }
  };
}

module.exports = validationMiddleware;
