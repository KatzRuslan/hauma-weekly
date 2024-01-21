import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

const databaseUrl = join(__dirname, '..', 'assets/database.json');

@Injectable()
export class AppService {
    private async _readDB() {
        return new Promise((resolve) => {
            resolve(JSON.parse(fs.readFileSync(databaseUrl, 'utf8')));
        });
    }
    private async _witeDB(data) {
        return new Promise((resolve) => {
            fs.writeFileSync(databaseUrl, JSON.stringify(data, null, '\t'), 'utf8');
            resolve(true);
        });
    }
    async get(key?: string, id?: string) {
        const data = await this._readDB();
        if (!key) {
            return data;
        }
        return id ? data[key].find((d) => d.id === id) : data[key];
    }
    async set(data: any, key?: string) {
        const database = await this._readDB();
        database[key] = data;
        return await this._witeDB(database);
    }
    async post(data: any, key: string, check?: string) {
        const database = await this._readDB();
        if (!(data && key && database[key])) {
            throw new HttpException('not enough data', 403);
        }
        const list = database[key];
        if (check && list.find((item) => item[check] === data[check])) {
            throw new HttpException(`already exists`, 403);
        }
        list.push(data);
        return await this._witeDB(database);
    }
    async put(data: any, key: string, id: string, check?: string) {
        const database = await this._readDB();
        if (!(data && key && id && database[key])) {
            throw new HttpException('not enough data', 403);
        }
        const list = database[key] as any[];
        const index = list.findIndex((item) => item.id === id);
        if (index < 0) {
            throw new HttpException('does not exist', 403);
        }
        if (check && list.find((item) => item[check] === data[check] && item.id !== id)) {
            throw new HttpException(`already exists`, 403);
        }
        list[index] = { ...list[index], ...data };
        return await this._witeDB(database);
    }
    async delete(key?: string, id?: string) {
        const database = await this._readDB();
        if (!(key && id && database[key])) {
            throw new HttpException('not enough data', 403);
        }
        const list = database[key] as any[];
        const index = list.findIndex((item) => item.id === id);
        if (index < 0) {
            throw new HttpException('does not exist', 403);
        }
        list.splice(index, 1);
        return await this._witeDB(database);
    }
    generateUUID(mask = 'XXXY-XXXX-YXXXXXXXXXXX') {
        let d = new Date().getTime(); //Timestamp
        let d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
        return mask.replace(/[XY]/g, function (c) {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'X' ? r : (r & 0x3) | 0x8).toString(16);
        });
    }
    parseLink(link: string) {
        const candidate = `${link}`.toLowerCase().replace('://', '∇');
        const domain = candidate.split('/')[0].replace('∇', '://');
        const [selector] = `${candidate}`.replace('https∇', '').replace('http∇', '').replace('www.', '').split('.');
        return { domain, selector };
    }
}
