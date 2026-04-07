import { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthRequest } from '../middleware/auth.middleware';
import * as rsvpsService from '../services/rsvps.service';

export const getMyRsvps = asyncHandler(async (req: AuthRequest, res: Response) => {
  const rsvps = await rsvpsService.getUserRsvps(req.user!.id);
  
  res.status(200).json({
    success: true,
    message: 'RSVPs fetched successfully',
    data: rsvps
  });
});

export const createRsvp = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { eventId, note } = req.body;
  
  if (!eventId) {
    res.status(400).json({ success: false, message: 'Event ID is required' });
    return;
  }

  const rsvp = await rsvpsService.createRsvp(req.user!.id, eventId, note);

  res.status(201).json({
    success: true,
    message: 'RSVP submitted successfully',
    data: rsvp
  });
});

export const updateStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ success: false, message: 'Status is required' });
    return;
  }

  const rsvp = await rsvpsService.updateRsvpStatus(req.params.id, req.user!.id, status);

  res.status(200).json({
    success: true,
    message: 'RSVP status updated successfully',
    data: rsvp
  });
});
