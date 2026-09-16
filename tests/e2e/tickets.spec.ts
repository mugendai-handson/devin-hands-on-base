import { expect, test } from "@playwright/test";

test("shows the ticket list", async ({ page }) => {
  await page.goto("/tickets");

  await expect(page.getByRole("heading", { name: "Tickets" })).toBeVisible();
  await expect(page.getByText("Login button does not respond")).toBeVisible();
});

test("creates a ticket", async ({ page }) => {
  const title = "Document the hands-on workflow";
  await page.goto("/tickets/new");

  await page.getByLabel("Title").fill(title);
  await page
    .getByLabel("Description")
    .fill("Add a short guide for the next hands-on participant.");
  await page.getByRole("button", { name: "Create ticket" }).click();

  await expect(page.getByRole("heading", { name: title })).toBeVisible();
  await expect(page.getByText("Open", { exact: true }).first()).toBeVisible();
});

test("changes a ticket status", async ({ page }) => {
  await page.goto("/tickets");
  await page.getByRole("link", { name: "Login button does not respond" }).click();

  await page.getByLabel("Status").click();
  await page.getByRole("option", { name: "Done" }).click();
  await page.getByRole("button", { name: "Update status" }).click();
  await page.reload();

  await expect(page.getByText("Done", { exact: true }).first()).toBeVisible();
});
