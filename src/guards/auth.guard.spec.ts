import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';
import { Test } from '@nestjs/testing';

describe('AuthGuard', () => {
    let userService: UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        exists: jest.fn((id: string) => id === '12345'),
                    },
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(new AuthGuard(userService)).toBeDefined();
    });
});
