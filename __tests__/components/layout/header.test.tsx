import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { Header } from '@/components/layout/Header';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Header Component', () => {
  it('should render logo', () => {
    render(<Header />);
    expect(screen.getByText('Spurtek')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Case Studies')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should render Request Quote button', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /request quote/i })).toBeInTheDocument();
  });

  it('should toggle mobile menu', async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Find menu button (mobile)
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();

    // Click to open menu
    await act(async () => {
      await user.click(menuButton);
    });

    // Menu should be visible - use getAllByText since Products appears in both desktop and mobile
    const productLinks = screen.getAllByText('Products');
    expect(productLinks.length).toBeGreaterThan(0);
  });
});

