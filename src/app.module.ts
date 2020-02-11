import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';

@Module({
    imports: [
        TypegooseModule.forRootAsync({
            useClass: ConfigService,
        }),
        ConfigModule,
        UserModule,
        AuthModule,
        AdminModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes('*');
    }
}
