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
