import { User } from 'src/users/entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, (faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = faker.random.words(1);
  return user;
});
