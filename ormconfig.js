module.exports = {
  type: process.env.CONNECTION,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  seeds: ['dist/database/seeds/*.seed{.ts,.js}'],
  factories: ['dist/database/factories/*.factory{.ts,.js}'],
  autoLoadEntities: true,
  logging: 'all',
  synchronize: false,
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
