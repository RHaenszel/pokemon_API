console.log("app.js")

const pickRandom = async (evt) => {
    evt.preventDefault();
    mainDisplay = document.getElementById("pokemonDisplay")
    mainDisplay.innerHTML = "" //Clears pictures from pages
    randomNum = Math.floor(Math.random() * 1007 + 1)
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
    const pokemonData = response.data;
    console.log(pokemonData);
    console.log(pokemonData.types[0]["type"]["name"])
    pokemonType = pokemonData.types[0]["type"]["name"]
    orgin_name = pokemonData.name
    console.log(orgin_name)
    fiveRandomPlusOrgininalArray = await findFiveRandomByType(pokemonType, orgin_name)
    console.log(fiveRandomPlusOrgininalArray)
    for(let i = 0; i < fiveRandomPlusOrgininalArray.length; i++){
        displayPokemon(fiveRandomPlusOrgininalArray[i])
    }
    };

const findFiveRandomByType = async (pokemonType, orgin_name) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}/`);
    const typeData = response.data;
    // console.log(typeData.pokemon);
    // console.log(typeData.pokemon.length)
    let pokemonArray = [orgin_name]
    for(let i = 0; i < 5; i++) {
        randomNum = Math.floor(Math.random() * (typeData.pokemon.length))
        // console.log(typeData.pokemon[randomNum]["pokemon"]["name"])
        pokemonArray.push(typeData.pokemon[randomNum]["pokemon"]["name"])
    }
    console.log(pokemonArray)
    return pokemonArray
}

const displayPokemon = async (pokemonName) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = response.data;
    console.log(pokemonData);
    imageDiv = document.createElement('div')
    imageDiv.id = pokemonName
    imageDiv.classList.add("pokemonCard")
    imageDiv.innerHTML = `<p>${pokemonName}</p>`
    mainDisplay = document.getElementById("pokemonDisplay")
    mainDisplay.appendChild(imageDiv)

    let imageURL = pokemonData.sprites.front_default
    let imageElement = document.createElement('img')
    imageElement.src = imageURL

    underImage = document.createElement('p')
    underImage.innerHTML = `Type: ${pokemonData.types[0]["type"]["name"]}`

    insertIntoDivByID = document.getElementById(pokemonName)
    insertIntoDivByID.appendChild(imageElement)
    insertIntoDivByID.appendChild(underImage)
}

