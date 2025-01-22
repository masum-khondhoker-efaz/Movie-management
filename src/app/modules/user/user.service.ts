import { User, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import emailSender from '../../utils/emailSender';
import config from '../../../config';

interface UserWithOptionalPassword extends Omit<User, 'password'> {
  password?: string;
}

const registerUserIntoDB = async (payload: {
  email: string;
  fullName: string;
  password: string;
}) => {
  if (payload.email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: payload.email,
          },
          {
            fullName: payload.fullName,
          },
        ],
      },
    });
    if (existingUser) {
      throw new AppError(
        httpStatus.CONFLICT,
        'User already exists with this username or email!',
      );
    }
  }

  if (!payload.password) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is required!');
  }
  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  const userData = {
    ...payload,
    password: hashedPassword,
    status: UserStatus.ACTIVE,
  };

  const user = await prisma.user.create({
    data: userData,
  });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not created!');
  }

  const userWithoutPassword: UserWithOptionalPassword = { ...user };
  delete userWithoutPassword.password;
  return userWithoutPassword;
};

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getMyProfileFromDB = async (id: string) => {
  const Profile = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return Profile;
};

const getUserDetailsFromDB = async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

const updateMyProfileIntoDB = async (id: string, payload: any) => {
  const userData = payload;
  // Update user data
  const updatedUser = await prisma.user.update({
    where: { id },
    data: userData,
  });

  if (!updatedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not updated!');
  }

  const userWithoutPassword: UserWithOptionalPassword = { ...updatedUser };
  delete userWithoutPassword.password;
  return userWithoutPassword;
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new Error('Password incorrect!');
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: 'Password changed successfully!',
  };
};

export const UserServices = {
  registerUserIntoDB,
  getAllUsersFromDB,
  getMyProfileFromDB,
  getUserDetailsFromDB,
  updateMyProfileIntoDB,
  changePassword,
};
