import express from 'express';
import {
  createComment,
  getVideosForHomePage,
  addLike,
  addDislike,
  editComment,
  deleteComment,
  filterVideos
} from '../controllers/videoController.js';
import { verifyToken } from '../auth.js';

const router = express.Router();

router.route('/').get(getVideosForHomePage);
router.post('/:id/like', verifyToken, addLike);
router.post('/:id/dislike', verifyToken, addDislike);
router.post('/:videoId/comments', verifyToken, createComment);
router.patch('/:videoId/comments/:index', verifyToken, editComment);
router.delete('/:videoId/comments/:index', verifyToken, deleteComment);
router.post('/filter', filterVideos);
export default router;
