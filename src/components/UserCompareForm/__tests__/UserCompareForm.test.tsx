import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCompareForm from "../UserCompareForm";

test('User input data', async () => {
    const onCompareMock = vi.fn()
    const user = userEvent.setup()
    render(<UserCompareForm onCompare={onCompareMock} />)

    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button', { name: /start/i })

    await user.type(inputs[0], 'chupikx228');
    await user.type(inputs[1], 'astrotall');

    await userEvent.click(button);
    expect(onCompareMock).toHaveBeenCalledWith('chupikx228', 'astrotall');
})

test('Empty user input data', async () => {
    const onCompareMock = vi.fn()
    const user = userEvent.setup()

    render(<UserCompareForm onCompare={onCompareMock} />)

    const button = screen.getByRole('button', { name: /start/i })

    await user.click(button);
    expect(onCompareMock).not.toHaveBeenCalled();
})

test('Both identical input data', async () => {
    const onCompareMock = vi.fn()
    const user = userEvent.setup()

    render(<UserCompareForm onCompare={onCompareMock} />)

    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByRole('button', { name: /start/i })
    await user.type(inputs[0], 'chupikx228');
    await user.type(inputs[1], 'chupikx228');

    await user.click(button);
    expect(onCompareMock).not.toHaveBeenCalled();
})
test('Half input data', async () => {
    const onCompareMock = vi.fn()

    const user = userEvent.setup()

    render(<UserCompareForm onCompare={onCompareMock} />)

    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByRole('button', { name: /start/i })

    await user.type(inputs[0], 'chupikx228');

    await user.click(button);
    expect(onCompareMock).not.toHaveBeenCalled()
})