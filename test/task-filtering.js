import { Selector } from "testcafe";

fixture("Task filtering").page("http://localhost:4173/");

test("Active filter shows only tasks that are not completed", async (t) => {
  // Arrange
  const input = Selector("#todo-input");
  const items = Selector(".todo-item");

  await t
    .typeText(input, "Buy milk")
    .pressKey("enter")
    .typeText(input, "Walk the dog")
    .pressKey("enter")
    .click(items.withText("Buy milk").find('input[type="checkbox"]'));

  // Act
  await t.click(Selector(".filter-button").withText("Active"));

  // Assert
  await t.expect(items.count).eql(1);
  await t.expect(items.withText("Walk the dog").exists).ok();
});

test("Completed filter shows only completed tasks", async (t) => {
  // Arrange
  const input = Selector("#todo-input");
  const items = Selector(".todo-item");

  await t
    .typeText(input, "Buy milk")
    .pressKey("enter")
    .typeText(input, "Walk the dog")
    .pressKey("enter")
    .click(items.withText("Buy milk").find('input[type="checkbox"]'));

  // Act
  await t.click(Selector(".filter-button").withText("Completed"));

  // Assert
  await t.expect(items.count).eql(1);
  await t.expect(items.withText("Buy milk").exists).ok();
});
