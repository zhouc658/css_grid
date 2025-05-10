let api_url; // variable for the API URL
let allCategories = []; // Stores all categories fetched from the Kitsu API.

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
        populateCategoryDropdown(allCategories);

        // adding an event listener for the input in the categorySearch , and create the function
        categorySearch.addEventListener('input', (event)=> {
            const searchTerm = event.target.value.toLowerCase(); // Get the search term/input from the input box and convert to lowercase, so that its not case-sensitive

            const filteredCategories = allCategories.filter(category => { // loops through every category and show the one that match the input
                return category.attributes.title.toLowerCase().includes(searchTerm); // get the category title and check if the list has it and show it
            });

            // Update the dropdown with the filtered categories and auto-select the first match
            populateCategoryDropdown(filteredCategories);
            autoSelectCategory(filteredCategories); // Automatically select the first match in the filtered list
        });

    } catch (error) {
        console.error("fail category", error);
    }
}

// Function to populate the category dropdown with categories
function populateCategoryDropdown(categories) {
    const categorySelect = document.getElementById("categorySelect");
    // Reset the dropdown to its default option
    categorySelect.innerHTML = `<option value="">-- Choose a category to search --</option>`;

    // Loop through the categories and add each to the dropdown
    categories.forEach(category => {
        const slug = category.attributes.slug; // Get the category's slug (unique identifier)
        const title = category.attributes.title; // Get the category's title (used for display)
        const option = document.createElement("option"); // Create a new option element
        option.value = slug; // Set the option value to the category's slug
        option.textContent = title; // Set the display text to the category's title
        categorySelect.appendChild(option); // Append the option to the dropdown
    });
}

// Function to automatically select the first matching category in the filtered list
function autoSelectCategory(filteredCategories) {
    const categorySelect = document.getElementById("categorySelect");

    // Automatically select the first matching category, if available
    if (filteredCategories.length > 0) {
        categorySelect.value = filteredCategories[0].attributes.slug; // Set the dropdown value to the first category's slug
    }
}

// Call getCategories() when the page loads to fetch and display categories
getCategories(); // Initiates the fetching of categories

// Event listener for the search button to trigger the anime search
let btn = document.getElementById("submit");

btn.addEventListener("click", () => {
    const selectedCategory = document.getElementById("categorySelect").value; // Get the selected category from the dropdown
    const animeSearchText = document.getElementById("animeSearch").value; // Get the user-inputted anime title

    // Construct the base API URL for fetching anime based on user input
    api_url = "https://kitsu.io/api/edge/anime?";

    // If a category is selected, append it to the API URL
    if (selectedCategory) {
        api_url += `filter[categories]=${encodeURIComponent(selectedCategory)}&`; // Add category filter to URL
    }

    // If the user has typed an anime title, add it to the API URL
    if (animeSearchText) {
        api_url += `filter[text]=${encodeURIComponent(animeSearchText)}&`; // Add title filter to URL
    }

    // Request specific fields (synopsis, titles, posterImage) from the anime data
    api_url += "&fields[anime]=synopsis,titles,posterImage";

    // Clean up the trailing "&" if it exists
    api_url = api_url.endsWith("&") ? api_url.slice(0, -1) : api_url;

    console.log("Search URL:", api_url); // Debugging: Log the constructed URL

    // Call getAnime() to fetch anime results using the constructed URL
    getAnime();
});

// Function to fetch and display anime based on the constructed API URL
async function getAnime() {
    const resultsDiv = document.getElementById("results"); // Get reference to the results container
    resultsDiv.innerHTML = ""; // Clear any previous results

    try {
        const response = await fetch(api_url, {
            headers: {
                'Accept': 'application/vnd.api+json', // Specify the response format
                'Content-Type': 'application/vnd.api+json' // Specify the content type
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // If the response is not OK, throw an error
        }

        const data = await response.json(); // Parse the JSON response

        // If no anime data is found, display a message
        if (data.data.length === 0) {
            resultsDiv.innerHTML = "<p>No anime found.</p>";
            return;
        }

        // Loop through the results and display each anime's information
        data.data.forEach(anime => {
            const title = anime.attributes.titles.en || anime.attributes.titles.en_jp || "No title"; // Get the anime's title
            const imageUrl = anime.attributes.posterImage?.small || ""; // Get the anime's poster image URL
            const synopsis = anime.attributes.synopsis || "No description available."; // Get the anime's synopsis

            const showCard = document.createElement("div"); // Create a new div for each anime

            // Display the anime's title, image, and description inside the div
            showCard.innerHTML = `
                <img src="${imageUrl}" alt="${title}">
                <h3>${title}</h3>
                <p><strong>Description:</strong> ${synopsis}</p>
            `;

            resultsDiv.appendChild(showCard); // Append the showCard to the results container
        });

    } catch (error) {
        // If an error occurs during fetching, log the error and display an error message
        console.error("Failed to fetch anime:", error);
        resultsDiv.innerHTML = `<p style="color: red;">Error fetching anime. Please try again.</p>`;
    }
}
