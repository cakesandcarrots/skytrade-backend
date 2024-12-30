import passport from "passport";
export const isAuth = (req,res,done)=>{
        return passport.authenticate('jwt', { session: false });
      };  


export const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};