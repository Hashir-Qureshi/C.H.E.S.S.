# ORM Notes

## Current ORM implementation: [Sequelize](https://www.npmjs.com/package/sequelize)

We are using sequelize as an interface to our database.
This ensures clean code (no need to write raw SQL) and ease of mind.

We use the [sequelize-auto](https://github.com/sequelize/sequelize-auto) library to automatically generate the models that reflect our database tables.

## What the ORM should NOT be used for

Althought at runtime the ORM library does check for the existence of tables and creates tables if they don't exist, we should NOT use this for database creation.
This is because our lifecycle of reading the database and dynamically creating models only takes into account tables; not procedures, triggers, or stored data.
If automation is added to completely handle database migrations, we could then depend on the ORM.
