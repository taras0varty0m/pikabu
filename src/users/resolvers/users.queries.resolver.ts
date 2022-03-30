import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { ResponseSignInUserDto } from 'src/auth/dto/response-login-user.dto';
import { SignInUserInput } from 'src/auth/dto/sign-in.input';
import { UsersService } from '../users.service';
import { UserModel } from '../dto/user.model';
import { GetUserInput } from '../dto/get-user.dto';

@Resolver(() => UserModel)
export class UsersQueriesResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Query(() => [UserModel], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => ResponseSignInUserDto)
  login(@Args('signInUserInput') signInUserInput: SignInUserInput) {
    return this.authService.login(signInUserInput);
  }

  @Query(() => UserModel, { name: 'user' })
  findOne(
    @Args('getUserInput')
    getUserInput: GetUserInput,
  ) {
    return this.usersService.findOne(getUserInput);
  }
}
