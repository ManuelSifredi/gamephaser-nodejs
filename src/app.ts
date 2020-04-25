import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import middlewarePassport from './middlewares/passport';
import 'reflect-metadata';

// Routes
import authRoutes from './routes/auth.routes';
import scoreRoutes from './routes/score.routes';
import profileRoutes from './routes/profile.routes';

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
        this.app.use('/api', scoreRoutes);
        this.app.use('/api', profileRoutes);
        this.routesCatches();
    }

    routesCatches(){
        // catch all other routes
        this.app.use((req, res, next) => {
            res.status(404).json({ message: '404 - Not Found' });
        });
        
        // handle errors
        this.app.use((err: any, req: any, res: any, next: Function) => {
            console.log(err.message);
            res.status(err.status || 500).json({ error: err.message });
        });
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port: ${this.app.get('port')}`);
        });
    }

}

export default Application;