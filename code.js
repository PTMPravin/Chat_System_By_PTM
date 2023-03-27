(function(){
    const app = document.querySelector(".app");
    const socket = io();

    let uname;
    
    app.querySelector(".join-screen #join-user").addEventListener("click",function(){
        console.log("It's Calling The Function Of Join");
        let username = app.querySelector(".join-screen #username").value;
        if(username.length===0){
            return;
        }
        socket.emit("newuser",username);
        uname = username;
        console.log("User Name : "+uname);
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    });

    app.querySelector(".chat-screen #send-message").addEventListener("click", function(){
        console.log("It's Calling The Function Of Send");
        let message = app.querySelector(".chat-screen #message-input").value;
        if(message.length === 0){
            return;
        }

        render_Message("my",{
            username: uname,
            text: message
        });

        socket.emit("chat",{
            username: uname,
            text: message
        });

        app.querySelector(".chat-screen #message-input").value = "";
    });

    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function(){
        socket.emit("exituser",uname);
        window.location.href = window.location.href;
    });

    socket.on("update", function(update){
        render_Message("update", update);
    });
    
    socket.on("chat", function(message){
        render_Message("other", message);
    });

    //Function Of Render_Message

    function render_Message(type,message){
        let message_Container = app.querySelector(".chat-screen .messages");

        if(type == "my"){
            let create_Message_Div = document.createElement("div");
            create_Message_Div.setAttribute("class","message my-message");
            create_Message_Div.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            message_Container.appendChild(create_Message_Div);
            console.log("My");
        }
        else if(type == "other"){
            let create_Message_Div = document.createElement("div");
            create_Message_Div.setAttribute("class","message other-message");
            create_Message_Div.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            message_Container.appendChild(create_Message_Div);
            console.log("Other");
        }
        else if(type == "update"){
            let create_Message_Div = document.createElement("div");
            create_Message_Div.setAttribute("class","update");
            create_Message_Div.innerText = message;
            message_Container.appendChild(create_Message_Div);
            console.log("update");
        }

        //Scroll Chat To End
        message_Container.scrollTop = message_Container.scrollHeight - message_Container.clientHeight;
    }


})();