import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/users/entities/user.entity';

export default class UserSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    await factory(User)().create();
  }
}
