import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

const decompress = async () => {
    const sourcePath = join('src', 'zip', 'files', 'archive.gz');
    const destinationPath = join('src', 'zip', 'files', 'fileToCompress.txt');

    try {
        await pipeline(
            createReadStream(sourcePath),
            createGunzip(),
            createWriteStream(destinationPath)
        );
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await decompress();
