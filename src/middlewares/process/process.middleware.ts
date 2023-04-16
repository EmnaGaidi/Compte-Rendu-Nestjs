import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}
@Injectable()
export class ProcessMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['auth-user'];
    console.log('authHeader', authHeader);
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'ne pas pouvoir accèder à la ressource' });
    }
    const token = authHeader.split(' ')[1];
    console.log('token', token);
    if (!token) {
      return res
        .status(401)
        .json({ message: 'ne pas pouvoir accèder à la ressource' });
    }
    try {
      const decodedToken = jwt.verify(token, 'secret-key') as JwtPayload; //la fonction verify est de type JwtPayload
      if (!decodedToken.userId) {
        return res
          .status(401)
          .json({ message: 'ne pas pouvoir accèder à la ressource' });
      }
      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'ne pas pouvoir accèder à la ressource' });
    }
  }
}
