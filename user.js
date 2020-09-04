let model = {
    users: null,
    init: function(){
        model.users = [{name:"Shruti",profile:"Product Engineer",location:"Gurugram",imageSource:"assets/images/Shruti_image.jpg"}]
    }
};

let octopus = {
    init: function(){
        model.init();
        view.init();
    },
    addUser: function(obj){
        model.users.push(obj);
    }
};

let view = {
    init: function(){
        img = document.getElementById("add-icon-image");
        img.addEventListener('click',view.handler1);
        cancelButton = document.getElementById("add-user-info-cancel-button");
        cancelButton.addEventListener('click',view.handler2);
        saveButton = document.getElementById("add-user-info-save-button");
        saveButton.addEventListener('click',view.handler3);
    },
    handler1: function(){
        document.getElementById("add-icon-image").style.display = "none";
        document.querySelector(".add-user-info").style.display = "block";
    },
    handler2: function(){
        document.getElementById("add-icon-image").style.display = "";
        document.querySelector(".add-user-info").style.display = "none";
        document.getElementById("user-info-name").value = "";
        document.getElementById("user-info-profile").value="";
        document.getElementById("user-info-location").value="";
        document.getElementById("user-info-image").value="";
    },
    handler3: function(){
        obj = {
            name: document.getElementById("user-info-name").value,
            profile: document.getElementById("user-info-profile").value,
            location: document.getElementById("user-info-location").value,
            imageSource: document.getElementById("user-info-image").value
        }
        octopus.addUser(obj);
        view.createCard(obj);
        view.handler2();
    },
    createCard: function(obj){
        div1 = document.createElement('div');
        div1.classList.add("user__profile");
        img = document.createElement('img');
        img.classList.add("user__profile--image");
        img.src = obj.imageSource;
        div2 = document.createElement('div');
        div2.classList.add("user__profile--name");
        div2.textContent = obj.name;
        div3 = document.createElement('div');
        div3.classList.add("user__profile--info");
        div3.innerHTML = obj.profile + "<br>" + obj.location;
        div1.append(img);
        div1.append(div2);
        div1.append(div3);
        div = document.querySelector(".users");
        div.insertBefore(div1,div.lastElementChild);
    }
};

octopus.init();