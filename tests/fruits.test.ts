import supertest from "supertest";
import server from "../src";

const api = supertest(server);

describe("Testando rotas do arquivo fruits-router.ts", () => {
  it("Testando GET: /fruits", async () => {
    const response = await api.get("/fruits");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("Testando GET: /fruits:id", async () => {
    const response = await api.get("/fruits/" + 1);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  it("Testando POST: /fruits - BODY INCORRETO", async () => {
    const response = await api
      .post("/fruits")
      .send({ price: 5 })
      .set("Accept", "application/json");

    expect(response.status).toBe(422);
  });

  // ----------------------------------------------------------//

  it("Testando POST: /fruits", async () => {
    const response = await api
      .post("/fruits")
      .send({ name: "banana", price: 5 })
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
  });

  it("Testando POST: /fruits - CONFLITO", async () => {
    const response = await api
      .post("/fruits")
      .send({ name: "banana", price: 5 })
      .set("Accept", "application/json");

    expect(response.status).toBe(409);
  });

  it("Testando GET: /fruits", async () => {
    const response = await api.get("/fruits");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: "banana", price: 5, id: 1 }]);
  });

  it("Testando GET: /fruits:id", async () => {
    const response = await api.get("/fruits/" + 1);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: "banana", price: 5, id: 1 });
  });
});
