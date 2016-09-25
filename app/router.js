import { Router } from 'express';
import * as Lists from './controllers/list_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

router.get('/profile', requireAuth, UserController.getUser);

router.get('/profile/:id', UserController.getAuthor);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Undecided!' });
});

router.route('/lists/:id')
  .get((req, res) => {
    Lists.getList(req, res);
  })
  .put(requireAuth, (req, res) => {
    Lists.updateList(req, res);
  })
  .delete(requireAuth, (req, res) => {
    Lists.deleteList(req, res);
  });

router.route('/lists')
  .get((req, res) => {
    Lists.getLists(req, res);
  })
  .post(requireAuth, (req, res) => {
    Lists.createList(req, res);
  });

export default router;
