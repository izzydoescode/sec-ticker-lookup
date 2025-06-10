import express from "express";
import request from "supertest";
import { store } from "../memory/store";
import usersRouter from "../routes/users";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

beforeEach(() => {
	// reset in-memory store before each test
	store.users, (length = 0);
	store.nextId = 1;
});

describe("User API", () => {
	it("should create a new user", async () => {
		const testUser = { name: "Ari", email: "ari@haven.com" };
		const res = await request(app).post("/users").send(testUser);

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty("id", store.nextId);
		expect(res.body.name).toBe(testUser.name);
	});

	it("should fetch a user by id", async () => {});

	it("should return 404 if user does not exist", async () => {});
});
