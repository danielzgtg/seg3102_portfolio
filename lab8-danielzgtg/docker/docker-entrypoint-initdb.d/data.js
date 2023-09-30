db.getSiblingDB("friends-mongo").getCollection("friend").insertMany([
    {
        firstName: "Stéphane",
        lastName: "Somé",
        phone: "6135625800",
        email: "stephane.some@uottawa.ca",
    },
    {
        firstName: "Daniel",
        lastName: "Test",
        phone: "9119119111",
        email: "test@example.com",
    },
]);
