const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Mongodb Database
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.odt7wqf.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
    }
}

connectMongoDB()
    .then(() => {
        app.post('/addFansData', async (req, res) => {
            const data = req.body;
            const collection = client.db(process.env.DB_DATABASE).collection('fans');

            try {
                await collection.insertMany(data);
                res.status(201).json({ message: 'Data inserted successfully' });
            } catch (error) {
                console.error('Error inserting data into MongoDB', error);
                res.status(500).json({ message: 'Error inserting data into MongoDB' });
            }
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        // All data
        app.get('/getFansData', async (req, res) => {
            const collection = client.db(process.env.DB_DATABASE).collection('fans');

            try {
                const data = await collection.find({}).toArray();
                res.status(200).json(data);
            } catch (error) {
                console.error('Error retrieving data from MongoDB', error);
                res.status(500).json({ message: 'Error retrieving data from MongoDB' });
            }
        });

        // Single Data 
        app.get('/getProduct/:productId', async (req, res) => {
            const productId = req.params.productId;
            const collection = client.db(process.env.DB_DATABASE).collection('fans');

            try {
                const product = await collection.findOne({ _id: new ObjectId(productId) });
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                res.status(200).json(product);
            } catch (error) {
                console.error('Error retrieving product from MongoDB', error);
                res.status(500).json({ message: 'Error retrieving product from MongoDB', error: error.message });
            }
        });


        // Booking Data 
        app.post('/booking-data', async (req, res) => {
            const bookingData = req.body;
            const collection = client.db(process.env.DB_DATABASE).collection('booking-data');
            try {
                const result = await collection.insertOne(bookingData);

                if (result.insertedCount === 1) {
                    res.status(201).json({ message: 'Booking data received and inserted successfully' });
                } else {
                    res.status(500).json({ message: 'Error inserting booking data' });
                }
            } catch (error) {
                console.error('Error processing booking data', error);
                res.status(500).json({ message: 'Error processing booking data' });
            }
        });

        // Server code (Node.js/Express)
        app.get('/getBookingData', async (req, res) => {
            const collection = client.db(process.env.DB_DATABASE).collection('booking-data');
            try {
                const bookingData = await collection.find({}).toArray();
                res.status(200).json(bookingData);
            } catch (error) {
                console.error('Error retrieving booking data', error);
                res.status(500).json({ message: 'Error retrieving booking data' });
            }
        });

        // service data
        app.post('/service-data', async (req, res) => {
            const serviceData = req.body;
            const collection = client.db(process.env.DB_DATABASE).collection('services');
            try {
                const result = await collection.insertOne(serviceData);

                if (result.insertedCount === 1) {
                    res.status(201).json({ message: 'Service data received and inserted successfully' });
                } else {
                    res.status(500).json({ message: 'Error inserting service data' });
                }
            } catch (error) {
                console.error('Error processing service data', error);
                res.status(500).json({ message: 'Error processing service data' });
            }
        });

        app.get('/getServices', async (req, res) => {
            const collection = client.db(process.env.DB_DATABASE).collection('services');
            try {
                const serviceData = await collection.find({}).toArray();
                res.status(200).json(serviceData);
            } catch (error) {
                console.error('Error retrieving booking data', error);
                res.status(500).json({ message: 'Error retrieving booking data' });
            }
        });

        app.put('/updateService/:id', async (req, res) => {
            const serviceId = req.params.id;
            const updatedServiceData = req.body;
            res.status(200).json(updatedService);
        });


        // testimonials data
        app.post('/testimonials-data', async (req, res) => {
            const testimonialsData = req.body;
            const collection = client.db(process.env.DB_DATABASE).collection('testimonials');
            try {
                const result = await collection.insertOne(testimonialsData);

                if (result.insertedCount === 1) {
                    res.status(201).json({ message: 'Service data received and inserted successfully' });
                } else {
                    res.status(500).json({ message: 'Error inserting service data' });
                }
            } catch (error) {
                console.error('Error processing service data', error);
                res.status(500).json({ message: 'Error processing service data' });
            }
        });

        app.get('/getTestimonials', async (req, res) => {
            const collection = client.db(process.env.DB_DATABASE).collection('testimonials');
            try {
                const testimonialData = await collection.find({}).toArray();
                res.status(200).json(testimonialData);
            } catch (error) {
                console.error('Error retrieving booking data', error);
                res.status(500).json({ message: 'Error retrieving booking data' });
            }
        });

        // Admin data
        app.post('/user', async (req, res) => {
            const adminData = req.body;
            const collection = client.db(process.env.DB_DATABASE).collection('user');
            try {
                const result = await collection.insertOne(adminData);

                if (result.insertedCount === 1) {
                    res.status(201).json({ message: 'Service data received and inserted successfully' });
                } else {
                    res.status(500).json({ message: 'Error inserting service data' });
                }
            } catch (error) {
                console.error('Error processing service data', error);
                res.status(500).json({ message: 'Error processing service data' });
            }
        });

        app.get('/getUser', async (req, res) => {
            try {
                const collection = client.db(process.env.DB_DATABASE).collection('user');
                const adminData = await collection.find({}).toArray();

                res.status(200).json(adminData);
            } catch (error) {
                console.error('Error retrieving admin data', error);
                res.status(500).json({ message: 'Error retrieving admin data' });
            }
        });

    })
    .catch(console.dir);
