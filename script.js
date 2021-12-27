let APIURL =
	"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

current = 1;
function getNextAPIKey() {
	APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${
		current + 1
	}`;
	current = current + 1;
	getMovies(APIURL);
}

function getPreviousAPIKey() {
	if (current > 1) {
		APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${
			current - 1
		}`;
		current = current - 1;
		getMovies(APIURL);
	}
}

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
	"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
	const resp = await fetch(url);
	const respData = await resp.json();

	console.log(respData);

	showMovies(respData.results);
}

function showMovies(movies) {
	// clear main
	main.innerHTML = "";

	movies.forEach((movie) => {
		const { poster_path, title, vote_average, overview } = movie;

		const movieEl = document.createElement("div");
		movieEl.classList.add("movie");

		movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
					vote_average
				)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

		main.appendChild(movieEl);
	});
}

function getClassByRate(vote) {
	if (vote >= 8) {
		return "green";
	} else if (vote >= 5) {
		return "orange";
	} else {
		return "red";
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const searchTerm = search.value;

	if (searchTerm !== "" && searchTerm !== " ") {
		getMovies(SEARCHAPI + searchTerm);

		search.value = "";
	}
});

let clicked = 0;
function creator() {
	button = document.getElementById("me");
	if (clicked === 0) {
		button.textContent = "Abdulrahman Azmy :)";
		button.style.borderRadius = "10px";
        clicked = 1
    } else {
        button.textContent = "creator";
		button.style.borderRadius = "50px";
        clicked = 0
    }
}

window.addEventListener("change", () => {
    if (window.innerWidth < 600) {
        document.header.innerHTML = `
        <button onclick="getPreviousAPIKey()" class="more">previous</button>
                <button onclick="getNextAPIKey()" class="more">next</button>
                <form id="form">
                    <input
                        type="text"
                        id="search"
                        placeholder="Search"
                        class="search"
                    />
                </form>`;
    }
})


if (window.innerWidth < 600) {
    document.getElementById("hhh").style.fontWeight = "bold"
    document.getElementById("hhh").innerHTML = `
    <button style="width: 20%" onclick="getPreviousAPIKey()" class="more">previous</button>
            <button style="width: 20%" onclick="getNextAPIKey()" class="more">next</button>
            <form id="form">
                <input style="width: 50%"
                    type="text"
                    id="search"
                    placeholder="Search"
                    class="search"
                />
            </form>`;
}
window.onresize = () => {
    if (window.innerWidth < 600) {
        document.getElementById("hhh").innerHTML = `
        <button style="width: 20%" onclick="getPreviousAPIKey()" class="more">previous</button>
                <button style="width: 20%" onclick="getNextAPIKey()" class="more">next</button>
                <form id="form" style="width: 50%">
                    <input 
                        type="text"
                        id="search"
                        placeholder="Search"
                        class="search"
                    />
                </form>`;
    } else {
        document.getElementById("hhh").innerHTML = `
            <button id="me" class="me" onclick="creator()">creator</button>
			<button onclick="getPreviousAPIKey()" class="more">previous</button>
			<button onclick="getNextAPIKey()" class="more">next</button>
			<form id="form">
				<input
					type="text"
					id="search"
					placeholder="Search"
					class="search"
				/>
			</form>`;
    }
}
