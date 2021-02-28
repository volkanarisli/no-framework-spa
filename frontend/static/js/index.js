import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

const naviagteTo = url => {
    history.pushState(null, null, url);
    router();
}


const router = async () => {
    const routes = [
        {
            path: '/',
            view: Dashboard 
        },
        {
            path: '/posts',
            view: Posts
        },
        {
            path: '/settings',
            view: Settings
        }
    ]
    //Test each routye for potential match 
    const potentialMathces = routes.map(route =>
    ({
        route: route,
        isMatch: location.pathname === route.path
    })
    )
    let match = potentialMathces.find(potentialMatch => potentialMatch.isMatch)

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();

    console.log(match.route.view())

};

window.addEventListener("popstate", router)


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            naviagteTo(e.target.href);
        }
    })
    router()
})