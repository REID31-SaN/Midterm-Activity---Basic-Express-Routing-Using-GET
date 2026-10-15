
async function loadMenu() {
    const container = document.getElementById("menu-items");

    try {
        const response = await fetch("/api/menu");

        if (!response.ok) {
            throw new Error("Failed to load menu");
        }

        const items = await response.json();
        container.replaceChildren();

        items.forEach(item => {
            const card = document.createElement("article");
            card.className = "menu-card";

            const image = document.createElement("img");
            image.src = "/" + item.image;
            image.alt = item.name;

            const name = document.createElement("h3");
            name.textContent = item.name;

            card.append(image, name);
            container.appendChild(card);
        });

        if (items.length === 0) {
            container.textContent = "No menu items available.";
        }
    } catch (error) {
        container.textContent = "Unable to load the menu.";
        console.error(error);
    }
}

loadMenu();
