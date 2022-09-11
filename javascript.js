// const loadingNumber = document.querySelector('#loadingNumber');
// const loadingCircle = document.querySelector('.loading-circle');
// let load = 0;

// setInterval(updateLoader, 30);

// function updateLoader() {
//     load += (load < 100);
//     loadingNumber.innerHTML = load;
//     loadingCircle.style.background = 'conic-gradient(from 0deg at 50% 50%, rgb(231, 189, 0) 0%, rgb(231, 131, 0) ' + load + '%, #101012 ' + load + '%)'
// }


let username = "afsharsharifi"



fetch(`https://api.github.com/users/${username}`).then(response => {
    return response.json()
}).then(data => {
    document.getElementById("github-id").innerHTML = data.id
    document.getElementById("avatar").src = data.avatar_url
    document.getElementById("profile-url").href = data.html_url
    document.getElementById("github-name").innerHTML = data.name
    paginatedFetch(`https://api.github.com/users/${username}/followers`).then(function(response) {
        document.getElementById("followers-count").innerHTML = response.length
    })
    paginatedFetch(`https://api.github.com/users/${username}/following`).then(function(response) {
        document.getElementById("following-count").innerHTML = response.length
    })
    paginatedFetch(`https://api.github.com/users/${username}/starred`).then(function(response) {
        document.getElementById("stars-count").innerHTML = response.length
    })
    paginatedFetch(`https://api.github.com/users/${username}/repo`).then(function(response) {
        document.getElementById("repositories-count").innerHTML = response.length
    })
    document.getElementById("register-date").innerHTML = new Date(data.created_at).toDateString()
    document.getElementById("last-update").innerHTML = new Date(data.updated_at).toDateString()
    document.getElementById("github-bio").innerHTML = data.bio
    document.getElementById("location").innerHTML = data.location
})


async function getUserFollowers(username) {
    const response = await fetch(`https://api.github.com/users/${username}/followers`)
    const json = await response.json()
    return json
}


async function getUserFollowings(username) {
    const response = await fetch(`https://api.github.com/users/${username}/following`)
    const json = await response.json()
    return json
}

async function getUserRepositories(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`)
    const json = await response.json()
    return json
}

listOfFollowers = new Array();
listOfFollowings = new Array();

// Unfollowers
getUserFollowers(username).then(function(followers) {
    getUserFollowings(username).then(function(followings) {
        console.log(getDifference(followings, followers));
    });
});


// Don't Follow Back
getUserFollowers(username).then(function(followers) {
    getUserFollowings(username).then(function(followings) {
        console.log(getDifference(followers, followings));
    });
});

function getDifference(array1, array2) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.login === object2.login;
        });
    });
}


function paginatedFetch(url, page = 1, previousResponse = []) {
    return fetch(`${url}?page=${page}`).then(response => response.json()).then(newResponse => {
        response = previousResponse.concat(newResponse);
        if (newResponse.length !== 0) {
            page++;
            return paginatedFetch(url, page, response)
        }
        return response;
    })
}