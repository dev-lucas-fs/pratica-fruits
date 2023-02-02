import fruitsRouter from "./routers/fruits-router";

app.use(json());

app.get("/health", (req: Request, res: Response) => res.send("I'am alive!"));
app.use(fruitsRouter);
