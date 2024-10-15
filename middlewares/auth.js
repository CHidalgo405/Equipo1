const authenticate = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization === 'powerclean') {
    console.log("Autenticación exitosa");
    next();
  } else {
    console.error("Fallo de autenticación. Valor recibido:", authorization);
    res.status(401).json({ message: 'Unauthorized' });
  }
};


module.exports = { authenticate };