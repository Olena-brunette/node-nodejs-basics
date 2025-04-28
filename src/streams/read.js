import { createReadStream } from 'node:fs';
import { join } from 'node:path';

const read = async () => {
    const filePath = join('src', 'streams', 'files', 'fileToRead.txt');

    return new Promise((resolve, reject) => {
        const stream = createReadStream(filePath);

        stream.on('error', () => reject(new Error('FS operation failed')));

        stream.pipe(process.stdout);

        stream.on('end', () => resolve());
    });
};

await read();
