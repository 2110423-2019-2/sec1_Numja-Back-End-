import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SanitizationPipe } from './pipe/sanitization.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('API docs')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
        new SanitizationPipe(),
    );
    
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
