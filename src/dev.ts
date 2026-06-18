import app from "./app";

const port = parseInt(process.env.PORT || "3000", 10);

app.listen({ port, hostname: "0.0.0.0" }, () => {
  console.log(`🛒 CHR-pack Store running at http://localhost:${port}`);
});
