
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // IDIOMAS
    // =====================================

    const translations = {
        pt: {
            subtitle: "• Um pouco de tudo o que eu amo ✨ •",
            intro: "Oii! Bem-vindo(a) ao meu cantinho! 💜 Aqui eu compartilho meus achadinhos e produtos favoritos que uso e recomendo, além das minhas criações dreamcore & lo-fi no TikTok e YouTube. Fique à vontade para explorar! 🌙✨",
            shein: "Links de Produtos SHEIN",
            shopee: "Links de Produtos Shopee",
            game: "Biscoito da Sorte Lo-Fi",
            gameDescription: "Clique para tirar uma sorte/mensagem do dia!",
            suggestions: "Sugestões",
            fortuneTitle: "Sua Sorte de Hoje",
            newFortune: "Tirar outra mensagem ✨",
            suggestionTitle: "✰ Sua opinião é importante! ✰",
            placeholder: "Escreva aqui...",
            send: "Enviar",
            sending: "Enviando...",
            thanks: "Muito obrigada! 😉",
            error: "Erro ao enviar. Tente novamente."
        },

        en: {
            subtitle: "• A little bit of everything I love ✨ •",
            intro: "Hiii! Welcome to my little corner! 💜 Here I share my favorite finds and products that I use and recommend, along with my dreamcore & lo-fi creations on TikTok and YouTube. Feel free to explore! 🌙✨",
            shein: "SHEIN Product Links",
            shopee: "Shopee Product Links",
            game: "Lo-Fi Fortune Cookie",
            gameDescription: "Click to discover your fortune/message of the day!",
            suggestions: "Suggestions",
            fortuneTitle: "Your Fortune Today",
            newFortune: "Get another message ✨",
            suggestionTitle: "✰ Your opinion matters! ✰",
            placeholder: "Write here...",
            send: "Send",
            sending: "Sending...",
            thanks: "Thank you so much! 😉",
            error: "Error sending your message. Please try again."
        }
    };

    // =====================================
    // BOTÕES DE IDIOMA
    // =====================================

    const switcher = document.createElement("div");
    switcher.id = "language-switcher";

    switcher.innerHTML = `
        <button class="lang-btn" data-lang="pt"
            aria-label="Português">PT</button>
        <button class="lang-btn" data-lang="en"
            aria-label="English">EN</button>
    `;

    document.body.appendChild(switcher);

    const languageButtons = switcher.querySelectorAll(".lang-btn");

    // =====================================
    // ELEMENTOS DO SITE
    // =====================================

    const subtitle = document.querySelector(".relative.inline-flex p");
    const introduction = document.querySelector(".bg-purple-50\\/70");
    const cards = document.querySelectorAll(".category-card");

    const sheinTitle = cards[0]?.querySelector("h2");
    const shopeeTitle = cards[1]?.querySelector("h2");
    const gameTitle = cards[2]?.querySelector("h2");
    const gameDescription = cards[2]?.querySelector("p");

    const btnAbrir = document.getElementById("btn-abrir-modal");
    const modalSugestao = document.getElementById("modal-sugestao");
    const modalConteudo = document.getElementById("modal-conteudo");

    const modalJogo = document.getElementById("modal-jogo");
    const btnJogar = document.getElementById("btn-jogar");
    const btnFecharJogo = document.getElementById("btn-fechar-jogo");
    const btnNovaSorte = document.getElementById("btn-nova-sorte");
    const textoSorte = document.getElementById("texto-sorte");

    let idiomaAtual = "pt";

    // =====================================
    // TRADUZIR O SITE
    // =====================================

    function alterarIdioma(idioma) {

        if (!translations[idioma]) return;

        idiomaAtual = idioma;

        const t = translations[idioma];

        document.documentElement.lang =
            idioma === "pt" ? "pt-br" : "en";

        if (subtitle) subtitle.textContent = t.subtitle;
        if (introduction) introduction.textContent = t.intro;
        if (sheinTitle) sheinTitle.textContent = t.shein;
        if (shopeeTitle) shopeeTitle.textContent = t.shopee;
        if (gameTitle) gameTitle.textContent = t.game;
        if (gameDescription) gameDescription.textContent = t.gameDescription;
        if (btnAbrir) btnAbrir.textContent = t.suggestions;

        const fortuneTitle = modalJogo?.querySelector("h3");
        if (fortuneTitle) fortuneTitle.textContent = t.fortuneTitle;

        if (btnNovaSorte) btnNovaSorte.textContent = t.newFortune;

        const suggestionTitle = modalConteudo?.querySelector("h3");
        if (suggestionTitle) suggestionTitle.textContent = t.suggestionTitle;

        const textarea = modalConteudo?.querySelector("textarea");
        if (textarea) textarea.placeholder = t.placeholder;

        const submit = modalConteudo?.querySelector('button[type="submit"]');
        if (submit) submit.textContent = t.send;

        languageButtons.forEach(button => {
            const active = button.dataset.lang === idioma;

            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        try {
            localStorage.setItem("debbs-language", idioma);
        } catch (error) {
            console.warn("Não foi possível salvar o idioma.", error);
        }

        document.title = idioma === "pt" ? "Debbs" : "Debbs - My Little Corner";

        if (modalJogo && !modalJogo.classList.contains("hidden")) {
            gerarSorte();
        }
    }

    languageButtons.forEach(button => {
        button.addEventListener("click", () => {
            alterarIdioma(button.dataset.lang);
        });
    });

    // =====================================
    // FRASES DO BISCOITO
    // =====================================

    const frasesPT = [
        "Não tente controlar tudo. Tem coisas que só fluem quando você solta 🍃",
        "Você não precisa ter a vida resolvida até o final desta semana. Vá com calma ✨",
        "Descansar também faz parte da produtividade. Vá beber uma água 🥤",
        "Sua intuição já te deu o aviso. Agora é só você escutar ✨",
        "Você já esteve aqui antes... ou foi só um sonho liminar? 🌙",
        "A lua roxa ilumina caminhos tranquilos para quem sabe esperar 💜🌙",
        "Faça uma pausa. O mundo aguenta esperar alguns minutos ☕💜",
        "Sua paz interior é o seu refúgio mais seguro 💜🎧",
        "Um achadinho incrível vai cruzar o seu caminho muito em breve 🛍️✨",
        "Coisas boas acontecem no seu tempo certo ✨",
        "Confie no processo 💜",
        "Você é capaz de mais do que imagina ✨",
        "Uma boa notícia está a caminho 📩✨",
        "Proteja a sua energia hoje 🛡️💜",
        "Tudo se ajeita. Sempre 🌙",
        "Sorria, você está no caminho certo 💜",
        "O universo ama quem se move com gentileza 💫",
        "Hoje é um ótimo dia para fechar as 40 guias abertas no seu navegador 💻",
        "Aviso do biscoito: vá tomar água agora mesmo! 🚰💜",
        "O essencial é invisível aos olhos. Só se vê bem com o coração. 🦊✨",
        "Aprender a se amar é o início de um romance que dura a vida inteira. 💜",
        "Até a mais longa jornada começa com um único passo. ✨",
        "Permita-se recomeçar do zero se for preciso 🔄✨"
    ];

    const frasesEN = [
        "Don't try to control everything. Some things flow better when you let go 🍃",
        "You don't need to have your whole life figured out this week. Take it easy ✨",
        "Rest is also part of being productive. Go drink some water 🥤",
        "Your intuition has already warned you. Now just listen ✨",
        "Have you been here before... or was it just a liminal dream? 🌙",
        "The purple moon lights peaceful paths for those who know how to wait 💜🌙",
        "Take a break. The world can wait a few minutes ☕💜",
        "Your inner peace is your safest refuge 💜🎧",
        "An amazing find will cross your path very soon 🛍️✨",
        "Good things happen at the right time ✨",
        "Trust the process 💜",
        "You are capable of more than you imagine ✨",
        "Good news is on its way 📩✨",
        "Protect your energy today 🛡️💜",
        "Everything will fall into place. Always 🌙",
        "Smile, you're on the right path 💜",
        "The universe loves those who move with kindness 💫",
        "Today is a great day to close those 40 open browser tabs 💻",
        "Fortune cookie reminder: go drink some water right now! 🚰💜",
        "The essential is invisible to the eyes. You can only see well with your heart. 🦊✨",
        "Learning to love yourself is the beginning of a lifelong romance. 💜",
        "Even the longest journey begins with a single step. ✨",
        "Allow yourself to start over if you need to 🔄✨"
    ];

    let ultimaSorte = "";

    function gerarSorte() {

        const frases = idiomaAtual === "en" ? frasesEN : frasesPT;

        let sorte;

        do {
            sorte = frases[Math.floor(Math.random() * frases.length)];
        } while (frases.length > 1 && sorte === ultimaSorte);

        ultimaSorte = sorte;

        if (textoSorte) {
            textoSorte.textContent = `"${sorte}"`;
        }
    }

    // =====================================
    // ABRIR E FECHAR JOGO
    // =====================================

    if (btnJogar && modalJogo) {
        btnJogar.addEventListener("click", () => {
            gerarSorte();
            modalJogo.classList.remove("hidden");
        });
    }

    if (btnFecharJogo && modalJogo) {
        btnFecharJogo.addEventListener("click", () => {
            modalJogo.classList.add("hidden");
        });
    }

    if (btnNovaSorte) {
        btnNovaSorte.addEventListener("click", gerarSorte);
    }

    if (modalJogo) {
        modalJogo.addEventListener("click", event => {
            if (event.target === modalJogo) {
                modalJogo.classList.add("hidden");
            }
        });
    }

    // =====================================
    // MODAL DE SUGESTÕES
    // =====================================

    if (btnAbrir && modalSugestao) {
        btnAbrir.addEventListener("click", () => {
            modalSugestao.classList.remove("hidden");
        });
    }

    if (modalSugestao) {
        modalSugestao.addEventListener("click", event => {

            if (event.target === modalSugestao ||
                event.target.closest("#btn-fechar")) {
                modalSugestao.classList.add("hidden");
            }

        });
    }

    // =====================================
    // FORMULÁRIO FORMSPREE
    // =====================================

    if (formularioExiste()) {
        configurarFormulario();
    }

    function formularioExiste() {
        return !!document.getElementById("form-sugestao");
    }

    function configurarFormulario() {

        const form = document.getElementById("form-sugestao");

        if (!form || form.dataset.configurado) return;

        form.dataset.configurado = "true";

        form.addEventListener("submit", async event => {

            event.preventDefault();

            const botao = form.querySelector('button[type="submit"]');

            if (botao) {
                botao.disabled = true;
                botao.textContent = translations[idiomaAtual].sending;
            }

            try {

                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Falha no envio.");
                }

                if (modalConteudo) {
                    modalConteudo.innerHTML = `
                        <div class="text-center py-8 text-gray-900 font-bold">
                            ${translations[idiomaAtual].thanks}
                        </div>
                    `;
                }

                setTimeout(() => {
                    modalSugestao.classList.add("hidden");
                    location.reload();
                }, 2000);

            } catch (error) {

                console.error(error);

                if (botao) {
                    botao.disabled = false;
                    botao.textContent = translations[idiomaAtual].send;
                }

                alert(translations[idiomaAtual].error);
            }
        });
    }

    // =====================================
    // INICIALIZAR IDIOMA
    // =====================================

    let idiomaSalvo = "pt";

    try {
        idiomaSalvo = localStorage.getItem("debbs-language") || "pt";
    } catch (error) {
        console.warn(error);
    }

    alterarIdioma(idiomaSalvo);

});
