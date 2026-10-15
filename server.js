
/*Name: Jeorge Andrei Benedict M. Santos
Section: WD303*/

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public"), {
    index: false
}));

// Coffee shop data
const menu = [
    {
        id: 1,
        name: "Espresso",
        category: "Hot Coffee",
        price: 90,
        image: "images/espresso.jpg"
    },
    {
        id: 2,
        name: "Caffe Latte",
        category: "Hot Coffee",
        price: 130,
        image: "images/latte.jpg"
    },
    {
        id: 3,
        name: "Iced Coffee",
        category: "Cold Coffee",
        price: 120,
        image: "images/iced-coffee.jpg"
    }
];

function showPage(page, pageName, res) {
    console.log("Page visited: " + pageName);

    res.sendFile(path.join(__dirname, "public", page));
}


app.get("/", (req, res) => {
    showPage("index.html", "Home", res);
});

// Menu page
app.get("/menu", (req, res) => {
    showPage("menu.html", "Menu", res);
});

// About page
app.get("/about", (req, res) => {
    showPage("about.html", "About", res);
});

// Contact page
app.get("/contact", (req, res) => {
    showPage("contact.html", "Contact", res);
});

app.get("/api/menu", (req, res) => {
    const category = req.query.category;

    let results = menu;

    if (category) {
        results = menu.filter(item =>
            item.category.toLowerCase() === category.toLowerCase()
        );
    }

    res.json(results);
});

app.get("/api/menu/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = menu.find(item => item.id === id);

    if (!item) {
        return res.status(404).json({
            message: "Menu item not found"
        });
    }

    res.json(item);
});

// 404
app.use((req, res) => {
    console.log("Page visited: 404 - " + req.path);

    res.status(404).sendFile(
        path.join(__dirname, "public", "404.html")
    );
});

app.listen(PORT, () => {
    console.log(`Coffee shop server running at http://localhost:${PORT}`);
});
