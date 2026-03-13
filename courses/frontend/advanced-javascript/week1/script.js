
function getRandomMovie() {
    const display = document.getElementById('random-movie-display');
    let count = 0;
    
    
    const shuffle = setInterval(function() {
        const tempIndex = Math.floor(Math.random() * movies.length);
        display.innerText = movies[tempIndex].title;
        display.style.color = "gray"; 
        count++;

       
        if (count > 10) {
            clearInterval(shuffle);
            const finalIndex = Math.floor(Math.random() * movies.length);
            const movie = movies[finalIndex];
            
            display.innerHTML = `🎬 ${movie.title} <br> <small>Released in ${movie.year}</small>`;
            display.style.color = movie.rating >= 7 ? "var(--success-green)" : "var(--text-main)";
            
           
            display.style.transform = "scale(1.1)";
            setTimeout(() => display.style.transform = "scale(1)", 200);
        }
    }, 50); 
}
let visibleCounts = {
    short: 10,
    long: 10,
    tagged: 10,
    ratings: 10,
    duplicate: 10
};


const shortTitles = movies.filter(function(movie) {
    return movie.title.length < 7;
});

const longTitles = movies.filter(function(movie) {
    return movie.title.length > 25;
});

const eightiesCount = movies.filter(function(movie) {
    return movie.year >= 1980 && movie.year <= 1989;
}).length;

const taggedMovies = movies.map(function(movie) {
    let movieTag = movie.rating >= 7 ? "Good" : movie.rating >= 4 ? "Average" : "Bad";
    return {
        title: movie.title,
        tag: movieTag
    };
});

const highRatingsOnly = movies
    .filter(function(movie) { return movie.rating > 6; })
    .map(function(movie) { return movie.rating; });

const keywords = ["surfer","alien","benjamin"];

const keywordCount = movies.reduce(function(total, movie){

    const title = movie.title.toLowerCase();

    keywords.forEach(function(word){
        if(title.includes(word)){
            total++;
        }
    });

    return total;

},0);

const duplicateTitles = movies.filter(function(movie) {
    const words = movie.title.toLowerCase().split(" ");
    return words.some(function(word, index) {
        return words.indexOf(word) !== index && word.length > 1;
    });
});

const averageRating = (movies.reduce(function(total, movie) {
    return total + movie.rating;
}, 0) / movies.length).toFixed(1);

const ratingStats = movies.reduce(function(counts, movie) {
    if (movie.rating >= 7) counts.good++;
    else if (movie.rating >= 4) counts.avg++;
    else counts.bad++;
    return counts;
}, { good: 0, avg: 0, bad: 0 });



function showLists() {
    // 1. Short Titles
    const shortUl = document.getElementById('short-titles-list');
    shortUl.innerHTML = shortTitles.slice(0, visibleCounts.short).map(function(m) {
        return "<li>" + m.title + "</li>";
    }).join("");

    // 2. Long Titles
    const longUl = document.getElementById('long-titles-list');
    longUl.innerHTML = longTitles.slice(0, visibleCounts.long).map(function(m) {
        return "<li>" + m.title + "</li>";
    }).join("");

    // 4. Tagged Movies
    const taggedUl = document.getElementById('tagged-movies-list');
    taggedUl.innerHTML = taggedMovies.slice(0, visibleCounts.tagged).map(function(m) {
        return "<li>" + m.title + " <strong>(" + m.tag + ")</strong></li>";
    }).join("");

    // 5. High Ratings
    const highRatingsUl = document.getElementById('high-ratings-list');
    highRatingsUl.innerHTML = highRatingsOnly.slice(0, visibleCounts.ratings).map(function(r) {
        return "<li>Rating: " + r + "</li>";
    }).join("");

    // 7. Duplicate Titles
    const duplicateUl = document.getElementById('duplicate-words-list');
    duplicateUl.innerHTML = duplicateTitles.slice(0, visibleCounts.duplicate).map(function(m) {
        return "<li>" + m.title + "</li>";
    }).join("");
    

    // Statistics
    document.getElementById('eighties-count').innerText = eightiesCount;
    document.getElementById('keyword-count').innerText = keywordCount;
    document.getElementById('average-rating').innerText = averageRating;
    document.getElementById('rating-counts').innerText = 
        "Good: " + ratingStats.good + " | Avg: " + ratingStats.avg + " | Bad: " + ratingStats.bad;
}


document.getElementById('btn-short').addEventListener('click', function() {
    visibleCounts.short += 10;
    showLists();
});

document.getElementById('btn-long').addEventListener('click', function() {
    visibleCounts.long += 10;
    showLists();
});

document.getElementById('btn-tagged').addEventListener('click', function() {
    visibleCounts.tagged += 10;
    showLists();
});

document.getElementById('btn-high-ratings').addEventListener('click', function() {
    visibleCounts.ratings += 10;
    showLists();
});

document.getElementById('btn-duplicate').addEventListener('click', function() {
    visibleCounts.duplicate += 10;
    showLists();
});

document.getElementById('btn-surprise').addEventListener('click', function() {
    getRandomMovie();
});


document.getElementById('movie-search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const resultsUl = document.getElementById('search-results-list');
    
    if (searchTerm === "") {
        resultsUl.innerHTML = '';
        return;
    }

    const filtered = movies.filter(function(movie) {
        return movie.title.toLowerCase().includes(searchTerm);
    });

    if (filtered.length === 0) {
        resultsUl.innerHTML = '<li style="padding: 10px; color: gray;">No movies found</li>';
    } else {
        resultsUl.innerHTML = filtered.slice(0, 10).map(function(movie) {
            return `<li><span>${movie.title}</span> <span style="font-size: 0.8rem; opacity: 0.7;">${movie.year}</span></li>`;
        }).join("");
    }
});

document.getElementById('movie-search').addEventListener('focus', function(e) {
    if (e.target.value !== "") {
        
        e.target.dispatchEvent(new Event('input'));
    }
});


document.addEventListener('click', function(event) {
    const searchContainer = document.querySelector('.search-container');
    const resultsUl = document.getElementById('search-results-list');
    
   
    if (searchContainer && !searchContainer.contains(event.target)) {
        resultsUl.innerHTML = '';
    }
});


showLists();