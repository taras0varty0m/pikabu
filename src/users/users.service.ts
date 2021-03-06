import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { SignUpUserInput } from './dto/sign-up.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import { GetUserInput } from './dto/get-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ResponseSignInUserDto } from 'src/auth/dto/response-login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private authService: AuthService,
  ) {}

  async login({ email }): Promise<ResponseSignInUserDto> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    return {
      access_token: await this.authService.signPayload(payload),
      user,
    };
  }

  findAll() {
    return this.usersRepository.find();
  }
  async findOne(getUserInput: GetUserInput) {
    const user = await this.usersRepository.findOne(getUserInput.id);

    if (!user) throw new NotFoundException(`User ${getUserInput.id} not found`);

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
