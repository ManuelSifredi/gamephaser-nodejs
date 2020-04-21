import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';

export interface IUSer {
    id: Number;
    email: String;
    password: String;
    comparePassword: (password: string) => Promise<Boolean>;
}

@Entity()
export default class User implements IUSer {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}