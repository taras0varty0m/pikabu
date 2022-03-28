import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/paginate-response.dto';
import { PostModel } from './post.model';

@ObjectType()
export class PaginatedPosts extends Paginated(PostModel) {}
