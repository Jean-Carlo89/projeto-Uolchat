let conversation = document.querySelector('ul');
const message = document.querySelector('input')
let log, newMessages;
let userLog;
let recipient='todos';
let type = 'message'
/*----------------Enter room----------------*/

login()
function login(){

userLog = prompt('Qual é o seu nome?')
const enter = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants',{name: userLog})

enter.then(loginSuccess,userLog)

enter.catch(loginError)
}

function loginSuccess(AnswerSuccess){
    getMessages()
    getListOfPeople()
    setInterval(getListOfPeople,10000)
    newMessages = setInterval(getMessages,3000)
    log = setInterval(stayLogged,5000,userLog) 
}


function loginError(AnswerError){
    console.log(AnswerError)
    if(AnswerError.response.status===400){
        alert('Já existe um usuário com este nome, insira outro')
        login()
    }
}

function loginStop(){
    clearInterval(log)
    clearInterval(newMessages)
}

function stayLogged(userLog){
    const stayMessage = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status',{name: userLog})
    stayMessage.then(stayCheck)
    stayMessage.catch(stayError)
}

function stayCheck(stay){}

function stayError(stayError){
    alert('Você foi desconectado')
    window.location.reload()
}

/*--------------------------Get messages---------------*/

function getMessages(){
const getMessages = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages')
getMessages.then(check)
}

function check(messages){
    conversation.innerHTML=""
    
    for(i=0;i<messages.data.length;i++){
        
        const from =messages.data[i].from
        const to =messages.data[i].to
        const text =messages.data[i].text
        const time =messages.data[i].time
        const type =messages.data[i].type
        
        
        if(type==='message'){
        
        conversation.innerHTML +=
            `
            <li class="message">
                <p><span>(${time}) &nbsp <strong>${from}</strong> &nbsp para &nbsp <strong>${to}</strong>:</span> &nbsp ${text}</p>
            </li>
            
            `
        }

        if(type==='status'){
            conversation.innerHTML +=
            `
            <li class="message action">
                <p>(${time})&nbsp <strong>${from}</strong> &nbsp ${text}</p>
            </li>
            
            `
        }

        if(type==='private_message' && (from===userLog || to===userLog)){
            conversation.innerHTML +=
            `
            <li class="message private">
            <p><span>(${time}) &nbsp <strong>${from}</strong> &nbsp reservadamente &nbsp para &nbsp <strong>${to}</strong>:</span> &nbsp ${text}</p>
            </li>
            
            `
        }
    }
   conversation.scrollTop =conversation.scrollHeight;   
}

/*----------------------------------------Send messages-----*/
function sendMessage(){
   
    const removeAllChecks = document.querySelectorAll('.icon-check.selected')
    
    for(let i=0;i<removeAllChecks.length;i++){
        removeAllChecks[i].classList.remove('selected')
    }
    
    if(message.value===""){
        return;
    }
    
    const sendMessage = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages',{from: userLog, to:recipient,text: message.value, type:type})
    message.value="";
    
    recipient='todos';
     type = 'message'

     sendMessage.then(refreshMessages)
     sendMessage.catch(reloadPage)
}

function refreshMessages(messageSent){
    getMessages()
}
function reloadPage(messageNotSent){
   console.log('erro no envio da msg')
    window.location.reload()
}

/*-------------Control active users and visibility type of message---------*/

function openParticipants(){
    
    const body = document.querySelector('body')
    const sidebar = document.querySelector('.sidebar-container')
    sidebar.classList.toggle('hidden')
    sidebar.classList.toggle('move')
}

function goBack(page){
   page.parentNode.classList.toggle('hidden')
   page.parentNode.classList.toggle('move')
}




function getMessageName(clickedParticipant){
    const removeSelected = document.querySelector('.participant-option .icon-check.selected')
    
    if(removeSelected!==null){
        removeSelected.classList.remove('selected')
    }
    
    clickedParticipant.children[1].classList.add('selected')
    const personName = clickedParticipant.children[0].innerText
    
    recipient=personName
}

function getListOfPeople(){
    const participants = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants')
    participants.then(completeList)
}

function completeList(listOfPeople){
   
    const peopleUl=document.querySelector('.participants')
    
    peopleUl.innerHTML =
    `<li class="participant-option" onclick="getMessageName(this)">
            <span> <ion-icon name="people-sharp" class="icon"></ion-icon>  Todos</span> <ion-icon name="checkmark-circle-outline" class="icon icon-check selected"></ion-icon>
    </li>
    `


    for(let i =0;i<listOfPeople.data.length;i++){
        peopleUl.innerHTML +=`
        <li class="participant-option" onclick="getMessageName(this)">
            <span> <ion-icon name="person-circle" class="icon"></ion-icon>  ${listOfPeople.data[i].name}</span> <ion-icon name="checkmark-circle-outline" class="icon icon-check"></ion-icon>
        </li>
        `
    }
}

function getVisibilityType(clickedVisibility){
    const removeSelected = document.querySelector('.visibility-option .icon-check.selected')
    
    if(removeSelected!==null){
        removeSelected.classList.remove('selected')
    }
    
    clickedVisibility.children[1].classList.add('selected')
   
    let visibility = clickedVisibility.children[0].innerText
   
   if(visibility=='Reservadamente'){
       visibility='private_message'
   }

   if(visibility=='Público'){
        visibility='message'
   }
   console.log(visibility)
   
   type=visibility
}