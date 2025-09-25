import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const CACHE_DIR = path.join(process.cwd(), 'cache');
const CACHE_DURATION = 1000 * 60 * 60;

const initCache = async () => {
    try {
        await fs.access(CACHE_DIR);
    } catch {
        await fs.mkdir(CACHE_DIR, { recursive: true });
        console.log('Cache directory created');
    }
};

export const generateCacheKey = (userId, endpoint) => {
    const content = `${userId}-${endpoint}}`;
    return crypto.createHash('md5').update(content).digest('hex');
};

export const getCachedContent = async (userId, endpoint) => {
    if (!userId) return null;

    await initCache();
    
    const cacheKey = generateCacheKey(userId, endpoint);
    const cacheFile = path.join(CACHE_DIR, `${cacheKey}.json`);
    
    try {
        const stats = await fs.stat(cacheFile);
        if (Date.now() - stats.mtime.getTime() > CACHE_DURATION) {
            await fs.unlink(cacheFile);
            return null;
        }
        
        return JSON.parse(await fs.readFile(cacheFile, 'utf-8'));
    } catch (err) {
        return null;
    }
};

export const setCachedContent = async (userId, endpoint, content) => {
    if (!userId) return;
    
    const cacheKey = generateCacheKey(userId, endpoint);
    const cacheFile = path.join(CACHE_DIR, `${cacheKey}.json`);
    
    await fs.writeFile(cacheFile, JSON.stringify(content), 'utf-8');
};