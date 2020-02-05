import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigService } from './config/config.service';

@Module({
    imports: [
        TypegooseModule.forRootAsync({
            useClass: ConfigService,
        }),
        ConfigModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
