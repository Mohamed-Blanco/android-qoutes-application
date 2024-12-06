import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatabaseConfig } from './database.model';
import { favourite } from './favourite';


@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    errorMessage!: string;
    private nativeDatabase!: SQLiteObject;
    isDbReady: boolean = false;

    constructor(private sqlite: SQLite) {
        this.initializeDatabase();
    }

    private dbConfig: DatabaseConfig = {
        name: 'favourites_database',
        tables: [
            {
                name: 'favourite',
                columns: {
                    id_favourite: 'INTEGER PRIMARY KEY',
                    content: 'TEXT NOT NULL UNIQUE',
                    author: 'TEXT NOT NULL',
                    created_at: 'DATE',
                },
            }
        ]
    };


    async initializeDatabase() {
        try {
            this.nativeDatabase = await this.sqlite.create({
                name: `${this.dbConfig.name}.db`,
                location: 'default'
            });
            await this.createNativeTables();
            this.isDbReady = true;
            console.log('Database inisialized seccusfully ')
        } catch (error) {
            console.error('Error initializing native database:', error);
        }
    }



    private async createNativeTables() {

        for (const table of this.dbConfig.tables) {
            const columnDefinitions = Object.entries(table.columns)
                .map(([name, type]) => `${name} ${type}`)
                .join(', ');

            const sql = `CREATE TABLE IF NOT EXISTS ${table.name} (${columnDefinitions})`;
            await this.nativeDatabase.executeSql(sql, []);
        }
    }

    isDatabaseReady(): boolean {
        return this.isDbReady;
    }

    async addTofavorites<T>(
        tableName: string,
        data: Omit<T, 'id_favourite' | 'created_at'>
    ): Promise<T> {
        const table = this.dbConfig.tables.find(t => t.name === tableName);
        if (!table) throw new Error(`Table ${tableName} not found`);

        if (this.nativeDatabase) {
            const columns = Object.keys(data);
            const values = Object.values(data);
            const placeholders = new Array(values.length).fill('?').join(', ');
            const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
            const result = await this.nativeDatabase.executeSql(sql, values);

            return {
                ...data,
                id: result.insertId,
                created_at: new Date().toISOString()
            } as T;
        } else {
            throw new Error('Native database not available' + tableName);
        }
    }

    async deleteFavourite(tableName: string, content: string): Promise<void> {
        if (this.nativeDatabase) {
            await this.nativeDatabase.executeSql(
                `DELETE FROM ${tableName} WHERE content = ?`,
                [content]
            );
        } else {
        }
    }



    async checkFavorite(tableName: string, content: string): Promise<boolean> {
        const sql = `SELECT * FROM ${tableName} WHERE content = ?`;
        const rows = await this.nativeDatabase.executeSql(sql, [content]);



        if (rows && rows.rows) {

            return rows.rows.length > 0;
        } else {
            console.error("Unexpected result structure:", rows);
            return false; // Or handle error appropriately
        }
    }



    async getAll<favourite>(tableName: string): Promise<favourite[]> {
        if (this.nativeDatabase) {
            const result = await this.nativeDatabase.executeSql(`SELECT * FROM ${tableName}`, []);
            const items: favourite[] = [];
            for (let i = 0; i < result.rows.length; i++) {
                items.push(result.rows.item(i));
            }
            return items;
        } else {
            throw new Error('Native database not available' + tableName);
        }
    }

}