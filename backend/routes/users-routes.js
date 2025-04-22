import { Router } from 'express';

import { getUsers, signup, login } from '../controllers/users-controller.js';
import  { check } from 'express-validator';

import fileUpload from '../middleware/file-upload.js';
const router = Router();

router.get('/', getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  signup
);

router.post('/login', login);

export default router;
