/**
 * Test Scenario for RegisterInput Component:
 *
 * - should handle name typing correctly
 * - should handle email typing correctly
 * - should handle password typing correctly
 * - should call register function when register button is clicked
 */

import React from 'react';
import {
  describe, it, expect, vi, afterEach,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = screen.getByLabelText('Nama');

    // act
    await userEvent.type(nameInput, 'John Doe');

    // assert
    expect(nameInput).toHaveValue('John Doe');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = screen.getByLabelText('Email');

    // act
    await userEvent.type(emailInput, 'john@example.com');

    // assert
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = screen.getByLabelText('Kata sandi');

    // act
    await userEvent.type(passwordInput, 'secretpassword');

    // assert
    expect(passwordInput).toHaveValue('secretpassword');
  });

  it('should call register function when register button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = screen.getByLabelText('Nama');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Kata sandi');
    const registerButton = screen.getByRole('button', { name: 'Daftar' });

    // act
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'secretpassword');
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secretpassword',
    });
  });
});
