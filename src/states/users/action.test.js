/**
 * Test Scenario for asyncReceiveUsers thunk:
 *
 * - should dispatch action correctly when data fetching success
 */

import {
  describe, it, expect, beforeEach, afterEach, vi,
} from 'vitest';
import api from '../../utils/api';
import { asyncReceiveUsers, receiveUsersActionCreator } from './action';

const fakeUsers = [
  {
    id: 'user-1',
    name: 'User 1',
    email: 'user1@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

describe('asyncReceiveUsers thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    delete api._getAllUsers;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getAllUsers = () => Promise.resolve(fakeUsers);
    const dispatch = vi.fn();

    // act
    await asyncReceiveUsers()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers));
  });
});
