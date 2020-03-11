import {
    Controller,
    UseGuards,
    Get,
    Param,
    Post,
    Body,
    Patch,
} from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enum/user.enum';
import { UpdateReviewDTO, CreateReviewDTO } from './review.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@ApiBearerAuth()
@ApiTags('Review')
@UseGuards(AuthGuard, RolesGuard)
@Controller('review')
export class ReviewController {
    constructor(private readonly service: ReviewService) {}

    @Roles(UserRole.Student, UserRole.Tutor)
    @Post('create')
    create(
        @Body() createReviewDTO: CreateReviewDTO,
        @UserId() reviewerId: string,
    ) {
        return this.service.create(createReviewDTO, reviewerId);
    }

    @Roles(UserRole.Admin)
    @Get()
    find() {
        return this.service.find();
    }

    @Roles(UserRole.Admin)
    @Get('reviewer/:reviewerId')
    findByReviewerId(@Param('reviewerId') reviewerId: string) {
        return this.service.findByReviewerUserId(reviewerId);
    }

    @Get('reviews/:reviewedId')
    findByReviewedId(@Param('reviewedId') reviewedId: string) {
        return this.service.findByReviewedUserId(reviewedId);
    }

    @Get('id/:id')
    findById(@Param('id') id: string) {
        return this.service.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReviewDTO: UpdateReviewDTO) {
        return this.service.update(id, updateReviewDTO);
    }
}
