let db = JSON.parse(localStorage.getItem('reencontreme_itens')) || [];
let currentTipo = 'perdido';

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarItens();
    
    // Filtro de Busca
    document.getElementById('busca').addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const filtrados = db.filter(item => 
            item.nome.toLowerCase().includes(termo) || 
            item.local.toLowerCase().includes(termo)
        );
        renderizarItens(filtrados);
    });
});

function setTipo(tipo) {
    currentTipo = tipo;
    document.getElementById('input-tipo').value = tipo;
    
    // Estética dos botões
    const bPerdido = document.getElementById('btn-perdido');
    const bAchado = document.getElementById('btn-achado');
    
    if(tipo === 'perdido') {
        bPerdido.classList.add('bg-red-500', 'text-white');
        bAchado.classList.remove('bg-green-500', 'text-white');
    } else {
        bAchado.classList.add('bg-green-500', 'text-white');
        bPerdido.classList.remove('bg-red-500', 'text-white');
    }
}

document.getElementById('form-item').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const novoItem = {
        id: Date.now(),
        tipo: document.getElementById('input-tipo').value,
        nome: document.getElementById('item-nome').value,
        local: document.getElementById('item-local').value,
        desc: document.getElementById('item-desc').value,
        contato: document.getElementById('item-contato').value.replace(/\D/g, ''),
        data: new Date().toLocaleDateString('pt-BR')
    };

    db.unshift(novoItem);
    localStorage.setItem('reencontreme_itens', JSON.stringify(db));
    
    fecharModal();
    this.reset();
    renderizarItens();
});

function renderizarItens(lista = db) {
    const grid = document.getElementById('grid-itens');
    grid.innerHTML = lista.map(item => `
        <div class="card-item bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
            <div class="${item.tipo === 'perdido' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} px-4 py-2 text-xs font-black uppercase tracking-widest">
                ${item.tipo}
            </div>
            <div class="p-6 flex-1">
                <h3 class="text-xl font-bold text-gray-900 mb-1">${item.nome}</h3>
                <p class="text-sm text-blue-600 font-medium mb-4"><i class="fas fa-map-marker-alt mr-1"></i> ${item.local}</p>
                <p class="text-gray-600 text-sm leading-relaxed">${item.desc}</p>
            </div>
            <div class="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span class="text-xs text-gray-400 font-bold">${item.data}</span>
                <a href="https://wa.me/55${item.contato}?text=Olá! Vi no Reencontre.me sobre o item: ${item.nome}" 
                   target="_blank" 
                   class="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition">
                   CONTATAR
                </a>
            </div>
        </div>
    `).join('');
}

function abrirModal() { document.getElementById('modal').classList.remove('hidden'); }
function fecharModal() { document.getElementById('modal').classList.add('hidden'); }
