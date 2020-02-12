import { JwtMiddleware } from './jwt.middleware';
import { AuthService } from '../auth/auth.service';
import { Test } from '@nestjs/testing';

describe('JwtMiddleware', () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        verify: jest.fn((jwt: string) => ({ userId: jwt })),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(new JwtMiddleware(authService)).toBeDefined();
    });
});
