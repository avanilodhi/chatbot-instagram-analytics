import express from 'express';
import { getAnalytics,  exportAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/data', getAnalytics); // GET /api/analytics/data

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, 'secretkey'); // use process.env.JWT_SECRET
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/export', verifyToken, exportAnalytics);

export default router;
