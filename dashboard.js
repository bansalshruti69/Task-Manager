let model = {
    cards: null,
    init: function(){
        let obj = {
            cardTitle:"Shruti Bansal",
            cardContent: [ {task: "Practice Project for creating a task manager webpage.", status:"In Progress"}]
        };
        model.cards = [];
        model.cards.push(obj);
    }
};

let octopus = {
    init: function(){
        model.init();
        view.init();
    },
    addCard:function(val){
        obj = {
            cardTitle: val,
            cardContent:[]
        };
        model.cards.push(obj);
    }
};

let view = {
    init: function(){
        let div = document.querySelector(".card__add-list");
        div.addEventListener('click',view.handler1);
        buttonCancel = document.getElementById("add-another-list-cancel-button");
        buttonCancel.addEventListener('click',view.handler2);
        buttonSave = document.getElementById("add-another-list-save-button");
        buttonSave.addEventListener('click',view.handler3);
    },
    handler1: function(event){
        event.currentTarget.style.display = "none";
        input = document.getElementById("add-another-list-input");
        input.style.display="block";
    },
    handler2: function(){
        document.getElementById("add-another-list-in").value = "";
        document.getElementById("add-another-list-input").style.display="none";
        document.querySelector(".card__add-list").style.display="";
    },
    handler3: function(){
        val = document.getElementById("add-another-list-in").value;
        octopus.addCard(val);
        view.createCard(val);
        view.handler2();
    },
    createCard: function(val){
        section1 = document.createElement('section');
        section1.classList.add("card");
        //Card Title Creation
        div1 = document.createElement('div');
        div1.classList.add("card-title");
        div2 = document.createElement('div');
        div2.classList.add("card-user-name");
        div2.textContent = val;
        div1.append(div2);
        p1 = document.createElement('p');
        p1.textContent = "...";
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
        div33 = document.createElement('div');
        div33.classList.add("add-another-card");
        div33.classList.add("three-dots");
        div33.textContent = "...";
        div11.append(div22);
        div11.append(div33);
        div3.append(div11);
        section1.append(div3);
        //Card Appending
        section = document.querySelector(".card-group");
        section.insertBefore(section1,section.lastElementChild);
    }
};

octopus.init();

