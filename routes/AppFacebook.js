module.exports = AppFacebook

function AppFacebook(app, passport, AppFacebookStrategy) {

    passport.serializeUser((user, done)=>{
        console.log("serialize")
        done(null, user);
    });

    passport.deserializeUser((user, done)=>{
        console.log("deserialize")
        done(null, user);
    });

    passport.use(new AppFacebookStrategy({
        clientID : [CLIENT_ID],
        clientSecret : [CLIENT_SECRET],
    }, (accessToken, refreshToken, profile, done)=>{
        console.log('======== APP PROFILE ========')
        console.log(profile)
        done(null, profile)
    }));


    app.get('/facebook/app', passport.authenticate('facebook-token'), (req, res)=>{
        console.log("USER_TOKEN ==== " + req.param('access_token'));
        if(req.user){
            console.log(req.user)

        }
        else if(!req.user){
            res.send(401, "Can't find User On Facebook. It May Be Unusable.");
        }
    });
}