import request from "supertest";
import express from "express";
import insertPerson from "../routes/insertPerson"; // Ruta que quieres probar

const app = express();
app.use(express.json()); // Middleware necesario para parsear JSON
app.use("/", insertPerson); // Usa las rutas que deseas probar

describe("POST /api/persons", () => {
  it("should validate and return 400 if data is invalid", async () => {
    const res = await request(app).post("/api/persons").send({
      firstName: "J",
      lastName: "Doe",
      email: "invalid-email",
      age: -5,
      phone: "123abc",
    });

    expect(res.status).toBe(400);
    expect(res.body.errors).toHaveLength(4); // Número de errores esperados
  });

  it("should insert a person and return 200 if data is valid", async () => {
    const validPerson = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: 30,
      phone: "+1234567890",
    };

    const res = await request(app).post("/api/persons").send(validPerson);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.first_name).toBe(validPerson.firstName);
  });
});

describe("GET /api/persons", () => {
  it("should return a list of persons", async () => {
    const res = await request(app).get("/api/persons");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});