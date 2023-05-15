function changeUser(){
    const buttonChangeUser = document.querySelector('#changeUser')
    buttonChangeUser.addEventListener('click', ()=>{
        window.location.href = '../../index.html'
    })   
}
changeUser()

function showUser(){
    const listLocalStorage = JSON.parse(localStorage.getItem('userFound'))
    addUserGit(listLocalStorage[0])
}
showUser()