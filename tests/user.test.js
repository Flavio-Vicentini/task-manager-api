import request from 'supertest'
import app from '../src/app'
import { test } from '@jest/globals'
import User from '../src/models/User'
import {userOne,userOneId,setupDataBase} from './fixtures/db'

beforeEach(setupDataBase)

test('should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name : 'Tester',
        email: 'test@test.com',
        password: '12345678'
    }).expect(201)

    //assert that database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //asserts about the response
    expect(response.body).toMatchObject({
        user:{
            name : 'Tester',
            email: 'test@test.com',
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('12345678')
})

test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: 'nonexisting@user.com',
        password: userOne.password
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/teste.png')
        .expect(200)
        const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Teste2'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Teste2')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            otherName: 'Fail'
        })
        .expect(400)
})