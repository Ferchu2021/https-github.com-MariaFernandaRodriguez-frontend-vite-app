import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Input from '../input'

describe('Input Component', () => {
  it('renders input with label', () => {
    const handleChange = vi.fn()
    render(
      <Input
        label="Email"
        name="email"
        value=""
        onChange={handleChange}
      />
    )
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders input without label', () => {
    const handleChange = vi.fn()
    render(
      <Input
        name="email"
        value=""
        onChange={handleChange}
      />
    )
    
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.queryByText('Email')).not.toBeInTheDocument()
  })

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn()
    render(
      <Input
        name="email"
        value=""
        onChange={handleChange}
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('displays error message when error prop is provided', () => {
    const handleChange = vi.fn()
    render(
      <Input
        name="email"
        value=""
        onChange={handleChange}
        error="Invalid email format"
      />
    )
    
    expect(screen.getByText('Invalid email format')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('input-error')
  })

  it('is disabled when disabled prop is true', () => {
    const handleChange = vi.fn()
    render(
      <Input
        name="email"
        value=""
        onChange={handleChange}
        disabled
      />
    )
    
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders with correct type attribute', () => {
    const handleChange = vi.fn()
    render(
      <Input
        name="password"
        type="password"
        value=""
        onChange={handleChange}
      />
    )
    
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password')
  })

  it('displays placeholder text', () => {
    const handleChange = vi.fn()
    render(
      <Input
        name="email"
        value=""
        onChange={handleChange}
        placeholder="Enter your email"
      />
    )
    
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const handleChange = vi.fn()
    render(
      <Input
        name="email"
        value=""
        onChange={handleChange}
        className="custom-input"
      />
    )
    
    const container = screen.getByRole('textbox').parentElement
    expect(container).toHaveClass('input-container')
    expect(container).toHaveClass('custom-input')
  })
}) 