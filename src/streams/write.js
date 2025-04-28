import { createWriteStream } from 'node:fs';
import { join } from 'node:path';

const write = async () => {
    const filePath = join('src', 'streams', 'files', 'fileToWrite.txt');

    return new Promise((resolve, reject) => {
        const writableStream = createWriteStream(filePath);

        writableStream.on('error', () => reject(new Error('FS operation failed')));

        process.stdin.pipe(writableStream);

        writableStream.on('finish', () => resolve());
    });
};

await write();
