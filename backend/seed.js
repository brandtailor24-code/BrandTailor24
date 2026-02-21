require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

// Sample services data
const services = [
    // 1. Blouse Category
    { category: "Blouse", name: "Normal Blouse (Without Lining)", price: 250, time: "2-4 days", desc: "Basic stitching without lining." },
    { category: "Blouse", name: "Lining Blouse (Simple Neck)", price: 500, time: "3-5 days", desc: "Stitched with lining, simple neck design." },
    { category: "Blouse", name: "Design Neck (With Lining)", price: 750, time: "4-6 days", desc: "Custom neck design with lining." },
    { category: "Blouse", name: "Lehenga Blouse (Specialty Cut)", price: 650, time: "5-7 days", desc: "Special cut for lehengas." },
    { category: "Blouse", name: "Designer Pattern Blouse", price: 1250, time: "7-10 days", desc: "Intricate designer patterns." },
    { category: "Blouse", name: "Machine Embroidery Blouse", price: 1500, time: "10-14 days", desc: "Machine embroidery work." },
    { category: "Blouse", name: "Handloom Embroidery Blouse", price: 3500, time: "15-20 days", desc: "Exquisite handloom embroidery." },

    // 2. Lehenga Bottoms
    { category: "Lehenga", name: "Normal Lehenga Bottom", price: 600, time: "4-6 days", desc: "Basic lehenga stitching." },
    { category: "Lehenga", name: "Designer Flared Lehenga", price: 1500, time: "7-10 days", desc: "Extra flare and designer cut." },
    { category: "Lehenga", name: "Simple Pattu/Silk Lehenga", price: 800, time: "5-7 days", desc: "Traditional silk lehenga stitching." },

    // 3. Salwar & Suits
    { category: "Salwar Suit", name: "Salwar Top (Without Lining)", price: 400, time: "3-5 days", desc: "Simple top stitching." },
    { category: "Salwar Suit", name: "Salwar Top (With Lining)", price: 550, time: "4-6 days", desc: "Top stitching with lining." },
    { category: "Salwar Suit", name: "Salwar Pant (Without Lining)", price: 400, time: "3-5 days", desc: "Simple pant stitching." },
    { category: "Salwar Suit", name: "Salwar Pant (With Lining)", price: 550, time: "4-6 days", desc: "Pant stitching with lining." },

    // 4. Gowns
    { category: "Gowns", name: "Simple Gown (Without Lining)", price: 950, time: "5-7 days", desc: "Basic gown stitching." },
    { category: "Gowns", name: "Designer Gown (With Lining)", price: 4000, time: "10-15 days", desc: "Premium designer gown." },

    // 5. Western & Co-ords
    { category: "Western", name: "Women’s Blazer", price: 2500, time: "10-14 days", desc: "Custom fit blazer (Price Varies)." },
    { category: "Western", name: "Women’s Co-ord Set", price: 2000, time: "7-10 days", desc: "Trendy co-ord set (Price Varies)." },

    // 6. Celebration Combos
    { category: "Celebration", name: "Mom & Daughter Combo", price: 5000, time: "15-20 days", desc: "Matching outfits for mom and daughter (Custom)." },
    { category: "Celebration", name: "Birthday Combo", price: 4000, time: "10-15 days", desc: "Special birthday themed outfits (Custom)." },

    // 7. Wedding Packages
    { category: "Wedding", name: "Wedding Gown & Blouse Set", price: 12000, time: "20-30 days", desc: "Complete wedding ensemble." },
    { category: "Wedding", name: "Bridal Party Bulk Order", price: 20000, time: "25-35 days", desc: "Bulk stitching for bridal party (Contact us)." }
];

// Connect to MongoDB and seed data
mongoose.connect(process.env.MONGODB_URI)
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
