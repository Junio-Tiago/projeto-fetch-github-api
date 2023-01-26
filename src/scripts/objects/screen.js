const screen = {  
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){ 
         this.userProfile.innerHTML = 
         `<div class="info">
              <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
            <div class="data">
                <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
              <div class="follow">
               <h3> <i class="fas fa-users"></i> Seguidores: ${user.followers ?? 'Não possui seguidores'}</h3>
               <br>
                  <h3>  <i class="fas fa-user"></i> Seguindo: ${user.following ?? 'Não está seguindo ninguém'}</h3>
              </div>
            </div>
          </div>`
            
            

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}"target="_blank">${repo.name} 
        <p> <i class="fas fa-utensils"></i> ${repo.forks} </p> 
        <p> <i class="fas fa-star"></i> ${repo.stargazers_count} </p>
        <p> <i class="fas fa-eye"></i> ${repo.watchers} </p>
        <p> <i class="fas fa-laptop-code"></i> ${repo.language ?? ' Sem linguagem'} </p>
                   </a></li>`)
        

        if(user.repositories.length > 0){ 
            this.userProfile.innerHTML += `<div class="repositories section">
                                              <h2>Repositórios</h2>
                                              <ul>${repositoriesItens}</ul}
                                              </div>`
        }

        let eventsList = ''
        user.events.forEach(events => {
            if (events.type === 'PushEvent' || events.type === 'CreatedEvent') {
                events.payload.commits.forEach((msg) => {
                    eventsList += `<li><p>${events.repo.name}</p> - ${msg.message}</li>`
                }
                )
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section ">
                                            <h2>Eventos</h2>
                                                <ul>
                                                    <li>${eventsList}</li>
                                                </ul>
                                            </div>`
                                            
        } else {
            this.userProfile.innerHTML += `<div class="events">
            <h2>Eventos</h2>
                <ul>
                    <li>Este usuário não possui eventos recentes</li>
                </ul>
            </div>`
        }

    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}



export { screen }