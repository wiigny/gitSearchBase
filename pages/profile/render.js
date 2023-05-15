const ulListRepos = document.querySelector('#listRepos')
const avatarUser = document.querySelector('#avatarUserGit')
const nameUser = document.querySelector('#nameUserGit')
const bioUser = document.querySelector('#bioUserGit')
const emailUser = document.querySelector('#emailUser')

function addUserGit(elt){
    fetch(elt)
    .then(resp => resp.json())
    .then(resp => {
        avatarUser.src = resp.avatar_url
        avatarUser.alt = resp.name
        emailUser.children[0].href = `mailto:${resp.email}`
        nameUser.innerText = resp.name
        bioUser.innerText = resp.bio
    })

    addReposUser(elt)
}

function addReposUser(element){
    fetch(`${element}/repos`)
    .then(resp => resp.json())
    .then(resp => {
        ulListRepos.innerHTML = ''
        resp.forEach(elt => ulListRepos.appendChild(makeRender(elt)))
    })
}


function makeRender(elt){
    let li = document.createElement('li')
        li.classList = 'dspl-flex flex__direc-column gap40 justf__cont-S-B'
        let h2 = document.createElement('h2')
            h2.classList = 'title2'
            h2.innerText = elt.name
        let p = document.createElement('p')
            p.classList = 'text6 opac60'
            p.innerText = elt.description
        let div = document.createElement('div')
            div.classList = 'dspl-flex gap14'
            let buttonRepos = document.createElement('button')
                buttonRepos.classList = 'button3'
                let aRepo = document.createElement('a')
                    aRepo.classList = 'text4'
                    aRepo.href = elt.html_url
                    aRepo.target = '_blank'
                    aRepo.innerText = 'Repositório'
            buttonRepos.appendChild(aRepo)

            let buttonDemo = document.createElement('button')
                buttonDemo.classList = 'button3'
                let aDemo = document.createElement('a')
                    aDemo.classList = 'text4'
                    aDemo.href = checkPage(elt.homepage)
                    aDemo.target = checkPageTarget(elt.homepage)
                    aDemo.innerText = 'Demo'
            buttonDemo.appendChild(aDemo)
        div.append(buttonRepos, buttonDemo)
    li.append(h2, p, div)

    return li
}               

function checkPage(elt){
    if(elt){
        let linkTreated = elt.slice(0,8) + elt.slice(12)
        return linkTreated
    }else{
        return '#'
    }
}
function checkPageTarget(elt){
    if(elt){
        return '_blank'
    }else{
        return ''
    }
}