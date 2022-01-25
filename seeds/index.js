const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "61eade1f05f41e1743bb6b67",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. At veniam similique libero error quia, placeat maxime neque ab sed iste voluptas ducimus autem aliquam perferendis, non velit ipsam rerum itaque!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dljucecyg/image/upload/v1642835401/YelpCamp/o4evem05ayy7ncbzwujz.jpg",
          filename: "YelpCamp/o4evem05ayy7ncbzwujz",
        },
        {
          url: "https://res.cloudinary.com/dljucecyg/image/upload/v1642835400/YelpCamp/y6ftjyuffbfhra2w3vry.jpg",
          filename: "YelpCamp/y6ftjyuffbfhra2w3vry",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
