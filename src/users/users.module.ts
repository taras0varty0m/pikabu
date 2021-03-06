import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersMutationsResolver } from './resolvers/users.mutations.resolver';
import { UsersQueriesResolver } from './resolvers/users.queries.resolver';
import { UsersFieldsResolver } from './resolvers/users.fields.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), AuthModule],
  providers: [
    UsersService,
    UsersMutationsResolver,
    UsersFieldsResolver,
    UsersQueriesResolver,
  ],
  exports: [UsersService],
})
export class UsersModule {}
