# mvideo_db
Simplified database model of the "MVideo" e-commerce shop (popular in Russia). 

It's PostgreSQL combined with Sequelize ORM, so you can easily add your own models and sync them with the existing db tables. The sample data for each table is generated for you, so you are free to experiment with this data.

Data generation uses Faker.JS library and takes the most out of it: every table is filled with naturally looking content. Please note, that you have to write your own generator for each new table you have added (if you want to do things automatically).

Schema is provided below:

![diagram](https://user-images.githubusercontent.com/80031060/201735121-117d9436-db01-4c89-bf1e-b6cf6cf913c3.png)

