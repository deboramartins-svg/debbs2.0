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
  // ==========================================
  // 1. REALISTAS, DIRETA AO PONTO & CONSELHOS DURAIS
  // ==========================================
  "Não tente controlar tudo. Tem coisas que só fluem quando você solta 🍃",
  "Feche as abas acumuladas na sua mente antes de abrir novas 🧠✨",
  "Você não precisa ter a vida resolvida até o final desta semana. Vá com calma ✨",
  "Descansar também faz parte da produtividade. Vá beber uma água 🥤",
  "A resposta que você procura não vai vir enquanto sua mente estiver acelerada 🧘‍♀️",
  "Às vezes, a melhor atitude do dia é simplesmente não reagir a nada 😶",
  "Não gaste energia tentando convencer quem já decidiu não entender você 💭",
  "O 'não' que você diz para os outros costuma ser um 'sim' para a sua paz 💜",
  "Tudo bem não estar 100% incrível hoje. Dias normais também contam ✨",
  "Organizar o seu espaço ao redor vai clarear sua mente rapidinho 🧹💜",
  "O primeiro passo não precisa ser perfeito, só precisa ser dado 👣",
  "Sua intuição já te deu o aviso. Agora é só você escutar ✨",

  // ==========================================
  // 2. DREAMCORE, NOSTALGIA & LIMINAL (MISTÉRIO SUAVE)
  // ==========================================
  "Você já esteve aqui antes... ou foi só um sonho liminar? 🌙",
  "Uma porta secreta para um lugar aconchegante vai se abrir na sua mente 🗝️✨",
  "A sensação de uma tarde de infância em um dia ensolarado vai te visitar hoje ☁️",
  "Há beleza e magia escondidas nos espaços que todo mundo costuma ignorar 👁️💜",
  "Você não está perdido, apenas navegando por uma dimensão mais calma 🌌",
  "O eco de uma música distante vai trazer uma memória boa hoje 🎧✨",
  "A lua roxa ilumina caminhos tranquilos para quem sabe esperar 💜🌙",
  "Sua alma reconhece lugares onde seu corpo físico nunca esteve 🌌✨",
  "O céu das 3h da manhã tem uma mensagem silenciosa guardada pra você 🌙",
  "Perder-se por alguns minutos é a melhor forma de achar o que realmente importa 🧭",

  // ==========================================
  // 3. LO-FI VIBES, RELAXAMENTO & ACONCHEGO
  // ==========================================
  "Coloque seu fone de ouvido, dê o play na sua playlist favorita e relaxe 🎧✨",
  "Faça uma pausa. O mundo aguenta esperar alguns minutos ☕💜",
  "Um gole de café quente, uma música calma e tudo vai se acertando ☁️",
  "Sua paz interior é o seu refúgio mais seguro 💜🎧",
  "Siga o ritmo da sua própria trilha sonora, sem pressa 🎵✨",
  "Respire fundo três vezes. Sinta o ar renovando a sua energia 🧘✨",
  "Permita-se desacelerar e apenas observar a chuva ou o céu hoje 🌧️☁️",
  "Dias calmos constroem vidas sólidas. Aproveite a calmaria 💜",
  "Sua vibração atrai exatamente a energia que você emana. Sintonize bem ✨",
  "Deixe a pressa do lado de fora. Aqui dentro o tempo corre devagar 🕯️💜",

  // ==========================================
  // 4. ACHADINHOS, MINI SORTE & BOAS VIBES
  // ==========================================
  "Um achadinho incrível vai cruzar o seu caminho muito em breve 🛍️✨",
  "A sorte está do seu lado: o cupom dos sonhos ou a peça perfeita vai aparecer! 🎁",
  "O universo reservou um achadinho especial só pra você hoje 💜🛍️",
  "Em breve, algo que você deseja muito vai aparecer com um preço inacreditável 😉✨",
  "Pequenos mimos têm o poder de transformar dias comuns em momentos mágicos 💫",
  "Sua lista de desejos está prestes a diminuir um item 🛍️✨",
  "Alguém vai te indicar uma coisa maravilhosa que você nem sabia que precisava 💜",

  // ==========================================
  // 5. FRASES CURTAS & IMPACTANTES (PARA SORTE RÁPIDA)
  // ==========================================
  "Coisas boas acontecem no seu tempo certo ✨",
  "Confie no processo 💜",
  "Você é capaz de mais do que imagina ✨",
  "Uma boa notícia está a caminho 📩✨",
  "Proteja a sua energia hoje 🛡️💜",
  "Sua luz é única. Não a diminua por ninguém ✨",
  "Tudo se ajeita. Sempre 🌙",
  "Sorria, você está no caminho certo 💜",
  "Permita-se recomeçar do zero se for preciso 🔄✨",
  "O universo ama quem se move com gentileza 💫",

  // ==========================================
  // 6. DIVERTIDAS, "MEME" & VIDA REAL
  // ==========================================
  "Sua encomenda do mês vai chegar antes do previsto 📦✨",
  "Hoje é um ótimo dia para fechar as 40 guias abertas no seu navegador 💻",
  "A vida é muito curta para guardar roupas bonitas só para 'ocasiões especiais' ✨",
  "Aviso do biscoito: vá tomar água agora mesmo! 🚰💜",
  "O destino manda avisar que aquele carrinho de compras merece ser finalizado 😂🛍️",
  "Nenhuma decisão difícil deve ser tomada com fome ou com sono 😴🍕",
  "Alguém lembrou de você hoje com muito carinho e nostalgia 💜",
  "A pizza/lanche que você quer pedir hoje vai vir perfeita 🍕✨"

  // ==========================================
  // 1. POESIA & ROMANTISMO CLÁSSICO
  // ==========================================
  "Que não seja imortal, posto que é chama, mas que seja infinito enquanto dure. — Vinicius de Moraes 💖",
  "Tudo vale a pena se a alma não é pequena. — Fernando Pessoa 🌙",
  "Amor é fogo que arde sem se ver; é ferida que dói, e não se sente. — Luís de Camões ✨",
  "Para sempre é muito tempo. O tempo não pára! A saudade é que faz as coisas pararem no tempo. — Mário Quintana ⏳💜",
  "Ainda que eu falasse as línguas dos homens e dos anjos, se não tivesse amor, eu nada seria. — 1 Coríntios 13 🕊️",
  "Dúvida da luz das estrelas, dúvida de que o sol se mova, dúvida até da verdade, mas nunca do meu amor. — William Shakespeare 🌟",
  "O amor é a única coisa que cresce à medida que se reparte. — Antoine de Saint-Exupéry 🌹",
  "Te amo não pelo que você é, mas pelo que sou quando estou com você. — Gabriel García Márquez 💜",
  "Assim como a nuvem precisa do vento para voar, eu preciso de você para amar. — Cartola 🎶✨",
  "Amar não é olhar um para o outro, é olhar juntos na mesma direção. — Antoine de Saint-Exupéry 💫",

  // ==========================================
  // 2. REFLEXÕES SUB LIMES, ALMA & SENTIMENTO
  // ==========================================
  "Tenho em mim todos os sonhos do mundo. — Fernando Pessoa 🌌",
  "Liberdade é pouco. O que eu quero ainda não tem nome. — Clarice Lispector 💜",
  "E no meio de um inverno frio, eu finalmente aprendi que havia dentro de mim um verão invencível. — Albert Camus ☀️✨",
  "Há flores cobrindo o telhado e móveis e feixes de luz por todos os lados. — Renato Russo 🌿💜",
  "E guardo em mim a certeza de que a beleza salvará o mundo. — Fiódor Dostoiévski ✨",
  "Se nada nos salva da morte, que o amor nos salve da vida. — Pablo Neruda 🌹",
  "O essencial é invisível aos olhos. Só se vê bem com o coração. — O Pequeno Príncipe 🦊✨",
  "É preciso a chuva para florir. — Guimarães Rosa 🌧️🌸",
  "Tu te tornas eternamente responsável por aquilo que cativas. — Antoine de Saint-Exupéry 💜",
  "Há momentos em que a poesia é a única forma de respirar. — Cecília Meireles 📜✨",

  // ==========================================
  // 3. AMOR PRÓPRIO, DESTINO & AFETO SUAVE
  // ==========================================
  "Aprender a se amar é o início de um romance que dura a vida inteira. — Oscar Wilde 👑💜",
  "Renda-se, como eu me rendi. Recomece, como eu recomecei. — Clarice Lispector 💫",
  "O amor é uma flor delicada, mas é preciso ter a coragem de ir colhê-la à beira de um precipício. — Stendhal 🌹",
  "Até a mais longa jornada começa com um único passo. — Lao Tsé 🐾✨",
  "O poema é uma pedra atirada no poço do tempo. — Mario Quintana 🌙",
  "Sorria. A alma que sorri transforma o mundo ao seu redor. — Machado de Assis ✨💜",
  "Quem quase vive nunca renasce. Viva por inteiro. — Guimarães Rosa 🍃",
  "E se for para ter medo, que seja de não aproveitar a vida. — Caio Fernando Abreu ✨",
  "A poesia não pertence a quem a escreve, mas a quem precisa dela. — Pablo Neruda 💌",
  "Nossa capacidade de amar é o que nos torna eternos. — Cora Coralina 💜✨"
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
