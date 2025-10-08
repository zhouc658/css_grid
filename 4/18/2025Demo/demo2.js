const objects_endpoint= "https://collectionapi.metmuseum.org/public/collection/v1/objects"

async function getArtData() {
    const randomArtId= Math.floor(Math.random()*1000)+1;
    console.log(randomArtId)
    try{
        const request= `${objects_endpoint}/${randomArtId}`
        console.log(request)
        const response= await fetch(request)

        if(!response.ok){
            throw new Error('Network response was not ok.')
        }
        console.log(response)
        const data= await response.json();
        displayArt(data);
        console.log(data)

    }catch(error){
        console.error('Fetch error', error)
    }
}

//defining function that puts art on the page
function displayArt(data){

    //finding place holder div
    const artlist= document.getElementById('artlist');

    //creating an element to add to div
    const artItem= document.createElement('div');
    //defining the image
    let image;

    image=`<img src="${data.primaryImageSmall}"/>`

    if (data.primaryImageSmall){
        image= `<img src="${data.primaryImageSmall}"/>`
    }else{
        image="No Image"
    }

    //constructing the HTML that gets added
    artItem.innerHTML = `
    <h2>${data.tittle}</h2>
    ${image}
    <p>Country: ${data.country}</p>
    <p>Data: ${data.department}</p>

    `
    artlist.appendChild(artItem)
}
getArtData();