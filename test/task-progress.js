import { Selector } from 'testcafe';

fixture('Task progress')
    .page('http://localhost:5173/');

test('Progress shows 0% when no task is completed', async t => {
    // Arrange + Act
    await t.typeText(Selector('#todo-input'), 'Buy milk').pressKey('enter');

    // Assert
    await t.expect(Selector('#progress-count').innerText).eql('0 of 1 completed');
    await t.expect(Selector('#progress-percentage').innerText).eql('0%');
});

test('Progress updates when a task is completed', async t => {
    // Arrange
    const input = Selector('#todo-input');
    await t
        .typeText(input, 'Buy milk').pressKey('enter')
        .typeText(input, 'Walk the dog').pressKey('enter');

    // Act
    await t.click(Selector('.todo-item').withText('Buy milk').find('input[type="checkbox"]'));

    // Assert
    await t.expect(Selector('#progress-count').innerText).eql('1 of 2 completed');
    await t.expect(Selector('#progress-percentage').innerText).eql('50%');
});