import { UserEntity } from 'src/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
enum ArticleGenre {
  'comic',
  'story',
  'novel',
  'literature',
}
@Entity({
  name: 'article',
})
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({
    type: 'enum',
    enum: ArticleGenre,
    default: ArticleGenre.literature,
    nullable: false,
  })
  topic: ArticleGenre;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  user: UserEntity;
}
