import { Router } from 'express';
import * as Messages from './controllers/message_controller';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

router.get('/profile', requireAuth, UserController.getUser);

router.get('/profile/:id', UserController.getAuthor);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Digup!' });
});

router.route('/messages/:id')
  .get((req, res) => {
    Messages.getMessage(req, res);
  })
  .put((req, res) => {
    Messages.updateMessage(req, res);
  })
  .delete((req, res) => {
    Messages.deleteMessage(req, res);
  });

router.route('/messages')
  .get((req, res) => {
    Messages.getMessages(req, res);
  })
  .post((req, res) => {
    Messages.createMessage(req, res);
  });


router.route('/posts/:id')
  .get((req, res) => {
    Posts.getPost(req, res);
  })
  .put(requireAuth, (req, res) => {
    Posts.updatePost(req, res);
  })
  .delete(requireAuth, (req, res) => {
    Posts.deletePost(req, res);
  });

router.route('/posts')
  .get((req, res) => {
    Posts.getPosts(req, res);
  })
  .post(requireAuth, (req, res) => {
    Posts.createPost(req, res);
  });

// /your routes will go here

export default router;
