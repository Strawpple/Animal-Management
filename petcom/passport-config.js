const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');



function initialize(passport, getUserByEmail){

    const useracc = await useraccountcoll.get();

    
    const authenticateUser = (emailinput, passwordinput, done) => {
        const user = getUserByEmail(emailinput);
        if(user = null){
            return done(null, false, {message: 'No user found'});
        }
        try{
            if(await bcrypt.compare(passwordinput, useracc.password)){
                return done(null,user);
            } else{
                return done(null, false, { message: 'Password Incorrect'})
            }
        }catch (e){
            return done(e)
        }
    }
    passport.use(new localStrategy({usernameField: 'emailinput' }), authenticateUser);
    passport.serializeUser((user, done) => { });
    passport.deserializeuser((id, done) => { });
}

module.exports = initialize;