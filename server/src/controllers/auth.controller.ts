import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthRequest } from '../middleware/auth.middleware';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result,
  });
});

export const me = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'User fetched successfully',
    data: { user: req.user },
  });
});
