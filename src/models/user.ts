import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    DeleteDateColumn, OneToMany
} from "typeorm";
import { Post } from "./post";
import {Comment} from './comment';
import {JoinTable} from "typeorm/browser";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('string', {default: '', nullable: true})
    firstName!: string | undefined;

    @Column('string', {default: '', nullable: true})
    lastName!: string;

    @Column()
    username!: string;

    @Column('string', {default: '', nullable: true})
    email!: string;

    @Column('string', {default: '', nullable: true})
    password!: string;

    @Column('number', {default: 0, nullable: true})
    authority!: number;

    @Column('boolean', {default: true, nullable: true})
    confirmation!: boolean;

    @ManyToOne(() => User, user => user.id)
    create_user!: Array<User>;

    @ManyToOne(() => User, user => user.id)
    update_user!: Array<User>;

    @ManyToOne(() => User, user => user.id)
    delete_user!: Array<User>;

    @OneToMany(_type => Post, (post: Post) => post.user)
    posts!: Array<Post>

    @OneToMany(_type=> Comment, (comment: Comment) => comment.user)
    comments!: Array<Comment>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deleteAt!: Date;
}
