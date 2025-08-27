import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        let isNewUser = false;

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            user.googleId = profile.id;
            await user.save();
          } else {
            user = await new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
            }).save();
            isNewUser = true;
          }
        }

        // Return an object with user and isNewUser
        return done(null, { user, isNewUser });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize entire object so that req.user has both user and isNewUser
passport.serializeUser((data, done) => {
  // `data` here is { user, isNewUser }
  done(null, { id: data.user.id, isNewUser: data.isNewUser });
});

passport.deserializeUser(async (data, done) => {
  try {
    const user = await User.findById(data.id);
    done(null, { user, isNewUser: data.isNewUser });
  } catch (err) {
    done(err, null);
  }
});

export default passport;
