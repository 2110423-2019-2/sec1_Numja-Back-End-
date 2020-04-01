import { Injectable } from '@nestjs/common';
import {
    TypegooseOptionsFactory,
    TypegooseModuleOptions,
} from 'nestjs-typegoose';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { StorageOptions } from '@google-cloud/storage';

@Injectable()
export class ConfigService
    implements TypegooseOptionsFactory, JwtOptionsFactory {
    getEnv(name: string): string {
        const env = process.env[name];
        if (env) {
            return env;
        }
        throw new Error(`${name} is undefined.`);
    }

    createTypegooseOptions(): TypegooseModuleOptions {
        return {
            uri: this.getEnv('MONGO_URL'),
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        };
    }

    createJwtOptions(): JwtModuleOptions {
        const options: JwtModuleOptions = {
            secret: this.secret,
        };
        if (this.getEnv('NODE_ENV') === 'production') {
            options.signOptions = { expiresIn: '60d' };
        }
        return options;
    }

    get secret(): string {
        return this.getEnv('SECRET');
    }

    get gcloudStorageOptions(): StorageOptions {
        const buff = Buffer.from(
            this.getEnv('GCLOUD_SERVICE_KEY_BASE64'),
            'base64',
        );
        const credentials = buff.toString('ascii');
        return {
            projectId: this.getEnv('GOOGLE_PROJECT_ID'),
            credentials: JSON.parse(credentials),
        };
    }

    get gcloudBucketName(): string {
        return this.getEnv('GCLOUD_BUCKET_NAME');
    }
}
