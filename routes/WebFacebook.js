module.exports = WebFacebook

function WebFacebook(app, passport, WebFacebookStrategy) {

    passport.serializeUser((user, done)=>{
        console.log("serialize")
        console.log(user)
        done(null, user);
    });

    passport.deserializeUser((user, done)=>{
        console.log("deserialize")
        console.log(user)
        done(null, user);
    });

    passport.use(new WebFacebookStrategy({ //facebook 로그인을 위한 토큰 로그인
            clientID: '1649437005348937',
            clientSecret: '5452e5edeb1623b12b87efd4692feb98',
            callbackURL: "/auth/facebook/callback",
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'verified', 'displayName'],
        },
        (accessToken, refreshToken, profile, done)=>{
            console.log('USER_TOKEN == '+accessToken)
            console.log('====== WEB PROFILE ======')
            console.log(profile)
            console.log('========== END ==========')

            done(null, profile)
        }
    ));

    app.get('/main', (req, res)=>{
        res.send('Hello')
    })

    app.get('/facebook/web', passport.authenticate('facebook', (req, res)=>{
            console.log(req)
        })
    );

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook',
            {
                successRedirect: '/main',
                failureRedirect: '/auth/facebook'
            }));

}