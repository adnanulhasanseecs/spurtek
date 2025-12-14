import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import ContactPage from '@/app/(marketing)/contact/page';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Contact Page', () => {
  it('should render contact form with initial step', () => {
    render(<ContactPage />);
    
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByLabelText('Industry')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Industry' })).toBeInTheDocument();
  });

  it('should navigate to step 2 when industry is selected and Next is clicked', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    // Select industry
    const industrySelect = screen.getByRole('combobox', { name: 'Industry' });
    await act(async () => {
      await user.selectOptions(industrySelect, 'Aviation');
    });

    // Click Next button
    const nextButton = screen.getByRole('button', { name: /^Next$/i });
    await act(async () => {
      await user.click(nextButton);
    });

    // Should show step 2
    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
    });
  });

  it('should navigate to step 3 when step 2 is completed', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    // Step 1: Select industry
    const industrySelect = screen.getByRole('combobox', { name: 'Industry' });
    await act(async () => {
      await user.selectOptions(industrySelect, 'Aviation');
    });

    const nextButton1 = screen.getByRole('button', { name: /^Next$/i });
    await act(async () => {
      await user.click(nextButton1);
    });

    // Step 2: Fill details
    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
    });

    const needTextarea = screen.getByLabelText(/what do you need help with/i);
    await act(async () => {
      await user.type(needTextarea, 'Need testing equipment');
    });

    const timelineSelect = screen.getByLabelText('Timeline');
    await act(async () => {
      await user.selectOptions(timelineSelect, '1-3 months');
    });

    const nextButton2 = screen.getByRole('button', { name: /^Next$/i });
    await act(async () => {
      await user.click(nextButton2);
    });

    // Step 3: Should show contact information form
    await waitFor(() => {
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    // Check for form fields
    await waitFor(() => {
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });
  });

  it('should allow going back to previous step', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    // Navigate to step 2
    const industrySelect = screen.getByRole('combobox', { name: 'Industry' });
    await act(async () => {
      await user.selectOptions(industrySelect, 'Aviation');
    });

    const nextButton = screen.getByRole('button', { name: /^Next$/i });
    await act(async () => {
      await user.click(nextButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
    });

    // Click Back button
    const backButton = screen.getByRole('button', { name: /Back/i });
    await act(async () => {
      await user.click(backButton);
    });

    // Should be back on step 1
    await waitFor(() => {
      expect(screen.getByLabelText('Industry')).toBeInTheDocument();
    });
  });

  it('should show success message after form submission', async () => {
    const user = userEvent.setup();
    
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, id: '123' }),
    });

    render(<ContactPage />);

    // Complete all steps
    const industrySelect = screen.getByRole('combobox', { name: 'Industry' });
    await act(async () => {
      await user.selectOptions(industrySelect, 'Aviation');
    });

    const nextButton1 = screen.getByRole('button', { name: /^Next$/i });
    await act(async () => {
      await user.click(nextButton1);
    });

    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
    });

    const needTextarea = screen.getByLabelText(/what do you need help with/i);
    await act(async () => {
      await user.type(needTextarea, 'Test requirement');
    });

    const timelineSelect = screen.getByLabelText('Timeline');
    await act(async () => {
      await user.selectOptions(timelineSelect, '1-3 months');
    });

    const nextButton2 = screen.getByRole('button', { name: /^Next$/i });
    await act(async () => {
      await user.click(nextButton2);
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    });

    // Fill step 3
    await act(async () => {
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    await act(async () => {
      await user.click(submitButton);
    });

    // Should show success message
    await waitFor(() => {
      expect(screen.getByText('Thank You!')).toBeInTheDocument();
    });
  });
});

