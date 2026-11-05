import { Selector } from "testcafe";

fixture("Task priorities").page("http://localhost:4173/");

test("A new task gets the priority chosen in the dropdown", async (t) => {
  // Arrange
  const prioritySelect = Selector("#priority-select");

  // Act
  await t
    .click(prioritySelect)
    .click(prioritySelect.find("option").withAttribute("value", "high"))
    .typeText(Selector("#todo-input"), "Pay rent")
    .pressKey("enter");

  // Assert
  await t.expect(Selector(".todo-item .todo-priority").value).eql("high");
});

test("The priority of an existing task can be changed", async (t) => {
  // Arrange
  await t.typeText(Selector("#todo-input"), "Pay rent").pressKey("enter");
  const taskPriority = Selector(".todo-item .todo-priority");

  // Act
  await t
    .click(taskPriority)
    .click(taskPriority.find("option").withAttribute("value", "low"));

  // Assert
  await t.expect(Selector(".todo-item .todo-priority").value).eql("low");
});
