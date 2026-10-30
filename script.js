document.addEventListener("DOMContentLoaded", () => {
    // --- LÓGICA DO MODAL DE SUGESTÕES ---
    const modal = document.getElementById('modal-sugestao');
    const btnAbrir = document.getElementById('btn-abrir-modal');
    const btnFechar = document.getElementById('btn-fechar');
    const form = document.getElementById('form-sugestao');
    const modalConteudo = document.getElementById('modal-conteudo');

    if (btnAbrir && modal) {
        btnAbrir.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }

    if (btnFechar && modal) {
        btnFechar.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok && modalConteudo) {
                modalConteudo.innerHTML = `
                    <div class="text-center py-8 text-gray-900 font-bold">
                        Muito obrigada! 😉
                    </div>`;
                
                setTimeout(() => {
                    modal.classList.add('hidden');
                    location.reload(); 
                }, 2000);
            }
        });
    }

    // --- LÓGICA DO JOGUINHO (BISCOITO DA SORTE LO-FI) ---
    const modalJogo = document.getElementById('modal-jogo');
    const btnJogar = document.getElementById('btn-jogar');
    const btnFecharJogo = document.getElementById('btn-fechar-jogo');
    const btnNovaSorte = document.getElementById('btn-nova-sorte');
    const textoSorte = document.getElementById('texto-sorte');

    const frasesSorte = [
        "Sua vibração atrai a sua energia. Respire fundo e aproveite a vibe ✨",
        "Você já esteve aqui antes... ou foi só um sonho liminar? 🌙",
        "Coisas boas estão prestes a acontecer no seu tempo certo.",
        "Coloque o seu fone de ouvido favorito e relaxe um pouco hoje.",
        "Um achadinho incrível vai cruzar o seu caminho em breve 🛍️",
        "A lua roxa ilumina caminhos tranquilos para quem sabe esperar 💜",
        "Confie no processo e curta a playlist da vida!"
    ];

    function gerarSorte() {
        const sorteAleatoria = frasesSorte[Math.floor(Math.random() * frasesSorte.length)];
        textoSorte.textContent = `"${sorteAleatoria}"`;
    }

    if (btnJogar && modalJogo) {
        btnJogar.addEventListener('click', () => {
            gerarSorte();
            modalJogo.classList.remove('hidden');
        });
    }

    if (btnFecharJogo && modalJogo) {
        btnFecharJogo.addEventListener('click', () => {
            modalJogo.classList.add('hidden');
        });
    }

    if (btnNovaSorte) {
        btnNovaSorte.addEventListener('click', gerarSorte);
    }

    if (modalJogo) {
        modalJogo.addEventListener('click', (e) => {
            if (e.target === modalJogo) {
                modalJogo.classList.add('hidden');
            }
        });
    }
});
