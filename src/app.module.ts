import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { DatasourceModule } from './datasource/datasource.module';

@Module({
  imports: [
    UsersModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'nest_mysql_typeorm_DB',
    //   // synchronize: true,
    //   entities: [User],
    // }),
    DatasourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
