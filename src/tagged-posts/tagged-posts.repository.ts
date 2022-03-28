import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { TaggedPost } from './entities/tagged-post.entity';

@EntityRepository(TaggedPost)
export class TaggedPostsRepository extends Repository<TaggedPost> {}
