import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import middlewarePassport from './middlewares/passport';
import 'reflect-metadata';

// Routes
import authRoutes from './routes/auth.routes';

class Application {

    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(morgan('dev'));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(passport.initialize());
        passport.use(middlewarePassport);
    }

    routes() {
        this.app.use('/api', authRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port: ${this.app.get('port')}`);
        });
    }

}

export default Application;