import { test } from '@jest/globals'
import request from 'supertest'
import app from '../src/app'
import Task from '../src/models/Task'
import {userOne,userOneId,setupDataBase} from './fixtures/db'

beforeEach(setupDataBase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'from my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})