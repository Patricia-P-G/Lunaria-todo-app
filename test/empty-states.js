import { Selector } from 'testcafe';

fixture('Empty states')
    .page('http://localhost:5173/');

test('An empty list shows the "no tasks yet" message', async t => {
    // Assert
    await t.expect(Selector('.empty-state').innerText).contains('No tasks yet');
});

test('Active filter shows a message when all tasks are completed', async t => {
    // Arrange
    await t
        .typeText(Selector('#todo-input'), 'Buy milk').pressKey('enter')
        .click(Selector('.todo-item input[type="checkbox"]'));

    // Act
    await t.click(Selector('.filter-button').withText('Active'));

    // Assert
    await t.expect(Selector('.empty-state').innerText).contains('No active tasks');
});