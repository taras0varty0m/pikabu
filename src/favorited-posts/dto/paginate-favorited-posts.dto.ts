import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/paginate-response.dto';
import { FavoritedPostModel } from './favorited-post.model';

@ObjectType()
export class PaginatedFavoritedPosts extends Paginated(FavoritedPostModel) {}
