import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

const compress = async () => {
    const sourcePath = join('src', 'zip', 'files', 'fileToCompress.txt');
    const destinationPath = join('src', 'zip', 'files', 'archive.gz');

    try {
        await pipeline(
            createReadStream(sourcePath),
            createGzip(),
            createWriteStream(destinationPath)
        );
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await compress();
