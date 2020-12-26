
let btnChangeTheme = document.getElementById("forTheme");
let numOfItem = document.getElementById("numOfItems");
let inpAdd = document.getElementById("addNewItem");
let items;
let nom = 0;



if (JSON.parse(localStorage.getItem("items")) == null)
{
    items = [];
    numOfItem.innerHTML=items.length;


}

else 
{
    items = JSON.parse(localStorage.getItem("items"));
    addToPage();
}


function addToPage()
{
    let tempAdd = "";

    for (var i = items.length-1 , count = 0 ; i >= 0 ; i--)
    {
        if(items[i].complete == false && i == items.length-1)
            tempAdd += `<div id="item${i+1}" class="item fItem form-control"><input class="checkbox" onchange="check(item${i+1})" type="checkbox">${items[i].task}<img class="img-fluid clearItem float-right mt-1" onclick="deleteItem(${i})" src="images/icon-cross.svg"></div>`;
        
        else if(items[i].complete == "true" && i == items.length-1)
        {
            tempAdd += `<div id="item${i+1}" class="completed fItem item form-control"><img class="img-fluid checkMark mt-2" src="images/icon-check.svg"><input checked class="checkbox" onchange="check(item${i+1})" type="checkbox">${items[i].task}<img class="img-fluid clearItem float-right mt-1" onclick="deleteItem(${i})" src="images/icon-cross.svg"></div>`;
            count++;
        }

        else if(items[i].complete == "true")
        {
            tempAdd += `<div id="item${i+1}" class="completed item form-control"><img class="img-fluid checkMark mt-2" src="images/icon-check.svg"><input checked class="checkbox" onchange="check(item${i+1})" type="checkbox">${items[i].task}<img class="img-fluid clearItem float-right mt-1" onclick="deleteItem(${i})" src="images/icon-cross.svg"></div>`;
            count++;
        }

        else
            tempAdd += `<div id="item${i+1}" class=" item form-control"><input class="checkbox" onchange="check(item${i+1})" type="checkbox">${items[i].task}<img class="img-fluid clearItem float-right mt-1" onclick="deleteItem(${i})" src="images/icon-cross.svg"></div>`;

    }
    document.getElementById("items").innerHTML= (tempAdd);
    nom = items.length-count;
    numOfItem.innerHTML = nom;

    document.getElementById("showAll").classList.add("activeBright");
    document.getElementById("showActive").classList.remove("activeBright");
    document.getElementById("showCompleted").classList.remove("activeBright");

}


function storeData()
{
    localStorage.setItem("items", JSON.stringify(items));
}


inpAdd.addEventListener("keydown",function(e){
    if(e.keyCode == 13)
    {
        addItem();
        storeData();
        addToPage();
    }
})


function addItem()
{
    if(inpAdd.value != "")
    {
        let item = {task:inpAdd.value, complete:false}
        items.push(item);
        inpAdd.value="";
    }
    else window.alert("Please enter a valid task");
}


function deleteItem(nom)
{
    items.splice(nom,1);
    storeData();
    addToPage();
}


function check(element)
{    
    element.classList.add("completed");
    let id = element.id.substr(4);
    
     items[id-1].complete = "true";
     storeData();
     addToPage();
}

document.getElementById("clearALL").addEventListener("click",function(){
    items = [];
    storeData();
    addToPage();
})

function addActiveToPage(){

    let tempAdd = "";

    for (let i = items.length-1 ; i >= 0 ; i--)
    {
        if(items[i].complete == false && i == items.length-1)

            tempAdd += `<div id="item${i+1}" class="item fItem form-control"><input class="checkbox" onchange="check(item${i+1})" type="checkbox">${items[i].task}<img class="img-fluid clearItem float-right mt-1" onclick="deleteItem(${i})" src="images/icon-cross.svg"></div>`;

        else if(items[i].complete == false)
                tempAdd += `<div id="item${i+1}" class="item form-control"><input class="checkbox" onchange="check(item${i+1})" type="checkbox">${items[i].task}<img class="img-fluid clearItem float-right mt-1" onclick="deleteItem(${i})" src="images/icon-cross.svg"></div>`;
    
    }
    document.getElementById("items").innerHTML= (tempAdd);
    numOfItem.innerHTML = nom;

    document.getElementById("showAll").classList.remove("activeBright");
    document.getElementById("showActive").classList.add("activeBright");
    document.getElementById("showCompleted").classList.remove("activeBright");

}

function addCompletedToPage(){

    let tempAdd = "";

    for (var i = items.length-1; i >= 0 ; i--)
    {
        if(items[i].complete == "true" || i == items.length)
        {
            tempAdd += `<div id="item${i+1}" class="completed fItem item form-control"><img class="img-fluid checkMark mt-2" src="images/icon-check.svg"><input checked class="checkbox" onchange="check(item${i+1})" type="checkbox">${items[i].task}<img class="img-fluid clearItem float-right mt-1" onclick="deleteItem(${i})" src="images/icon-cross.svg"></div>`;
        }
        else if(items[i].complete == "true") 
        {
            tempAdd += `<div id="item${i+1}" class="completed item form-control"><img class="img-fluid checkMark mt-2" src="images/icon-check.svg"><input checked class="checkbox" onchange="check(item${i+1})" type="checkbox">${items[i].task}<img class="img-fluid clearItem float-right mt-1" onclick="deleteItem(${i})" src="images/icon-cross.svg"></div>`;
        }
    }
    document.getElementById("items").innerHTML= (tempAdd);
    numOfItem.innerHTML = nom;


    document.getElementById("showAll").classList.remove("activeBright");
    document.getElementById("showActive").classList.remove("activeBright");
    document.getElementById("showCompleted").classList.add("activeBright");
}


btnChangeTheme.addEventListener("click",function(e){

    let pathTheme = document.getElementById("themeStyly");

    if(e.target.alt == "moon")
    {
        pathTheme.href = "css/cssDark.css";
        e.target.src = "images/icon-sun.svg";
        e.target.alt = "sun";
    }
    
    else
    {
        pathTheme.href = "css/cssLight.css";
        e.target.src = "images/icon-moon.svg";
        e.target.alt = "moon";
    }

})