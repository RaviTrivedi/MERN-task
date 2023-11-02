const express = require('express')
const app = express()
const cors = require("cors");
const dbConfig = require('./config/db.config');
const admin = require('./model/admin');
const department = require('./model/department');
const mongoose = require('mongoose');
const employee = require('./model/employee');

const port = 5000

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/auth/login", async (req, res) => {

    const adminData = new admin({
        email: req.body.email,
        password: req.body.password,
    });

    await adminData.save().then(data => {
        res.send({
            message: "Admin created successfully!!",
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating Admin"
        });
    });

})

app.get('/department', async (req, res) => {
    try {
        const allDepartments = await department.find();
        res.status(200).json(allDepartments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

app.post("/department", async (req, res) => {
    const departmentData = new department({
        name: req.body.name,
    });

    await departmentData.save().then(data => {
        res.send({
            message: "department created successfully!!",
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating department"
        });
    });
})

app.delete("/department/:id", async (req, res) => {

    const departmentId = req.params.id.toString().trim()
    console.log("departmentId ---", departmentId);
    await department.findOneAndDelete(departmentId).then(data => {
        if (!data) {
            res.status(404).send({
                message: `department not found.`
            });
        } else {
            res.send({
                message: "department deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
})

app.patch("/department/:id", async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "department to update can not be empty!"
        });
    }

    const id = req.params.id;

    await department.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `department not found.`
            });
        } else {
            res.send({ message: "department updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
})


app.post("/employee", async (req, res) => {
    const employeeData = new employee({
        name: req.body.name,
        location: req.body.location
    });

    await employeeData.save().then(data => {
        res.send({
            message: "employee created successfully!!",
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating employee"
        });
    });
})

app.get("/search/employee", async (req, res) => {
    const { title } = req.query;
    try {
        const allEmployee = await employee.find({ name: title }).exec();
        res.status(200).json(allEmployee);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

})

app.get('/employee', async (req, res) => {
    try {
        const allEmployee = await employee.find()
        res.status(200).json(allEmployee);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

app.delete("/employee/:id", async (req, res) => {

    const employeeId = req.params.id
    await employee.findOneAndDelete(employeeId).then(data => {
        if (!data) {
            res.status(404).send({
                message: `employee not found.`
            });
        } else {
            res.send({
                message: "employee deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
})

app.patch("/employee/:id", async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "employee to update can not be empty!"
        });
    }

    const id = req.params.id;

    await employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `employee not found.`
            });
        } else {
            res.send({ message: "employee updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

// mongoose.connect(dbConfig.url).then(() => {
//     console.log("Databse Connected Successfully!!");
// }).catch(err => {
//     console.log('Could not connect to the database', err);
//     process.exit();
// });

const connectToMongo = async () => {
    try {
        await mongoose.connect(dbConfig.url);
        console.log('connected to MongoDB');
    } catch (error) {
        console.log('error connection to MongoDB:', error.message);
    }
};

connectToMongo()