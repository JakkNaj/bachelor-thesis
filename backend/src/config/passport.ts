import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import { prisma } from '../app';

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: jwtPayload.id }
        });
        
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export { passport };