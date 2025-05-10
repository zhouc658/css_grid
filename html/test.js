let api_url; // variable for the API URL
let allCategories = []; // Stores all categories fetched from the Kitsu API.
let currentPage = 1; // Track the current page of results

// get categories from the Kitsu API
async function getCategories() {
    //Setup the variables categorySelect and categorySearch to get the elements with the ids "categorySelect" and "categorySearch" from the HTML
    const categorySelect = document.getElementById("categorySelect");
    const categorySearch = document.getElementById("categorySearch");

    let nextPage = "https://kitsu.io/api/edge/categories?page[limit]=20&page[offset]=0"; // API URL for getting the categories which returns a certain amount per page, we set as 20 

    try {
        // fetch the full list of category that appear in category dropdown
        while (nextPage) { 
            const response = await fetch(nextPage, { //request/fetch from the API URL(nextpage) and wait for response
                headers: {
                    'Accept': 'application/vnd.api+json', // Set request format to JSON
                    'Content-Type': 'application/vnd.api+json' // Set the content type as JSON
                }
            });

            const data = await response.json();

            // adding on to each other or gathering all the categories together
            allCategories = allCategories.concat(data.data);

            if (data.links && data.links.next) { // if data.links and have a next URL then have next URL to nextPage, else no
                nextPage = data.links.next;
            } else {
                nextPage = null;
            }
            
        }

        // the category on category dropdown list will be based on the categories fetched from the API
        CategoryDropdown(allCategories);

        // adding an event listener for the input in the categorySearch , and create the function
        categorySearch.addEventListener('input', (event)=> {
            const searchTerm = event.target.value.toLowerCase(); // Get the search term/input from the input box and convert to lowercase, so that its not case-sensitive

            const filteredCategories = allCategories.filter(category => { // loops through every category and show the one that match the input
                return category.attributes.title.toLowerCase().includes(searchTerm); // get the category title and check if the list has it and show it
            });

            // Update the dropdown with the filtered categories and auto-select the first match
            CategoryDropdown(filteredCategories);
            autoSelectCategory(filteredCategories); // Automatically select the first match in the filtered list
        });

    } catch (error) {
        console.error("fail category", error);
    }
}

function CategoryDropdown(categories) {
    const categorySelect = document.getElementById("categorySelect");
    // Reset the dropdown to its default option
    categorySelect.innerHTML = `<option value="">Choose a category</option>`;

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]; // Get the current category in the loop
        const slug = category.attributes.slug; // Get the category's slug (unique identifier for Kitsu api)
        const title = category.attributes.title; // Get the category's title
    
        const option = document.createElement("option"); // Create a new option element
        option.value = slug; // Set the option value to the category's slug (API)
        option.textContent = title; // Set the display text to the category's title
        categorySelect.appendChild(option); // adding it to the lst
    } 
}

// Function to automatically select the first matching category in the filtered list
function autoSelectCategory(filteredCategories) {
    const categorySelect = document.getElementById("categorySelect");

    // Automatically select the first matching category, if available
    if (filteredCategories.length > 0) {
        categorySelect.value = filteredCategories[0].attributes.slug; // Set the dropdown value to the first category's slug
    }
}

getCategories(); // Initiates the fetching of categories

// Event listener for the search button to trigger the anime search
let btn = document.getElementById("submit");

btn.addEventListener("click", () => {
    const selectedCategory = document.getElementById("categorySelect").value; // Get the selected category from the dropdown/categroy
    const animeSearchText = document.getElementById("animeSearch").value; // Get the user-inputted animeSearch

    //API URL for gettting anime based on user input
    api_url = "https://kitsu.io/api/edge/anime?";

    if (selectedCategory) { //if user has chosen a category then it will filter and request API for anime results for that category
        api_url += `filter[categories]=${selectedCategory}&`; 
    }

    //same idea
    if (animeSearchText) {
        api_url += `filter[text]=${animeSearchText}&`; 
    }

    // Request synopsis, titles, Image
    api_url += "&fields[anime]=synopsis,titles,posterImage";

    // Call getAnime() to fetch anime results using the constructed URL
    getAnime();
});

// Function to fetch and display anime based on the constructed API URL
async function getAnime() {
    const resultsDiv = document.getElementById("results"); 
    const loadMoreButton = document.getElementById("load-more");

    try {
        // Update the API URL to include pagination based on currentPage
        const pageUrl = `${api_url}&page[limit]=10&page[offset]=${currentPage * 10}`; // 10 results per page, change for more

        const response = await fetch(pageUrl, {
            headers: {
                'Accept': 'application/vnd.api+json', 
                'Content-Type': 'application/vnd.api+json' 
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // checks if the API request failed, and if it did, it stops or throw error
        }

        const data = await response.json(); // Parse the JSON response

        // If no anime data is found, display a message
        if (data.data.length === 0) {
            resultsDiv.innerHTML = "<p>No anime found.</p>";
            loadMoreButton.style.display = "none"; // Hide the Load More button if no more results
            return;
        }

        // Loop through the results and display each anime's information
        data.data.forEach(anime => {
            const title = anime.attributes.titles.en || anime.attributes.titles.en_jp || "No title"; // Get the anime's title
            const imageUrl = anime.attributes.posterImage?.small || ""; // Get the anime's poster image URL
            const synopsis = anime.attributes.synopsis || "No description available."; // Get the anime's synopsis

            const showCard = document.createElement("div"); // Create a new div for each anime

            // Display the anime's title, image, and description inside the div, put here as it depends on anime result 
            showCard.innerHTML = `
                <img src="${imageUrl}" alt="${title}">
                <h3>${title}</h3>
                <p><strong>Description:</strong> ${synopsis}</p>
            `;

            resultsDiv.appendChild(showCard); // show the anime info on the page
        });

        // increase the page number to have anext request vs keep on repeating which is also why we started off with 1 firstt
        currentPage++;

    } catch (error) {
        console.error("Failed anime:", error);
    }
}

document.getElementById("load-more").addEventListener("click", () => { //adding an event listener for the click, and create the function
    getAnime(); // Call the getAnime function again to load the next set of results
});