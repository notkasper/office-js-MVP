const { connect, getConnection } = require("./back-end/db");

const seed = async () => {
  await connect(true);
  const connection = await getConnection();
  const establishments = [
    { id: "12876617-03b1-4e19-a052-123a29970510", name: "Arnhem" },
    { id: "aeab1311-5393-4c2e-9c88-8d88cc776d1a", name: "Amsterdam" },
    { id: "22dc8533-1dda-4c5d-973a-bb51de520c66", name: "Rotterdam" },
    { id: "ca2316cc-4deb-4fca-b8c4-29de6ad27d1f", name: "Groningen" }
  ];
  for (const establishment of establishments) {
    await connection.models.establishments.create(establishment);
  }
  connection.close();
};

seed();
