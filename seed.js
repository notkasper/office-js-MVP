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

  const departments = [
    { id: "9f108a87-697b-4563-b5e8-5d6b686dea9c", name: "Verkoop" },
    { id: "27b58924-5e3a-4a79-844d-17e12163cfbc", name: "Management" },
    { id: "cd24c455-38ad-4944-91a8-13a35f5b27ad", name: "Support" }
  ];
  for (const department of departments) {
    await connection.models.departments.create(department);
  }

  const workFunctions = [
    { id: "2d4dc1b8-2c32-40de-862c-fb72286fac43", name: "Sales manager" },
    { id: "743f41f0-a3ee-4903-815a-5ccd8a47e347", name: "Spokesperson" },
    {
      id: "e071322d-4b02-4dad-8106-af56a6bd4dea",
      name: "Customer Success Manager"
    }
  ];
  for (const workFunction of workFunctions) {
    await connection.models.workFunctions.create(workFunction);
  }

  const aanheffen = [
    { id: "07fcfa06-9505-428b-b95d-ead6d7e3dd19", name: "Geachte mevrouw" },
    { id: "c6ee8b34-87d2-4a97-8e60-c04e57b7c5ea", name: "Geachte heer" },
    {
      id: "84836c96-02c9-4716-b468-314c52ae1e36",
      name: "Geachte heer, mevrouw"
    },
    { id: "1eaf2e35-7762-428c-bc7d-3c1bb38531cf", name: "Beste" }
  ];
  for (const aanhef of aanheffen) {
    await connection.models.aanheffen.create(aanhef);
  }

  connection.close();
};

seed();
