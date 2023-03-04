
const pickRandom = async (evt) => {
    evt.preventDefault();
    mainDisplay = document.getElementById("pokemonDisplay")
    mainDisplay.innerHTML = "" //Clears pictures from pages
    randomNum = Math.floor(Math.random() * 1007 + 1)
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
    const pokemonData = response.data;
    randomType = Math.floor(Math.random() * pokemonData.types.length)
    pokemonType = pokemonData.types[randomType]["type"]["name"]
    orgin_name = pokemonData.name
    fiveRandomPlusOrgininalArray = await findFiveRandomByType(pokemonType, orgin_name)
    for(let i = 0; i < fiveRandomPlusOrgininalArray.length; i++){
        displayPokemon(fiveRandomPlusOrgininalArray[i])
    }
    };

const findFiveRandomByType = async (pokemonType, orgin_name) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}/`);
    const typeData = response.data;
    let pokemonArray = [orgin_name]
    for(let i = 0; i < 5; i++) {
        randomNum = Math.floor(Math.random() * (typeData.pokemon.length))
        pokemonArray.push(typeData.pokemon[randomNum]["pokemon"]["name"])
    }
    return [...new Set(pokemonArray)]
}

const displayPokemon = async (pokemonName) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = response.data;
    imageDiv = document.createElement('div')
    imageDiv.id = pokemonName
    imageDiv.classList.add("pokemonCard")
    imageDiv.innerHTML = `<p>${pokemonName}</p>`
    mainDisplay = document.getElementById("pokemonDisplay")
    mainDisplay.appendChild(imageDiv)

    let imageURL = pokemonData.sprites.front_default
    let imageElement = document.createElement('img')
    if (imageURL === null) {
        imageElement.src = "notfound.png"
    } else {
        imageElement.src = imageURL
    }
    
    insertIntoDivByID = document.getElementById(pokemonName)
    insertIntoDivByID.appendChild(imageElement)
    for(let i = 0; i < pokemonData.types.length; i++) {
        underImage = document.createElement('p')
        if (i === 0){
            underImage.innerHTML = `Type: ${pokemonData.types[i]["type"]["name"]}`
        } else {
            underImage.innerHTML = `- ${pokemonData.types[i]["type"]["name"]}`
        }
        
        insertIntoDivByID.appendChild(underImage)
    }
    
}

