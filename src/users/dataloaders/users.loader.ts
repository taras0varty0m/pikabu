import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'src/libs/NestDataloader';
import { UserModel } from '../dto/user.model';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UsersDataLoader implements NestDataLoader<string, UserModel> {
  constructor(private readonly usersRepository: UsersRepository) {}

  generateDataLoader(): DataLoader<string, UserModel, string> {
    return new DataLoader(async (userIds) => {
      const users = await this.usersRepository.findByIds(userIds as string[]);

      return userIds.map((id) => users.find((user) => user.id === id));
    });
  }
}
