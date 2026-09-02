/**
 * Test Scenario for authUser thunks:
 *
 * asyncSetAuthUser thunk:
 * - should dispatch action correctly when data fetching success
 * - should dispatch action and call alert correctly when data fetching failed
 *
 * asyncUnsetAuthUser thunk:
 * - should dispatch action and remove token correctly
 *
 * asyncRegisterUser thunk:
 * - should dispatch action correctly when registration success
 * - should dispatch action and call alert correctly when registration failed
 */

import {
  describe, it, expect, beforeEach, afterEach, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

const fakeAuthUser = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeToken = 'fake-token';
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.login = () => Promise.resolve(fakeToken);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    const dispatch = vi.fn();

    // act
    await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.login = () => Promise.reject(fakeErrorResponse);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // act
    try {
      await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch);
    } catch {
      // expected error
    }

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    api._removeAccessToken = api.removeAccessToken;
  });

  afterEach(() => {
    api.removeAccessToken = api._removeAccessToken;
    delete api._removeAccessToken;
  });

  it('should dispatch action and remove token correctly', () => {
    // arrange
    api.removeAccessToken = vi.fn();
    const dispatch = vi.fn();

    // act
    asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.removeAccessToken).toHaveBeenCalled();
  });
});

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;
    delete api._register;
  });

  it('should dispatch action correctly when registration success', async () => {
    // arrange
    api.register = () => Promise.resolve({ id: 'user-1' });
    const dispatch = vi.fn();

    // act
    await asyncRegisterUser({
      name: 'User 1',
      email: 'user1@example.com',
      password: 'password',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when registration failed', async () => {
    // arrange
    api.register = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // act
    try {
      await asyncRegisterUser({
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password',
      })(dispatch);
    } catch {
      // expected
    }

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
