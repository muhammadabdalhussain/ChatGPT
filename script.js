let prompt = document.getElementById("prompt");
let btn = document.getElementById("btn");
let container = document.querySelector(".container")
let chatContainer = document.getElementsByClassName("chat-container")[0];
let userMessage = null;

let Api_Url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD7roGY4Ldu878Q6SujIq9Vs3mHpzZIfHw';


function createChatBox(html, className) {
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

// is API ko fetch karay ga is sa data lakar aygay
async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector(".text")
    try {
        let response = await fetch(Api_Url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        // "role": "user",
                        "parts": [{ "text": userMessage }]
                    }]
            })
        })
        let data = await response.json();
        let apiResponse = data?.candidates[0].content.parts[0].text;
        textElement.innerText = apiResponse
    } catch (error) {
        console.log(error)
    }
    finally {
        aiChatBox.querySelector(".loading").style.display = "none"
    }
}

function showLoading() {
    let html = `<div class="img">
                <img src="ai.png" alt="" width="50">
            </div>
            <p class="text"></p>
            <img class="loading" src="loading.webp" alt="loading" height="50">`
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    getApiResponse(aiChatBox);
}

btn.addEventListener("click", () => {
    userMessage = prompt.value
    if(userMessage == ""){
        container.style.display = "flex"
    }
    else{
        container.style.display = "none"
    }
    if (!userMessage) return;
    let html = `<div class="img">
                <img src="user.png" alt="" width="50">
            </div>
            <p class="text"></p>`;
    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector(".text").innerText = userMessage;  // inertext is equal to userMessage
    chatContainer.appendChild(userChatBox);
    prompt.value = "";                                        // input ki value null hojay
    setTimeout(showLoading, 500)
})
