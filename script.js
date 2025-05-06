const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        videos.forEach((video) => {
            if (video.categoria == "") {
                throw new Error("Video não tem categoria");
            }
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                    <h3 class="titulo-video">${video.titulo}</h3>  
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
        `;
        })
    } catch (error) {
        containerVideos.innerHTML = `<p>houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector('.pesquisar__input');
barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorDoFiltro = barraDePesquisa.value.toLowerCase();

    /*
    if (barraDePesquisa.value != "") {
        for (let video of videos) {
            let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
            let valorDoFiltro = barraDePesquisa.value.toLowerCase();

            if (!titulo.includes(valorDoFiltro)) {
                video.style.display = "none";
            } else {
                video.style.display = "block";
            }
        }
    } else {

    }
    */

    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
        video.style.display = valorDoFiltro ? titulo.includes(valorDoFiltro) ? 'block' : 'none' : 'block';
    });

}

const botoesSuperiores = document.querySelectorAll('.superior__item');
botoesSuperiores.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name');
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll('.videos__item');

    for (let video of videos) {
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        let valorDoFiltro = filtro.toLowerCase();

        if (!categoria.includes(valorDoFiltro) && valorDoFiltro != 'tudo') {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}