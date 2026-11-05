import { Selector } from "testcafe";

fixture("Task CRUD").page("http://localhost:4173/");

test("Adding a task shows it in the list", async (t) => {
  // Arrange
  const input = Selector("#todo-input");

  // Act
  await t.typeText(input, "Buy milk").pressKey("enter");

  // Assert
  await t.expect(Selector(".todo-item").count).eql(1);
  await t.expect(Selector(".todo-item").withText("Buy milk").exists).ok();
});

test("Editing a task changes its text", async (t) => {
  // Arrange
  await t.typeText(Selector("#todo-input"), "Buy milk").pressKey("enter");

  // Act
  await t
    .click(Selector(".edit-button"))
    .typeText(Selector(".todo-edit-input"), "Buy bread", { replace: true })
    .click(Selector(".save-button"));

  // Assert
  await t.expect(Selector(".todo-item").withText("Buy bread").exists).ok();
});

test("Deleting a task removes it from the list", async (t) => {
  // Arrange
  await t.typeText(Selector("#todo-input"), "Buy milk").pressKey("enter");

  // Act
  await t.click(Selector(".delete-button"));

  // Assert
  await t.expect(Selector(".todo-item").count).eql(0);
});
