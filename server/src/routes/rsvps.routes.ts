import { Router } from 'express';
import { getMyRsvps, createRsvp, updateStatus } from '../controllers/rsvps.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

// Volunteers getting their basic RSVPs or creating one
router.get('/', getMyRsvps);
router.post('/', createRsvp);

// Organizer updating status of an RSVP
router.patch('/:id/status', requireRole(['ORGANIZER', 'ADMIN']), updateStatus);

export default router;
