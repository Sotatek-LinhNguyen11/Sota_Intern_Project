import { UserEntity } from 'src/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
export enum ArticleGenre {
  'comic' = 'comic',
  'story' = 'story',
  'novel' = 'novel',
  'literature' = 'literature',
}
@Entity({
  name: 'article',
})
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: ArticleGenre,
    default: ArticleGenre.literature,
    nullable: true,
  })
  topic: ArticleGenre;

  @Column({ nullable: true })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  user: UserEntity;
}
