import * as bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import AppError from '../../errors/AppError';
import { generateToken } from '../../utils/generateToken';
import prisma from '../../utils/prisma';

const loginUserFromDB = async (payload: {
  email: string;
  fullName: string;
  password: string;
}) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      OR: [
        { email: payload.email },
        { fullName: payload.fullName, }
      ]
     
    },
  });
  const isCorrectPassword: Boolean = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password incorrect');
  }

  const accessToken = await generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expires_in as string,
  );
  return {
    id: userData.id,
    name: userData.fullName,
    email: userData.email,
    role: userData.role,
    accessToken: accessToken,
  };
};

export const AuthServices = { loginUserFromDB };
