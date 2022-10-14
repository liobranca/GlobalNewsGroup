const { generateToken } = require("../config/token");
const tokens = require("../config/token");
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
const client = new OAuth2Client(
  "574890731085-p6f52485otgqo15gqso2qvjca2mseqcb.apps.googleusercontent.com"
);

exports.googlelogin = (req, res) => {
  const { credential } = req.body;
  client
    .verifyIdToken({
      idToken: credential,
      audience:
        "574890731085-p6f52485otgqo15gqso2qvjca2mseqcb.apps.googleusercontent.com",
    })
    .then((userInfo) => {
      const { email, given_name, family_name, jti } = userInfo.payload;

      let password = email + email;

      User.findOne({
        where: { email: email },
      }).then((user) => {
        if (!user) {
          return User.create({
            email: email,
            password: password,
            firstName: given_name,
            lastName: family_name,
            admin: false,
          })
            .then((user) => {
              user.validatePassword(password).then((isValid) => {
                if (!isValid) return res.send(401);
              });
            })
            .then((resultado) => console.log(resultado));
        }
        res.send(user.dataValues);
      });
    });
};
