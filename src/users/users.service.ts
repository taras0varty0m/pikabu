import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { SignUpUserInput } from './dto/sign-up.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`User not found`);
    return await this.usersRepository.remove(user);
  }

  async create(createUserInput: SignUpUserInput) {
    if (await this.usersRepository.findOne({ email: createUserInput.email })) {
      throw new ConflictException('User already exist');
    }
    const user = User.create(createUserInput);
    return await user.save();
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserInput,
    });
    if (!user) throw new NotFoundException(`User not found`);
    return await this.usersRepository.save(user);
  }
}
