import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/paginate-response.dto';
import { CommentModel } from './comment.model';

@ObjectType()
export class PaginatedComments extends Paginated(CommentModel) {}
