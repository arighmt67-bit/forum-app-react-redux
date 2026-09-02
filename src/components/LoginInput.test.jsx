/**
 * Test Scenario for LoginInput Component:
 *
 * - should handle email typing correctly
 * - should handle password typing correctly
 * - should call login function when login button is clicked
 */

import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByLabelText('Email');

    // act
    await userEvent.type(emailInput, 'john@example.com');

    // assert
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByLabelText('Kata sandi');

    // act
    await userEvent.type(passwordInput, 'secretpassword');

    // assert
    expect(passwordInput).toHaveValue('secretpassword');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Kata sandi');
    const loginButton = screen.getByRole('button', { name: 'Masuk' });

    // act
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'secretpassword');
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'secretpassword',
    });
  });
});
