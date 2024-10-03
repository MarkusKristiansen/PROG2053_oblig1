let page = 1;

function fetchData() {

    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=3`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then(posts => {
            let container = document.getElementById("main-container");

            let i = 1;
            posts.forEach(post => {
                const article = document.createElement("article");
                const title = document.createElement("h1");
                title.textContent = post.title;
                const body = document.createElement("p");
                body.textContent = post.body;
                article.appendChild(title);
                article.appendChild(body);
                container.appendChild(article);
            });

            page++;
        })
}

window.addEventListener('scroll', () => {
    const scrollableHeight = document.documentElement.scrollHeight;
    const currentScroll = window.innerHeight + window.scrollY;

    if (currentScroll >= scrollableHeight - 1) {
        fetchData();
    }
});

fetchData();
fetchData();
fetchData();