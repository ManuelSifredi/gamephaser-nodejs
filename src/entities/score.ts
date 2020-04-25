import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToOne, JoinColumn, ManyToOne, Timestamp } from 'typeorm';
import User from './user';

@Entity()
export default class Score {

    @PrimaryGeneratedColumn()
    idscore: Number;

    @Column()
    score: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date: Timestamp;

    @ManyToOne(type => User, user => user.scores)
    user: User;
    
}