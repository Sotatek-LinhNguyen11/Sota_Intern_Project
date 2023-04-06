import { ArticleEntity } from 'src/article/entity/article.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  age: number;

  @Column()
  interest: string;

  @Column()
  description: string;

  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles: ArticleEntity[];
}
