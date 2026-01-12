const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => console.log("Mongo connection open"))
    .catch(err => console.error("Mongo connection error:", err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connected'));

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '69579faa46fb5bf68acc735c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, optio.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                url: 'https://res.cloudinary.com/db1m9ahbq/image/upload/v1768043736/YelpCamp/urmybpkmbnhpfr7os2co.png',
                filename: 'YelpCamp/u2xpwy3ktnok4xxwlr87'
                },
                {
                url: 'https://res.cloudinary.com/db1m9ahbq/image/upload/v1768043737/YelpCamp/uly3c4mdehf1otaqy34j.png',
                filename: 'YelpCamp/agrtlegj1vggmtup3dpa'
                }
            ]
        });
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});