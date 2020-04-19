import { Injectable } from '@nestjs/common';
import { Bucket, Storage, UploadResponse } from '@google-cloud/storage';
import { ConfigService } from '../config/config.service';
import { removeSync } from 'fs-extra';
import { FileResponse, FileDTO } from './file.dto';

@Injectable()
export class FileService {
    private readonly bucket: Bucket;

    constructor(config: ConfigService) {
        const storage = new Storage(config.gcloudStorageOptions);
        const corsConfiguration = [
            {
                maxAgeSeconds: 3600,
                origin: ['*'],
                // responseHeader : {
                //     "Access-Control-Allow-Origin" : "*"
                // }
            },
        ];
        this.bucket = storage.bucket(config.gcloudBucketName);
        this.bucket.setCorsConfiguration(corsConfiguration);
    }

    async getFile(name: string): Promise<FileResponse> {
        const file = this.bucket.file(name);
        const HOUR_IN_SEC = 24 * 60 * 60 * 1000;
        const { contentType } = (await file.getMetadata())[0];
        const signedUrl = (
            await file.getSignedUrl({
                action: 'read',
                expires: Date.now() + HOUR_IN_SEC,
            })
        )[0];
        return { contentType, signedUrl };
    }

    async listFiles(prefix?: string): Promise<string[]> {
        const [files] = await this.bucket.getFiles({ prefix });
        return files.map((f) => f.name);
    }

    async upload(name: string, file: FileDTO) {
        await this.bucket.upload(file.path, {
            destination: name,
            contentType: file.mimetype,
            resumable: false,
        });
        removeSync(file.path);
    }

    deleteFile(name: string) {
        return this.bucket.file(name).delete();
    }

    deleteFiles(prefix: string) {
        return this.bucket.deleteFiles({ prefix });
    }
}
