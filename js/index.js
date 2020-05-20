
const body = document.querySelector('body')
const sectionInput = document.querySelector('.section-input')
const footer = document.querySelector('.footer') 
const btnSearch = document.querySelector('.btn-search')
const inputUser = document.querySelector('input')
let arrayRepos = []
let labels = [
    `Nome do repositório: `,
    `Link: `,
    `Descrição: `,
    `Estrelas: `
]

function searchDataUser(url) {
    arrayRepos = []
    axios.get(url)
        .then(response => response.data.forEach(repos => {

            let obj = {
                name: repos.name,
                link: repos.html_url,
                description: repos.description,
                stars: repos.stargazers_count,
            }

            arrayRepos.push(obj)

            if (response.data.length === arrayRepos.length) {
                showRepos()
            }
        }))
        .catch(error => console.log(error), window.alert("Usuário inexistente!"))
}

btnSearch.addEventListener('click', (event) => {
    const url = `https://api.github.com/users/${inputUser.value}/repos`
    searchDataUser(url)
})

function showRepos() {

    const listRepositories = document.querySelector('.list-repositories')
    if(listRepositories) {
        listRepositories.remove()
    }
    
    const div = document.createElement('div')
    div.classList.add('list-repositories')
    body.insertBefore(div, footer)

    function sizeProperties() {
        for (const key in arrayRepos) {
            const sizeProperties = Object.keys(arrayRepos[key]).length
            return sizeProperties
        }
        return sizeProperties
    }

    for (let repos of arrayRepos) {
        const ul = document.createElement('ul')
        ul.innerHTML = `<h2>${labels[0]} ${repos.name}</h2>`
        div.appendChild(ul)

        for (let i = 1; i < sizeProperties(); i++) {
            const li = document.createElement('li')
            
            if(Object.keys(repos)[i] === 'link') {

                let elementA = document.createElement('a')
                elementA.setAttribute('href', `${Object.values(repos)[i]}`)
                elementA.setAttribute('target', '_blank')
                elementA.innerHTML = `${Object.values(repos)[i]}`
                li.innerHTML = `${labels[i]}`
                li.appendChild(elementA)

            } else {
            
                li.innerHTML = `${labels[i]} ${Object.values(repos)[i]}`
            }
            
            ul.appendChild(li)
        }
    }
}


