import { Selector } from 'testcafe';

fixture('LocalStorage persistence')
    .page('http://localhost:5173/');

test('Tasks are still there after refreshing the page', async t => {
    // Arrange
    await t.typeText(Selector('#todo-input'), 'Buy milk').pressKey('enter');

    // Act
    await t.eval(() => location.reload());

    // Assert
    await t.expect(Selector('.todo-item').withText('Buy milk').exists).ok();
});

test('Completed status is kept after refreshing the page', async t => {
    // Arrange
    await t
        .typeText(Selector('#todo-input'), 'Buy milk').pressKey('enter')
        .click(Selector('.todo-item input[type="checkbox"]'));

    // Act
    await t.eval(() => location.reload());

    // Assert
    await t.expect(Selector('.todo-item input[type="checkbox"]').checked).ok();
});