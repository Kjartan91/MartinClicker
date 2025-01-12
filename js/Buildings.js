
class Upgrade {

    constructor(buildingList) {

        let unlocked = false;
        let description = buildingList[4]
        let name = buildingList[1];
        let nameElement;

        let imagePath = buildingList[3];
        let imageElement;

        let curPrice = buildingList[2];
        let curPriceElement;
        let priceMultiplier = 1.2;

        let count = 0;
        let countElement;
        let counterMultiplier = buildingList[5];

        // Main div
        let buildingDiv = document.createElement("div");
        buildingDiv.style.width = "320px";
        buildingDiv.style.height = "80px";
        buildingDiv.style.left = "30px";
        buildingDiv.style.marginBottom = "2px";
        buildingDiv.style.position = "absolute";
        buildingDiv.style.top = `${buildingList[0]*90}px`;
        buildingDiv.style.backgroundImage = "url('img/BuildingsBackground.png')";
        let parent = document.querySelector(".upgrades");
        parent.appendChild(buildingDiv);

        // Image
        imageElement = new Image(80, 80);
        imageElement.src = "img/BuildingsImagesUnknown.png";
        imageElement.style.position = "absolute";
        imageElement.style.left = "0px";
        imageElement.style.top = "-1px";
        imageElement.style.userSelect = "none";
        imageElement.setAttribute("draggable", false);
        buildingDiv.appendChild(imageElement);

        // Name
        nameElement = document.createElement("p");
        nameElement.innerHTML = "?";
        nameElement.style.position = "absolute";
        nameElement.style.left = "90px";
        nameElement.style.top = "5px";
        nameElement.style.width = "150px";
        nameElement.style.margin = "0px";
        nameElement.style.fontSize = "35px";
        nameElement.style.color = "white";
        nameElement.style.fontFamily = "Arial";
        nameElement.style.userSelect = "none";
        nameElement.style.opacity = "0";
        buildingDiv.appendChild(nameElement);

        // Diamond icon
        let diamondImage = new Image(20, 20);
        diamondImage.src = "img/Diamond.png";
        diamondImage.style.position = "absolute";
        diamondImage.style.left = "90px";
        diamondImage.style.top = "25px";
        diamondImage.style.userSelect = "none";
        diamondImage.setAttribute("draggable", false);
        buildingDiv.appendChild(diamondImage);

        // Price
        curPriceElement = document.createElement("p");
        curPriceElement.innerHTML = curPrice;
        curPriceElement.style.position = "absolute";
        curPriceElement.style.left = "110px";
        curPriceElement.style.top = "26px";
        curPriceElement.style.margin = "0px";
        curPriceElement.style.fontSize = "15px";
        curPriceElement.style.color = "darkred";
        curPriceElement.style.fontFamily = "Comic Sans MS";
        curPriceElement.style.userSelect = "none";
        buildingDiv.appendChild(curPriceElement);

        // Count
        countElement = document.createElement("p");
        countElement.innerHTML = count;
        countElement.style.position = "absolute";
        countElement.style.right = "10px";
        countElement.style.top = "-5px";
        countElement.style.margin = "0px";
        countElement.style.fontSize = "55px";
        countElement.style.color = "white";
        countElement.style.fontFamily = "Arial";
        countElement.style.userSelect = "none";
        countElement.style.opacity = "0";
        buildingDiv.appendChild(countElement);

        // Diamonds per sec
        let diaPerSecElement = document.createElement("p");
        diaPerSecElement.innerHTML = "0";
        diaPerSecElement.style.position = "absolute";
        diaPerSecElement.style.right = "10px";
        diaPerSecElement.style.bottom = "0px";
        diaPerSecElement.style.margin = "0px";
        diaPerSecElement.style.fontSize = "18px";
        diaPerSecElement.style.color = "white";
        diaPerSecElement.style.fontFamily = "Arial";
        diaPerSecElement.style.userSelect = "none";
        diaPerSecElement.style.opacity = "0";
        buildingDiv.appendChild(diaPerSecElement);

        // Check for unlock
        let unlockInterval;
        function interval()
        {
            if (!unlocked)
            {
                if (curDiamonds() >= curPrice)
                {
                    curPriceElement.style.color = "white";
                    //new MessageBox(`${name} åpnet!`, description, 5000)
                    nameElement.innerHTML = name;
                    //imageElement.src = imagePath;
                    unlocked = true;
                    //diaPerSecElement.innerHTML = count * counterMultiplier;
                    // Tooltip
                    let tooltip;
                    buildingDiv.addEventListener("mouseover", function(Event) {
                        tooltip = new Tooltip(name, description, curPrice, Event.pageX, Event.pageY);	
                    });
            
                    buildingDiv.addEventListener("mouseout", function(Event) {
                        tooltip.removeTooltip();
                    });

                    clearInterval(unlockInterval);
                }
            }
        }
        unlockInterval = setInterval(interval.bind(this), 100);

        // On click
        function onClick()
        {
            if (buy(Math.floor(curPrice)))
            {
                count++;
                nameElement.style.opacity = "1";
                countElement.style.opacity = "1";
                diaPerSecElement.style.opacity = "1";
                imageElement.src = imagePath;
                diaPerSecElement.innerHTML = `${count * counterMultiplier} D/s`;
                diamondImage.style.top = "55px";
                curPriceElement.style.top = "56px";

                diamondCounter.increaseDiaPerSec(counterMultiplier);

                curPrice *= priceMultiplier;
                curPrice = Math.floor(curPrice);
                curPriceElement.innerHTML = curPrice;

                
                countElement.innerHTML = count;
            }
        }
        buildingDiv.addEventListener("click", onClick.bind(this));
    }

    
}

function addUpgrades()
{
    let buildingList = [
        [1, "Elvis", 15, "img/BuildingsImagesElvis.png", "Med sin vakre stemme synger Elvis til seg diamanter", 1],
        [2, "Lambo", 200, "img/BuildingsImagesLambo.png", "Lambo er essensiell for en grådig jævel som Martin", 2],
        [3, "Excel", 1000, "img/BuildingsImagesExcel.png", "Med Excel kan Martin øke strømmen av diamanter ved å holde regnskap", 3],
        [4, "Faktura", 5000, "img/BuildingsImagesFaktura.png", "Finnes det et vakrere ord enn faktura :)", 4]
    ];

    for (let i = 0; i < buildingList.length; i++)
    {
        new Upgrade(buildingList[i]);
    }
        
    //new Upgrade(1, "Arne", 100);
    
    
}