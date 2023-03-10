const LocalStrategy = require('passport-local').Strategy
const bcript = require('bcryptjs')

function initializePassport(passport, getUserByEmail, getUserById) {
  const auth = async (email, password, done) => {
    const usuariodb = await getUserByEmail(email)
    if (usuariodb == null) {
      return done(null, false, { message: "No existe usuario registrado con ese email." })
    }
    try {
      if (await bcript.compare(password, usuariodb .password)) {
        return done(null, usuariodb)
      } else {
        return done(null, false, { message: "La contraseña ingresada es incorrecta" })
      }
    } catch (error) {
      return done(error)
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, auth))
  passport.serializeUser((usuariodb, done) => { done(null, usuariodb.id) })
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserById(id))
  })
}

module.exports = initializePassport