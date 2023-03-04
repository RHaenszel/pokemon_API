console.log("app.js")




const pickRandom = async (evt) => {
    evt.preventDefault();
    mainDisplay = document.getElementById("pokemonDisplay")
    mainDisplay.innerHTML = ""
    randomNum = Math.floor(Math.random() * 1007 + 1)
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
    const pokemonData = response.data;
    console.log(pokemonData);
    let imageURL = pokemonData.sprites.front_default
    let image_element = document.createElement('img')
    image_element.src = imageURL
    mainDisplay.appendChild(image_element)
    console.log(pokemonData.types[0]["type"]["name"])
    fivearray = await findFiveRandomByType(pokemonData.types[0]["type"]["name"])
    console.log(fivearray)
    for(let i = 0; i < fivearray.length; i++){
        displayFive(fivearray[i])
    }
    };

const findFiveRandomByType = async (pokeType) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokeType}/`);
    const typeData = response.data;
    // console.log(typeData.pokemon);
    // console.log(typeData.pokemon.length)
    let pokemonArray = []
    for(let i = 0; i < 5; i++) {
        randomNum = Math.floor(Math.random() * (typeData.pokemon.length))
        // console.log(typeData.pokemon[randomNum]["pokemon"]["name"])
        pokemonArray.push(typeData.pokemon[randomNum]["pokemon"]["name"])
    }
    console.log(pokemonArray)
    return pokemonArray
}

const displayFive = async (pokemonName) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = response.data;
    console.log(pokemonData);
    let imageURL = pokemonData.sprites.front_default
    let image_element = document.createElement('img')
    image_element.src = imageURL
    mainDisplay = document.getElementById("pokemonDisplay")
    mainDisplay.appendChild(image_element)
}


// pickRandom();



  // let promise = fetch('https://pokeapi.co/api/v2/pokemon')
//     promise.then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch(error => console.log(error))

// fetch('https://pokeapi.co/api/v2/pokemon')
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch(error => console.log(error))
 
// axios.get('https://pokeapi.co/api/v2/pokemon/charizard')
// .then(response => {
//     let imageURL = response.data.sprites.front_default
//     console.log(imageURL)
//     console.log(response.data)
//     let image_element = document.createElement('img')
//     image_element.src = imageURL
//     document.body.appendChild(image_element)
// })


// const getMon = async () => {
//     const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1/");
//     const typeUrl = response.data.types[0].type.url;
//     console.log(typeUrl);
//     const typeResponse = await axios.get(typeUrl);
//     console.log(typeResponse);
//   };
//   getMon();