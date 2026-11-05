import { Selector } from "testcafe";

fixture("Input validation").page("http://localhost:4173/");

test("Submitting an empty task shows an error message", async (t) => {
  // Act
  await t.click(Selector(".todo-form button"));

  // Assert
  await t.expect(Selector("#error-message").visible).ok();
  await t.expect(Selector("#todo-input").hasClass("input-error")).ok();
  await t.expect(Selector(".todo-item").count).eql(0);
});

test("A task with only spaces is not added", async (t) => {
  // Act
  await t.typeText(Selector("#todo-input"), "     ").pressKey("enter");

  // Assert
  await t.expect(Selector("#error-message").visible).ok();
  await t.expect(Selector(".todo-item").count).eql(0);
});
