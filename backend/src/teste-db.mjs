import mysql from "mysql2/promise";
//Testando a conexão com o BD
const connection = await mysql.createConnection({
  host: "centerbeam.proxy.rlwy.net",
  port: 15951,
  user: "root",
  password: "yRFbtxqehhWtgYFbDjaIzGwmOVdGgDGn",
  database: "foodlydb",
});

console.log("✅ Conectado com sucesso!");
await connection.end();
