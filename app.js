// Receitas iniciais
let recipes = [
    { title: "Bolo de Chocolate", category: "sobremesa", ingredients: ["farinha", "açúcar", "chocolate"], instructions: "Misture tudo e asse." },
    { title: "Macarrão ao Alho e Óleo", category: "massa", ingredients: ["macarrão", "alho", "óleo"], instructions: "Cozinhe o macarrão e refogue com alho e óleo." },
    { title: "Bife Grelhado", category: "carne", ingredients: ["bife", "sal", "pimenta"], instructions: "Tempere e grelhe o bife." }
];

const recipesContainer = document.getElementById("recipesContainer");
const searchInput = document.getElementById("search");
const filterCategory = document.getElementById("filterCategory");
const recipeForm = document.getElementById("recipeForm");
const modal = document.getElementById("recipeModal");
const modalTitle = document.getElementById("modalTitle");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");
const closeModal = document.getElementById("closeModal");

// Renderizar receitas
function renderRecipes() {
    recipesContainer.innerHTML = "";
    const searchTerm = searchInput.value.toLowerCase();
    const categoryFilter = filterCategory.value;

    recipes
        .filter(r => r.title.toLowerCase().includes(searchTerm))
        .filter(r => categoryFilter === "all" || r.category === categoryFilter)
        .forEach(recipe => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");
            card.innerHTML = `
                <h3>${recipe.title}</h3>
                <p><strong>Categoria:</strong> ${recipe.category}</p>
                <button onclick="showDetails('${recipe.title}')">Ver Receita</button>
            `;
            recipesContainer.appendChild(card);
        });
}

// Mostrar detalhes no modal
function showDetails(title) {
    const recipe = recipes.find(r => r.title === title);
    if (recipe) {
        modalTitle.textContent = recipe.title;
        modalIngredients.innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join("");
        modalInstructions.textContent = recipe.instructions;
        modal.style.display = "block";
    }
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// Adicionar receita
recipeForm.addEventListener("submit", e => {
    e.preventDefault();
    const newRecipe = {
        title: document.getElementById("recipeTitle").value,
        category: document.getElementById("recipeCategory").value,
        ingredients: document.getElementById("recipeIngredients").value.split(",").map(i => i.trim()),
        instructions: document.getElementById("recipeInstructions").value
    };
    recipes.push(newRecipe);
    recipeForm.reset();
    renderRecipes();
});

// Eventos de busca e filtro
searchInput.addEventListener("input", renderRecipes);
filterCategory.addEventListener("change", renderRecipes);

// Inicialização
renderRecipes();
