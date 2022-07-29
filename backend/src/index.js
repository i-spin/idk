import 'dotenv/config';
import cero from '0http';
import Mood from './routes/auth/mood.js';
import Authorization from './routes/authorization.js';
import Home from './routes/home.js';

const { router, server } = cero();

const port = process.env.PORT || 8080;

router.get('/', Home);

router.use('/auth', Authorization);
router.post('/auth/mood', Mood);

server.listen(port);

// eslint-disable-next-line no-console
console.log(`Listening on port ${port}`);
