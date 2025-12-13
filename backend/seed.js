require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

// Sample services data
const services = [
    {
        category: "Women",
        name: "Blouse Stitching",
        price: 550,
        time: "4-7 days",
        desc: "Perfect fit blouse with lining options."
    },
    {
        category: "Women",
        name: "Kurti Stitching",
        price: 350,
        time: "3-5 days",
        desc: "Custom fit kurti, simple or designer."
    },
    {
        category: "Women",
        name: "Lehenga Stitching",
        price: 1200,
        time: "7-10 days",
        desc: "Bridal and party wear lehengas."
    },
    {
        category: "Men",
        name: "Formal Shirt",
        price: 350,
        time: "5-7 days",
        desc: "Crisp formal shirts with perfect fit."
    },
    {
        category: "Men",
        name: "Formal Pant",
        price: 450,
        time: "5-7 days",
        desc: "Custom tailored trousers."
    },
    {
        category: "Men",
        name: "Sherwani",
        price: 2500,
        time: "10-15 days",
        desc: "Wedding sherwanis with premium finish."
    },
    {
        category: "Wedding",
        name: "Groom Package",
        price: 5000,
        time: "15-20 days",
        desc: "Complete wedding attire for the groom."
    },
    {
        category: "Wedding",
        name: "Bride Package",
        price: 8000,
        time: "20-25 days",
        desc: "Bridal blouse, lehenga, and draping."
    },
    {
        category: "Alterations",
        name: "Size Alteration",
        price: 100,
        time: "2-3 days",
        desc: "Resize your old clothes to fit perfectly."
    }
];

// Connect to MongoDB and seed data
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('✅ MongoDB Connected');

        // Clear existing services
        await Service.deleteMany({});
        console.log('🗑️  Cleared existing services');

        // Insert new services
        await Service.insertMany(services);
        console.log('✅ Seeded services data');

        console.log('🎉 Database seeding completed!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
