
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
    "A gente não faz anos, a gente faz a vida. — Clarice Lispector 🌿",
    "Há um tempo em que é preciso abandonar as roupas usadas, que já têm a forma do nosso corpo... — Fernando Sabino ✨",
    "Ser feliz sem motivo é a mais autêntica forma de felicidade. — Carlos Drummond de Andrade 🍃",
    "O que vale na vida não é o ponto de partida e sim a caminhada. Caminhando e semeando, no fim se terás o que colher. — Cora Coralina 🌾",
    "A alegria não chega apenas no encontro achado, mas é fruto da espera paciente. — Guimarães Rosa 🌸",
    "A beleza não está no rosto; a beleza é uma luz que brota do coração. — Khalil Gibran (versão brasileira da alma) ✨",
    "A vida só se dá para quem se deu. — Vinicius de Moraes 🍷",
    "Liberdade é pouco. O que eu desejo ainda não tem nome. — Clarice Lispector 💫",
    "Pedras no caminho? Guardo todas, um dia vou construir um castelo. — Fernando Pessoa (adaptado na voz do Brasil) 🏰",
    "A curva mais bonita de uma mulher é o seu sorriso. — Oscar Niemeyer 🌙",
    "Se queres prever o futuro, estuda o passado. — Confúcio (na sabedoria dos nossos carnavais e tempos) 🎭",
    "Tudo vale a pena quando a alma não é pequena. — Fernando Pessoa ✨",
    "É preciso salgar os pés para adoçar a alma. 🌊",
    "Há âncoras que nos prendem ao fundo, mas há ventos que nos levam para o alto. ⛵",
    "O riso é a menor distância entre duas pessoas. — Victor Hugo (abrasileirado) 😄",
    "Meninos, eu vi! E o que vi foi a beleza de recomeçar. — Mário de Andrade 🌺",
    "A alma guarda o que a mente tenta esquecer. 🌙",
    "Quem tem luz própria incomoda os vagalumes da noite. ✨",
    "A saudade é o amor que fica depois que a pessoa vai. — Rubem Alves 💜",
    "Deixe o barco correr. A maré mansa sempre traz o que é nosso. 🌊",
    "O tempo é o tecido de que a vida é feita. — Machado de Assis ⏳",
    "A poesia está nos olhos de quem vê o cotidiano com espanto. 诗",
    "Não chore porque já passou, sorria porque aconteceu. (Na suavidade do vento nordestino) ☀️",
    "Quem anda no trilho é trem de ferro. Eu sou água que abre caminho. — Manoel de Barros 🌿",
    "As coisas mais simples são as mais duradouras. 🍃",
    "O vento que leva também é o vento que traz novos ares. 🌬️",
    "O saber da vida não está nas respostas, mas na coragem de fazer as perguntas. ☕",
    "Semeie o bem sem olhar a quem, o solo do tempo devolve em flor. 🌸",
    "Há mais poesia em um café tomado com calma do que em muitos compêndios. ☕✨",
    "Faça da sua vida um poema que valha a pena ser recitado. 📖💜",
    "A esperança é a última que morre, mas a primeira a nos levantar da cama. ✨",
    "Ser feliz é encontrar paz na própria bagunça. 🎧",
    "Onde quer que você vá, leve a sua própria luz. 💡",
    "A vida é a arte do encontro, embora haja tantos desatinos pela vida. — Vinicius de Moraes 🎶",
    "Desatar nós é a especialidade de quem aprendeu a ter paciência com o tempo. 🧶",
    "A nossa maior glória não reside em nunca cair, mas em levantar every single time. 🌟",
    "Tem dias que a gente só precisa fechar os olhos e escutar o som do próprio coração. 💓",
    "A gentileza é a linguagem que o surdo pode ouvir e o cego pode ver. — Mark Twain (na essência do afeto) 🌻",
    "O futuro pertence àqueles que acreditam na beleza de seus sonhos. — Eleanor Roosevelt (com sotaque de esperança) ✨",
    "A arte de viver é simplesmente a arte de conviver com o inusitado. 🎨",
    "Grandes tempestades regam as raízes mais profundas da nossa resiliência. 🌧️🌱",
    "A simplicidade é o último grau da sofisticação. — Leonardo da Vinci (na simplicidade do nosso povo) ☕",
    "Nenhum marinheiro se torna experto em mar calmo. 🌊⛵",
    "O riso é o sol que espanta o inverno do rosto humano. — Victor Hugo ☀️",
    "Sua intuição é um compasso que nunca erra o norte verdadeiro. 🧭",
    "A paciência é amarga, mas o seu fruto é doce. — Jean-Jacques Rousseau 🍊",
    "O segredo da vida é desfrutar das passagens. 🌿",
    "Cada instante é uma vida inteira que se renova. ✨",
    "Guarde um sorriso para os dias nublados; eles passam mais rápido. 🌥️",
    "A sabedoria começa na capacidade de se admirar com as pequenas coisas. 🦋",
    "Não há caminho que seja longo demais para quem tem amigos e boa companhia. 🚶‍♀️🚶‍♂️",
    "O silêncio também é uma resposta — e muitas vezes a mais sábia. 🤫",
    "Alegria compartilhada é alegria dobrada. 🎭",
    "Onde há amor, há sempre espaço para um recomeço. 💖",
    "As árvores mais fortes crescem contra o vento. 🌳",
    "Um livro aberto é um jardim guardado na página. — Profrase poética 📖",
    "A vida ensina devagar, mas com uma clareza imensa. 🍃",
    "Não apague a luz do outro para tentar brilhar mais. Brilhe por si mesmo. ✨",
    "A coragem não é a ausência do medo, mas a certeza de que algo é mais importante que ele. 🦁",
    "O melhor lugar do mundo é sempre onde há paz no espírito. 🏡",
    "Abrace a sua própria jornada com todas as suas curvas e desvios. 🗺️",
    "O passado é lição, o futuro é mistério, e o presente é um presente. 🎁",
    "Quem cultiva gratidão colhe serenidade. 🌻",
    "A alma nunca tem rugas se souber rir das próprias desventuras. 😂",
    "Permita-se errar, aprender e florescer no seu próprio tempo. 🌸",
    "O afeto é a única riqueza que cresce quanto mais a gente divide. 🤲",
    "Grandes ventos trazem mudanças profundas para quem sabe abrir as janelas. 🪟",
    "O mundo é um livro, e quem não viaja lê apenas uma página. — Santo Agostinho ✈️",
    "Seja a calmaria no meio do furacão de todo dia. 🌀",
    "A beleza da vida reside na sua incerteza fascinante. 🌌",
    "A bondade é o único investimento que nunca faliu. 💎",
    "Há uma força secreta na paciência que transforma o chumbo em ouro. 🧪✨",
    "O amor não precisa ser perfeito, só precisa ser verdadeiro. 💜",
    "Aproveite o tom tom das horas calmas. 🕒",
    "Faça da sua casa um templo de paz e do seu peito um abrigo seguro. 🏠",
    "A vida é breve demais para carregar pesos que não são seus. 🎈",
    "Um dia sem sorrir é um dia perdido. — Charlie Chaplin 🎭",
    "Quem tem fé na vida nunca caminha sozinho. 👣",
    "A criatividade é a inteligência se divertindo. — Albert Einstein 🎨",
    "A luz que você procura está escondida bem no fundo do seu próprio peito. 🔦✨",
    "O sol sempre volta a brilhar, mesmo depois da mais longa tempestade. ☀️",
    "A terra sorri em flores. — Ralph Waldo Emerson 🌷",
    "Nenhum obstáculo é grande demais para quem tem vontade de crescer. 🌱",
    "A gentileza abre portas que nenhuma chave consegue abrir. 🔑",
    "O melhor espelho é um amigo verdadeiro. 🪞",
    "Aprender com os erros é o passaporte para a sabedoria. 🎟️",
    "A felicidade é um perfume que não se pode ver, mas que todos sentem. 🌸",
    "Quem guarda rancor toma veneno esperando que o outro morra. (Provérbio popular) 🍵",
    "O verdadeiro tesouro é a paz de espírito ao deitar a cabeça no travesseiro. 🛌",
    "A vida recompensa a coragem de dar o primeiro passo. 👟",
    "O canto dos pássaros nos lembra que o dia é sempre um novo começo. 🐦",
    "A imaginação é mais importante que o conhecimento. — Albert Einstein 🎨",
    "Viva com simplicidade, sonhe com grandiosidade. 🌠",
    "O coração alegre é o melhor remédio para a alma. 💊💖",
    "A harmonia interior atrai a paz exterior. 🕊️",
    "O tempo cura, mas a atitude transforma. ⏳",
    "Faça o bem e jogue-o no mar; se o peixe não reconhecer, Deus saberá. (Provérbio brasileiro) 🌊",
    "A poesia é a sola do sapato gasta nas estradas da vida. 🥾",
    "O dom de inspirar os outros é a marca dos grandes espíritos. ✨",
    "Siga o seu rumo com a certeza de que a estrela guia nunca se apaga. ⭐"
];

const frasesEN = [
    "We don't count years, we make life. — Clarice Lispector 🌿",
    "There is a time when we must abandon old clothes that already fit our soul... — Fernando Sabino ✨",
    "Being happy for no reason is the most authentic form of happiness. — Carlos Drummond de Andrade 🍃",
    "What matters in life is not the starting point, but the journey. Walking and sowing, in the end you will reap. — Cora Coralina 🌾",
    "Joy is not just found in things met, but is the fruit of patient waiting. — Guimarães Rosa 🌸",
    "Beauty is not in the face; beauty is a light that springs from the heart. — Khalil Gibran ✨",
    "Life only gives itself to those who give themselves. — Vinicius de Moraes 🍷",
    "Freedom is too little. What I desire still has no name. — Clarice Lispector 💫",
    "Stones in the path? I keep them all, one day I'll build a castle. — Fernando Pessoa 🏰",
    "The most beautiful curve on a woman is her smile. — Oscar Niemeyer 🌙",
    "Study the past if you would define the future. — Confucius 🎭",
    "Everything is worthwhile if the soul is not small. — Fernando Pessoa ✨",
    "It is necessary to salt your feet to sweeten your soul. 🌊",
    "There are anchors that hold us to the bottom, but winds that lift us high. ⛵",
    "Laughter is the shortest distance between two people. — Victor Hugo 😄",
    "Boys, I saw it! And what I saw was the beauty of starting over. — Mário de Andrade 🌺",
    "The soul keeps what the mind tries to forget. 🌙",
    "He who has his own light disturbs the fireflies of the night. ✨",
    "Nostalgia is the love that stays after the person leaves. — Rubem Alves 💜",
    "Let the boat drift. A calm tide always brings what is ours. 🌊",
    "Time is the fabric of which life is made. — Machado de Assis ⏳",
    "Poetry is in the eyes of those who look at the everyday with wonder. 诗",
    "Don't cry because it's over, smile because it happened. ☀️",
    "Whoever walks on tracks is an iron train. I am water carving my own path. — Manoel de Barros 🌿",
    "The simplest things are the most enduring. 🍃",
    "The wind that carries away is also the wind that brings fresh air. 🌬️",
    "The wisdom of life lies not in answers, but in the courage to ask questions. ☕",
    "Sow goodness without looking whom, the soil of time returns it in bloom. 🌸",
    "There is more poetry in a calm cup of coffee than in many books. ☕✨",
    "Make your life a poem worth reciting. 📖💜",
    "Hope dies last, but it's the first to get us out of bed. ✨",
    "Being happy is finding peace in your own mess. 🎧",
    "Wherever you go, bring your own light. 💡",
    "Life is the art of encounter, despite so many mismatches along the way. — Vinicius de Moraes 🎶",
    "Untying knots is the specialty of those who learned patience with time. 🧶",
    "Our greatest glory is not in never falling, but in rising every single time. 🌟",
    "Some days we just need to close our eyes and listen to the sound of our own heart. 💓",
    "Kindness is the language which the deaf can hear and the blind can see. — Mark Twain 🌻",
    "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt ✨",
    "The art of living is simply the art of living with the unexpected. 🎨",
    "Great storms water the deepest roots of our resilience. 🌧️🌱",
    "Simplicity is the ultimate sophistication. — Leonardo da Vinci ☕",
    "No sailor becomes expert on a calm sea. 🌊⛵",
    "Laughter is the sun that drives winter from the human face. — Victor Hugo ☀️",
    "Your intuition is a compass that never misses the true north. 🧭",
    "Patience is bitter, but its fruit is sweet. — Jean-Jacques Rousseau 🍊",
    "The secret of life is to enjoy the passages. 🌿",
    "Every single moment is a whole new life renewing itself. ✨",
    "Keep a smile for cloudy days; they pass by faster. 🌥️",
    "Wisdom begins in the capacity to wonder at small things. 🦋",
    "No path is too long for someone with good company. 🚶‍♀️🚶‍♂️",
    "Silence is also an answer — and often the wisest one. 🤫",
    "Shared joy is double joy. 🎭",
    "Where there is love, there is always room for a fresh start. 💖",
    "The strongest trees grow against the wind. 🌳",
    "An open book is a garden kept in pages. 📖",
    "Life teaches slowly, but with immense clarity. 🍃",
    "Don't blow out someone else's candle to let yours shine. Shine on your own. ✨",
    "Courage is not the absence of fear, but the mastery of it. 🦁",
    "The best place in the world is wherever there is peace in the spirit. 🏡",
    "Embrace your own journey with all its curves and detours. 🗺️",
    "The past is a lesson, the future is a mystery, and the present is a gift. 🎁",
    "He who cultivates gratitude harvests serenity. 🌻",
    "The soul never has wrinkles if it knows how to laugh at its own misadventures. 😂",
    "Allow yourself to make mistakes, learn, and blossom in your own time. 🌸",
    "Affection is the only wealth that grows the more you share it. 🤲",
    "Great winds bring profound changes to those who know how to open windows. 🪟",
    "The world is a book, and those who do not travel read only one page. — Saint Augustine ✈️",
    "Be the calm in the middle of everyday's hurricane. 🌀",
    "The beauty of life lies in its fascinating uncertainty. 🌌",
    "Kindness is the only investment that never fails. 💎",
    "There is a secret force in patience that turns lead into gold. 🧪✨",
    "Love doesn't need to be perfect, it just needs to be true. 💜",
    "Enjoy the rhythm of quiet hours. 🕒",
    "Make your home a temple of peace and your chest a safe haven. 🏠",
    "Life is too short to carry weights that aren't yours. 🎈",
    "A day without laughter is a day wasted. — Charlie Chaplin 🎭",
    "Whoever has faith in life never walks alone. 👣",
    "Creativity is intelligence having fun. — Albert Einstein 🎨",
    "The light you are looking for is hidden deep within your own chest. 🔦✨",
    "The sun always shines again, even after the longest storm. ☀️",
    "The earth laughs in flowers. — Ralph Waldo Emerson 🌷",
    "No obstacle is too big for someone with the will to grow. 🌱",
    "Kindness opens doors that no key can pick. 🔑",
    "The best mirror is a true friend. 🪞",
    "Learning from mistakes is the passport to wisdom. 🎟️",
    "Happiness is a perfume you cannot pour on others without getting some on yourself. 🌸",
    "Holding onto anger is like drinking poison and expecting the other person to die. 🍵",
    "The ultimate treasure is peace of mind when resting your head on the pillow. 🛌",
    "Life rewards the courage of taking the first step. 👟",
    "The birdsong reminds us that every day is a fresh beginning. 🐦",
    "Imagination is more important than knowledge. — Albert Einstein 🎨",
    "Live simply, dream big. 🌠",
    "A cheerful heart is good medicine. 💊💖",
    "Inner harmony attracts outer peace. 🕊️",
    "Time heals, but attitude transforms. ⏳",
    "Do good and cast it into the sea; if the fish doesn't know it, God does. 🌊",
    "Poetry is the worn shoe sole on the roads of life. 🥾",
    "The gift of inspiring others is the mark of great spirits. ✨",
    "Follow your course with the certainty that the guiding star never goes out. ⭐"
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
