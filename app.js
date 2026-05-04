// app.js
const routes = {
    "/":
        { title: "Home", file: "pages/home.html" },
    "/about":
        { title: "About", file: "pages/about.html" },
    "/contact":
        { title: "Contact", file: "pages/contact.html" },
};
constnotFound = {
    title: "Not Found", file: "pages/404.html"
};


functionparseHash() {
    returnlocation.hash.replace(/^#/, "") || "/";
}

functionrouter() {

    constpath = parseHash();
    constroute = routes[path] || notFound;

    fetch("./" + route.file)
        .then(r => r.text())
        .then(html => {
            document.getElementById("app").innerHTML = html;
            document.title = route.title + " · PWA Demo";
            mount(path); // re-bind page-specific listeners
        });
}
window.addEventListener("hashchange", router); // nav clicks
window.addEventListener("DOMContentLoaded", router); // initial + deep link

if ("serviceWorker"innavigator) {
    navigator.serviceWorker
        .register("./sw.js")
        .catch(console.error);