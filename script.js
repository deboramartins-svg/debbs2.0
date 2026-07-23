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

    // Fecha o modal clicando fora da caixinha branca
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
                // Substitui o conteúdo do modal pela mensagem de sucesso
                modalConteudo.innerHTML = `
                    <div class="text-center py-8 text-gray-900 font-bold">
                        Muito obrigada! 😉
                    </div>`;
                
                // Fecha o modal automaticamente após 2 segundos e recarrega
                setTimeout(() => {
                    modal.classList.add('hidden');
                    location.reload(); 
                }, 2000);
            }
        });
    }
});