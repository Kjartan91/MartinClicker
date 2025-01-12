function buy(price)
{
    let diamonds = sessionStorage.getItem("diamonds");

    if (diamonds >= price)
    {
        diamonds -= price;
        sessionStorage.setItem("diamonds", diamonds);
        return true;
    }
    else
        return false;
}

function increaseDiamonds(increaseBy)
{
    let diamonds = +sessionStorage.getItem("diamonds");
    diamonds += increaseBy;
    sessionStorage.setItem("diamonds", diamonds);
}

function curDiamonds()
{
    let diamonds = +sessionStorage.getItem("diamonds");
    return diamonds;
}

function saveGameLocal() {
    //Save diamonds
    localStorage.setItem("diamonds", sessionStorage.getItem("diamonds"));
    //Save pickaxe upgrade
    localStorage.setItem("pickaxeUpgrade", sessionStorage.getItem("pickaxeUpgrade"));
    //TODO: Save buildings (and upgrades)
}

function getGameLocal() {
    let diamonds = localStorage.getItem("diamonds")
    sessionStorage.setItem("diamonds", diamonds)
    let pickaxe = localStorage.getItem("pickaxeUgrade");
    sessionStorage.setItem("pickaxeUpgrade", pickaxe);
    //TODO: Kjartan! Get buildings (and upgrades) -- oppdater de tingene som leses fra sessionStorage, hvis det er sånn det funker. Har ikke orket å se på det ennå.
}

function convertDiaNum(number) {

    if (number < 1000)
        return Math.floor(number);

    if (number < 1000000)
        return `${(number / 1000).toFixed(1)} tusen`;

    if (number < 1000000000)
        return `${(number / 1000000).toFixed(1)} millioner`;

    if (number < 1000000000000)
        return `${(number / 1000000000).toFixed(1)} milliarder`;

    return "Du er alt for rik";

}