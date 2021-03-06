import jwt from 'jsonwebtoken';

interface UserId {
  id: string;
}

export const generateAccessToken = (userId: UserId) => {
  return jwt.sign(userId, process.env.JWT_SECRET as string, {});
};