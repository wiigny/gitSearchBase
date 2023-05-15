const input = document.querySelector('#inputSearchUser')
const button = document.querySelector('#buttonSearchUser')
button.disabled = true
const pNotFound = document.querySelector('#notFound')
const ulRecentlyFound = document.querySelector('#recentlyFound')
let usersRecently = []


input.addEventListener('keyup', ()=>{

    if(input.value.length > 2){
        button.disabled = false
    }else{
        button.disabled = true
    }
})

button.addEventListener('click', (e)=>{
    e.preventDefault()

    fetch(`https://api.github.com/users/${input.value}`)

    .then(response => {
        response.json()
        if(response.ok){
            checkRecentUser()
            
            button.children[0].classList.add('loader')
            button.children[0].innerText = ''
            setTimeout(()=>{
                window.location.href = "../../pages/profile/index.html"
            }, 2000)
            
        }else{  
            pNotFound.classList.remove('dspl-none')
            pNotFound.innerText = 'Usuário não encontrado'
            button.disabled = true
            input.value = ''
            input.style.borderColor = "var(--color-alert)"
            setTimeout(()=> {
                button.children[0].classList.remove('loader')
                pNotFound.classList.add('dspl-none')
                input.style.borderColor = "var(--color-grey-7-16)"
            }, 3000)
        }
    })
    
})

function addRecentlyToLocal(){
    const recent = localStorage.getItem('recentUser')
    if(recent){
        usersRecently.unshift(...JSON.parse(recent))
    }
    callMakeRecentUser()
}
addRecentlyToLocal()

function recentCardUser(){
    const cardRecentUser = document.querySelectorAll('#cardRecentUser')
    cardRecentUser.forEach(cards=>{
        cards.addEventListener('click', (e)=>{
            e.preventDefault()
            let user = [e.currentTarget.href]
            addlocalStorage(user)
            window.location.href = "../../pages/profile/index.html"
        })
    })   
}

function checkRecentUser(){
    
    fetch(`https://api.github.com/users/${input.value}`)
    .then(resp=>resp.json())
    .then(resp=>{
        
        if(usersRecently.length === 0){
            usersRecently.unshift(resp)
        }
        else if(!usersRecently.some(elt => elt.login.toLowerCase() == input.value.toLowerCase())){
            usersRecently.unshift(resp)
            usersRecently = usersRecently.slice(0,3)
        }
        let user = [`https://api.github.com/users/${input.value}`]
        button.disabled = true
        input.value = ''
        
            
        addlocalStorage(user)
    })
  
}

function addlocalStorage(arr){
    const listRecentUser = []
    listRecentUser.push(JSON.stringify(usersRecently))
    const haveList = localStorage.getItem('recentUser')

    if(!haveList){
        localStorage.setItem('recentUser', listRecentUser)
    }else{
        localStorage.setItem('recentUser', listRecentUser)
    }

    localStorage.setItem('userFound', JSON.stringify(arr))

    callMakeRecentUser()
}

function callMakeRecentUser(obj = usersRecently){
    ulRecentlyFound.innerHTML = ''
    obj.forEach(elt=>{
        ulRecentlyFound.append(makeRecentUser(elt))
    })
    recentCardUser()
}

function makeRecentUser(elt){

    let li = document.createElement('li')
    
        let a = document.createElement('a')
            a.id = 'cardRecentUser'
            a.classList = 'dspl-flex'
            a.href = elt.url
            let img = document.createElement('img')
                img.src = elt.avatar_url
                img.alt = elt.name
        a.appendChild(img)
    li.append(a)

    return li
}