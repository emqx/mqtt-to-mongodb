db.createUser(
  {
      user: "admin",
      pwd: "public",
      roles: [
          {
              role: "readWrite",
              db: "iot_data"
          }
      ]
  }
);