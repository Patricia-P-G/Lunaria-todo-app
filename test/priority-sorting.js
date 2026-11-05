import { Selector } from "testcafe";

fixture("Priority sorting").page("http://localhost:4173/");

const addTask = async (t, text, priority) => {
  const prioritySelect = Selector("#priority-select");
  await t
    .click(prioritySelect)
    .click(prioritySelect.find("option").withAttribute("value", priority))
    .typeText(Selector("#todo-input"), text)
    .pressKey("enter");
};

test("High to Low shows the high priority task first", async (t) => {
  // Arrange
  await addTask(t, "Low task", "low");
  await addTask(t, "High task", "high");
  const sortSelect = Selector("#sort-select");

  // Act
  await t
    .click(sortSelect)
    .click(sortSelect.find("option").withAttribute("value", "high-to-low"));

  // Assert
  await t.expect(Selector(".todo-item").nth(0).innerText).contains("High task");
});

test("Low to High shows the low priority task first", async (t) => {
  // Arrange
  await addTask(t, "High task", "high");
  await addTask(t, "Low task", "low");
  const sortSelect = Selector("#sort-select");

  // Act
  await t
    .click(sortSelect)
    .click(sortSelect.find("option").withAttribute("value", "low-to-high"));

  // Assert
  await t.expect(Selector(".todo-item").nth(0).innerText).contains("Low task");
});
