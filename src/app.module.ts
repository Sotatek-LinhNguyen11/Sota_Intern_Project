import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { ArticleEntity } from './article/entity/article.entity';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
// Giai thich tai soa can co decorator Global ???
@Global()
@Module({
  imports: [
    ArticleModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-steep-mud-893551.ap-southeast-1.aws.neon.tech',
      // port: 5432,
      username: 'hocptit',
      password: 'A0qd5hQtsHcv',
      database: 'training',
      extra: {
        ssl: 'true',
      },
      entities: [UserEntity, ArticleEntity],
      synchronize: false,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
