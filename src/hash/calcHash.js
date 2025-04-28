import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

const calculateHash = async () => {
    const filePath = join('src', 'hash', 'files', 'fileToCalculateHashFor.txt');
    
    return new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const stream = createReadStream(filePath);

        stream.on('error', () => reject(new Error('FS operation failed')));
        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => {
            const digest = hash.digest('hex');
            console.log(digest);
            resolve();
        });
    });
};

await calculateHash();
