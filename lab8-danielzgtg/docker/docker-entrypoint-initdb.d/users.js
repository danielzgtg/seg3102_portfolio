db.getSiblingDB("friends-mongo").createUser({
    user: "lab-8",
    pwd:  "8-lab",
    roles: [ "readWrite" ],
});
