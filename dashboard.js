const model = {
    cardsList: null,
    cardListId:null,
    init: function(){
        model.cardsList = [];
        model.cardListId = 0;
    }
};

const octopus = {
    init: function(){
        model.init();
        view.init();
    },
    addCardList:function(val){
        obj = {
            id:octopus.getCardListId(),
            cardListUser: val,
            cardListContent:[],
            cardId:0
        };
        model.cardsList.push(obj);
        view.createCardList(obj);
    },
    getCardListId: function(){
        return model.cardListId++;
    },
    removeCardList: function(val){
        obj = model.cardList[val];
        obj.display = false;
    },
    addCard: function(id,val){
        obj = {
            task: val,
            status:"Assigned",
            display:true
        }
        model.cardsList[id].cardListContent.push(obj);
    },
    getCardId: function(val){
        return model.cardsList[val].cardId++;
    },
    removeCard: function(id1,id2){
        model.cardsList[id1].cardListContent[id2].display = false;
    },
    getCardList: function(){
        return model.cardsList;
    }
};

const view = {
    init: function(){
        div = document.querySelector(".card__add-list");
        div.addEventListener('click',view.addAnotherListDisplay);
        buttonCancel = document.getElementById("add-another-list-cancel-button");
        buttonCancel.addEventListener('click',view.canceladdAnotherListDisplay);
        buttonSave = document.getElementById("add-another-list-save-button");
        buttonSave.addEventListener('click',view.saveAddAnotherListDisplay);
        accountManagementDiv = document.querySelector(".account-management-cancel");
        accountManagementDiv.addEventListener('click',view.removeAccountManagementDiv);
    },
    render: function(){

    },
    removeAccountManagementDiv: function(event){
        div = event.target.closest(".account-management");
        div.remove();
    }, 

    addAnotherListDisplay: function(event){
        event.currentTarget.style.display = "none";
        input = document.getElementById("add-another-list-input");
        input.style.display="block";
    },
    canceladdAnotherListDisplay: function(){
        document.getElementById("add-another-list-in").value = "";
        document.getElementById("add-another-list-input").style.display="none";
        document.querySelector(".card__add-list").style.display="";
    },
    saveAddAnotherListDisplay: function(){
        val = document.getElementById("add-another-list-in").value;
        octopus.addCardList(val);
        view.canceladdAnotherListDisplay();
    },
    createCardList: function(obj){
        section1 = document.createElement('section');
        section1.classList.add("card");
        section1.setAttribute("data-cardListId",obj.id);
        //Card Title Creation
        div1 = document.createElement('div');
        div1.classList.add("card-title");
        div2 = document.createElement('div');
        div2.classList.add("card-user-name");
        div2.textContent = obj.cardListUser;
        div1.append(div2);
        p1 = document.createElement('img');
        p1.src="assets/images/cancel-icon.png";
        p1.style.width = "20px";
        p1.addEventListener('click',view.removeCardList);
        div1.append(p1);
        section1.append(div1);
        // Card Footer
        div3 = document.createElement('div');
        div3.classList.add("card-content-group");
        div11 = document.createElement('div');
        div11.classList.add("card-footer");
        div22 = document.createElement('div');
        div22.classList.add("add-another-card");
        div22.textContent = "+ Add another card";
        div22.addEventListener('click',view.addAnotherCard);
        div33 = document.createElement('div');
        div33.classList.add("add-another-card");
        div33.classList.add("three-dots");
        div33.textContent = "...";
        div11.append(div22);
        div11.append(div33);
        div3.append(div11);
        section1.append(div3);
        //Hidden Add Card Functionality
        div4 = document.createElement('div');
        div4.style.display = "none";
        div4.classList.add("add-another-card-input");
        input = document.createElement('input');
        input.type = "text";
        input.classList.add("add-another-card-in");
        input.placeholder="Enter a title for this card...";
        div4.append(input);
        div5 = document.createElement("div");
        div5.classList.add("add-another-card-button");
        div4.append(div5);
        button1 = document.createElement("button");
        button1.type = "button";
        button1.classList.add("add-another-card-save-button");
        button1.textContent = "Save";
        button1.addEventListener("click",view.saveAddAnotherCard);
        div5.append(button1);
        button2 = document.createElement("button");
        button2.type = "button";
        button2.classList.add("add-another-card-cancel-button");
        button2.textContent = "Cancel";
        button2.addEventListener("click",view.cancelAddAnotherCard);
        div5.append(button2);
        div3.append(div4);
        //Card Appending
        section = document.querySelector(".card-group");
        section.insertBefore(section1,section.lastElementChild);
    },
    saveAddAnotherCard: function(event){
        section = event.target.closest(".card");
        id = section.getAttribute("data-cardListId");
        val = section.querySelector(".add-another-card-in").value;
        octopus.addCard(id,val);
        view.addCard(event);
        view.cancelAddAnotherCard(event);
    },
    addCard: function(event){
        section = event.target.closest(".card");
        id = section.getAttribute("data-cardListId");
        val = section.querySelector(".add-another-card-in").value;
        div1 = document.createElement('div');
        div1.setAttribute("data-cardId",octopus.getCardId(id));
        div1.classList.add("card-content");
        div2 = document.createElement('div');
        div2.classList.add("card-content-text");
        div2.textContent = val;
        div3 = document.createElement('div');
        div3.classList.add("card-content-status");
        div3.innerHTML = "Status: <span>Assigned</span>";
        img = document.createElement('img');
        img.src = "assets/images/edit-icon.png";
        img.addEventListener('click',view.removeCard);
        div1.append(div2);
        div1.append(img);
        div2.append(div3);
        section.querySelector(".card-content-group").insertBefore(div1,section.querySelector(".card-footer"));
    },
    removeCard: function(event){
        section = event.target.closest(".card");
        id1 = section.getAttribute("data-cardListId");
        div = event.target.closest(".card-content");
        id2 = div.getAttribute("data-cardId");
        div.remove();
        octopus.removeCard(id1,id2);
    },
    cancelAddAnotherCard: function(event){
        section = event.target.closest(".card");
        section.querySelector(".card-footer").style.display = "";
        section.querySelector(".add-another-card-input").style.display="none";
        section.querySelector(".add-another-card-in").value = "";
    },
    removeCardList: function(event){
        section = event.target.closest(".card");
        id = section.getAttribute("data-cardListId");
        section.remove();
        octopus.removeCardList(id);
    },
    addAnotherCard: function(event){
        section = event.target.closest(".card");
        section.querySelector(".card-footer").style.display = "none";
        section.querySelector(".add-another-card-input").style.display="";
    }
};

octopus.init();

