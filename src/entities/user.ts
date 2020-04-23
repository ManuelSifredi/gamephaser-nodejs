import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import Score from './score';

export interface IUSer {
    iduser: Number;
    email: String;
    password: String;
    comparePassword: (password: string) => Promise<Boolean>;
}

@Entity()
export default class User implements IUSer {

    @PrimaryGeneratedColumn()
    iduser: Number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Score, score => score.user)
    scores: Score[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}