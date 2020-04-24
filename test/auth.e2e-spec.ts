import * as request from 'supertest';

import { User } from '../src/model/user.model';
import { UserGender, UserRole, UserStatus } from '../src/enum/user.enum';

let app = 'http://localhost:3000';
const loginPayload = {
    username: 'admin1',
    password: 'admin1',
};

describe('Auth', () => {

    it('Testcase TCA1 should be invalid : username already exists', async () => {
        const user: User = {
            username: 'admin1',
            password: 'bruno1K258',
            email: 'b2b@mail.com',
            firstName: 'Nonthanat',
            lastName: 'Theeratanapartkul',
            address: 'Moo 5 Ban Kra Bye',
            birthDate: new Date(),
            ssin: 'G12NS38N04W9782',
            gender: UserGender.Male,
            role: UserRole.Tutor,
            status: UserStatus.Active,
            credit: 0,
            verified: false,
        };
        return await request(app)
            .post('/auth/register')
            .send(user)
            .expect(400);
    });

    it('Testcase TCA2 should be invalid : email is not in the right format', async () => {
        const user: User = {
            username: 'B-sh-X6',
            password: 'bruno1K258',
            email: 'b2b-Bad-mail.com',
            firstName: 'Nonthanat',
            lastName: 'Theeratanapartkul',
            address: 'Moo 5 Ban Kra Bye',
            birthDate: new Date(),
            ssin: 'G12NS38N04W9782',
            gender: UserGender.Male,
            role: UserRole.Tutor,
            status: UserStatus.Active,
            credit: 0,
            verified: false,
        };
        return await request(app)
            .post('/auth/register')
            .send(user)
            .expect(400);
    });
    it('Testcase TCA3 should be invalid : male gender not in GenderEnum format', async () => {
        const user = {
            username: 'B-sh-X5',
            password: 'bruno1K258',
            email: 'b2b@mail.com',
            firstName: 'Nonthanat',
            lastName: 'Theeratanapartkul',
            address: 'Moo 5 Ban Kra Bye',
            birthDate: new Date(),
            ssin: 'G12NS38N04W9782',
            gender: 'malee',
            role: UserRole.Tutor,
            status: UserStatus.Active,
            credit: 0,
            verified: false,
        };
        return await request(app)
            .post('/auth/register')
            .send(user)
            .expect(400);
    });
    it('Testcase TCA4 should be invalid : feamle gender not in GenderEnum format', async () => {
        const user = {
            username: 'B-sh-X4',
            password: 'bruno1K258',
            email: 'b2b@mail.com',
            firstName: 'Nonthanat',
            lastName: 'Theeratanapartkul',
            address: 'Moo 5 Ban Kra Bye',
            birthDate: new Date(),
            ssin: 'G12NS38N04W9782',
            gender: UserGender.Male,
            role: 'femalee',
            status: UserStatus.Active,
            credit: 0,
            verified: false,
        };
        return await request(app)
            .post('/auth/register')
            .send(user)
            .expect(400);
    });
    it('Testcase TCA5 should be invalid : student role gender not in RoleEnum format', async () => {
        const user = {
            username: 'B-sh-X3',
            password: 'bruno1K258',
            email: 'b2b@mail.com',
            firstName: 'Nonthanat',
            lastName: 'Theeratanapartkul',
            address: 'Moo 5 Ban Kra Bye',
            birthDate: new Date(),
            ssin: 'G12NS38N04W9782',
            gender: UserGender.Male,
            role: 'studentt',
            status: UserStatus.Active,
            credit: 0,
            verified: false,
        };
        return await request(app)
            .post('/auth/register')
            .send(user)
            .expect(400);
    });
    it('Testcase TCA6 should be invalid : tutor role gender not in RoleEnum format', async () => {
        const user = {
            username: 'B-sh-X2',
            password: 'bruno1K258',
            email: 'b2b@mail.com',
            firstName: 'Nonthanat',
            lastName: 'Theeratanapartkul',
            address: 'Moo 5 Ban Kra Bye',
            birthDate: new Date(),
            ssin: 'G12NS38N04W9782',
            gender: UserGender.Male,
            role: 'teacher',
            status: UserStatus.Active,
            credit: 0,
            verified: false,
        };
        return request(app)
            .post('/auth/register')
            .send(user)
            .expect(400);
    });
    let id1,id2;

    it('Testcase TCA7 should be valid : address can be optional(empty string)', async () => {
        const user = {
            username: 'B-sh-XXCszxc1',
            password: 'bruno1K258',
            email: 'b2asdasdb@mail.com',
            firstName: 'Nonthanat',
            lastName: 'Theeratanapartkul',
            address: '',
            birthDate: new Date(),
            ssin: 'G12NS38N04W9782',
            gender: UserGender.Male,
            role: UserRole.Tutor,
            status: UserStatus.Active,
            credit: 0,
            verified: false,
        };
        return await request(app)
            .post('/auth/register')
            .send(user)
            .expect(201)
    });

    it('Testcase TCA8 should be valid : all field is valid and username not existed', async () => {
        const user = {
            username: 'B-sh-X000',
            password: 'bruno1K258',
            email: 'b2b@mail.com',
            firstName: 'Nonthanat',
            lastName: 'Theeratanapartkul',
            address: 'Moo 5 Ban Kra Bye',
            birthDate: Date(),
            ssin: 'G12NS38N04W9782',
            gender: UserGender.Male,
            role: UserRole.Tutor,
            status: UserStatus.Active,
        };
        return await request(app)
            .post('/auth/register')
            .send(user)
            .expect(201)
    });
    console.log("-----------------------------------------------")
    it('Testcase TCA9 should be  Invalid : field firstName empty', async () => {
        const user = {
            username: 'B-sh-XXs',
            password: 'bruno1K258',
            email: 'b2b@mail.com',
            firstName: '',
            lastName: 'Theeratanapartkul',
            address: 'Moo 5 Ban Kra Bye',
            birthDate: Date(),
            ssin: 'G12NS38N04W9782',
            gender: UserGender.Male,
            role: UserRole.Tutor,
            status: UserStatus.Active,
        };
        return await request(app)
            .post('/auth/register')
            .send(user)
            .expect(400);
    });
});
