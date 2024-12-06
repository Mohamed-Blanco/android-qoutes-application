// src/app/models/database.model.ts
export interface DatabaseTable {
    name: string;
    columns: {
        [key: string]: string;  // column name: data type
    };

}

export interface DatabaseConfig {
    name: string;
    tables: DatabaseTable[];
}

