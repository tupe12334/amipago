import { describe, it, expect } from "vitest";
import { StorageUserSchema, CreateUserSchema } from "./StorageUser";
import { v4 as uuidv4 } from "uuid";

describe("StorageUser Schema", () => {
  it("should validate a valid user object", () => {
    const validUser = {
      id: "current-user",
      userId: uuidv4(),
      createdAt: new Date(),
      lastActive: new Date(),
    };

    const result = StorageUserSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("should validate a user object with settings", () => {
    const validUser = {
      id: "current-user",
      userId: uuidv4(),
      createdAt: new Date(),
      settings: {
        theme: "dark",
        language: "he",
        notifications: true,
      },
    };

    const result = StorageUserSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("should reject an invalid UUID", () => {
    const invalidUser = {
      id: "current-user",
      userId: "not-a-uuid",
      createdAt: new Date(),
    };

    const result = StorageUserSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it("should reject invalid settings values", () => {
    const invalidUser = {
      id: "current-user",
      userId: uuidv4(),
      createdAt: new Date(),
      settings: {
        theme: "invalid-theme", // Not one of the enum values
        language: "he",
      },
    };

    const result = StorageUserSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });
});

describe("CreateUser Schema", () => {
  it("should validate a valid create user input", () => {
    const validInput = {
      id: uuidv4(),
      createdAt: new Date(),
    };

    const result = CreateUserSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("should reject invalid UUID in id field", () => {
    const invalidInput = {
      id: "not-a-uuid",
      createdAt: new Date(),
    };

    const result = CreateUserSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
});
