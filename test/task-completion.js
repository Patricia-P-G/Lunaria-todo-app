import { Selector } from 'testcafe';

fixture('Task completion')
    .page('http://localhost:5173/');

test('Clicking the checkbox marks a task as completed', async t => {
    // Arrange
    const input = Selector('#todo-input');
    const checkbox = Selector('.todo-item input[type="checkbox"]');

    await t
        .typeText(input, 'Buy milk')
        .pressKey('enter');

    // Act
    await t.click(checkbox);

    // Assert
    await t.expect(checkbox.checked).ok();
});

test('Clicking the checkbox twice marks the task as not completed again', async t => {
    // Arrange
    const input = Selector('#todo-input');
    const checkbox = Selector('.todo-item input[type="checkbox"]');

    await t
        .typeText(input, 'Buy milk')
        .pressKey('enter');

    // Act
    await t
        .click(checkbox)
        .click(checkbox);

    // Assert
    await t.expect(checkbox.checked).notOk();
});