//says user is logged in
//if the user doesn't have userid redirect to login page
  // next()


  const hasAuth = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  module.exports = hasAuth;