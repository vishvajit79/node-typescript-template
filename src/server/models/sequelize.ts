export interface SequelizeSecret {
  database: string;
  host: string;
  port: number;
  username: string;
  password: string;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | undefined;
}
