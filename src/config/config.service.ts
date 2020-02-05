import { Injectable } from '@nestjs/common';
import {
    TypegooseOptionsFactory,
    TypegooseModuleOptions,
} from 'nestjs-typegoose';

@Injectable()
export class ConfigService implements TypegooseOptionsFactory {
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
}
