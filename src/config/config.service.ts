import { Injectable } from '@nestjs/common';
import {
    TypegooseOptionsFactory,
    TypegooseModuleOptions,
} from 'nestjs-typegoose';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

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
        return {
            secret: this.secret,
            signOptions: {
                expiresIn: '60s',
            },
        };
    }

    get secret(): string {
        return this.getEnv('SECRET');
    }
}
