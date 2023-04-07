import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { ArticleEntity } from './article/entity/article.entity';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
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
      synchronize: true,
    }),
    AuthModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
