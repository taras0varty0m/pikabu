import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { CurrentUser } from 'src/users/entities/user.decorator';
import { SignUpUserInput } from '../dto/sign-up.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UsersService } from '../users.service';
import { UserModel } from '../dto/user.model';

@Resolver(() => UserModel)
export class UsersMutationsResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserModel)
  createUser(@Args('createUserDto') createUserDto: SignUpUserInput) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => UserModel)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user,
  ) {
    return this.usersService.update(user.id, updateUserInput);
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => UserModel)
  removeUser(@CurrentUser() user) {
    return this.usersService.remove(user.id);
  }
}
