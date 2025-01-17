import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import pool from "../db";

const insertPerson = express.Router();

// Validation rules
const personValidationRules = [
  body("firstName").trim().isLength({ min: 2 }).withMessage("First name must be at least 2 characters"),
  body("lastName").trim().isLength({ min: 2 }).withMessage("Last name must be at least 2 characters"),
  body("email").isEmail().withMessage("Must be a valid email"),
  body("age").isInt({ min: 0, max: 120 }).withMessage("Age must be between 0 and 120"),
  body("phone").matches(/^\+?[\d\s-]+$/).withMessage("Invalid phone number format"),
];

// Routes
insertPerson.post("/api/persons",personValidationRules,async(req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, age, phone } = req.body;

    try {
        // Insert person into the PostgreSQL database
        const result = await pool.query(
          "INSERT INTO persons (first_name, last_name, email, age, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [firstName, lastName, email, age, phone]
        );

        const person = result.rows[0];
        return res
        .status(200)
        .json({ status: 'success', message: 'Se registraron los datos de la persona', data: person });
      } catch (err) {
       // console.error("Error al insertar en la base de datos", err);
        res.status(500).json({ message: "Error al guardar la persona" });
      }
  }
);

insertPerson.get("/api/persons", async(_req: Request, res: Response) => {
    try {
      const result = await pool.query("SELECT * FROM persons");
    
      return res 
      .status(200)
      .json({ status: 'success', message: 'Listado de personas', data: result.rows });
    } catch (err) {
    //  console.error("Error al obtener las personas", err);
      res.status(500).json({ message: "Error al obtener listado de las personas" });
    }
});

// app.get("/api/persons/:id", (req: Request, res: Response) => {
//   const person = persons.find((p) => p.id === req.params.id);
//   if (!person) {
//     return res.status(404).json({ message: "Person not found" });
//   }
//   res.json(person);
// });

// Error handling middleware
insertPerson.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default insertPerson;