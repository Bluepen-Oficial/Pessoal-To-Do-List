const inputTarefa = document.getElementById('nova-atividade');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaContainer = document.getElementById('lista-tarefas');

document.addEventListener('DOMContentLoaded', carregarTarefas);

btnAdicionar.addEventListener('click', adicionarTarefa);

inputTarefa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') adicionarTarefa();
});

function adicionarTarefa() {
    const texto = inputTarefa.value.trim();
    if (texto === '') return;

    const tarefaObj = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };

    salvarTarefaNoStorage(tarefaObj);
    renderizarTarefa(tarefaObj);
    inputTarefa.value = '';
}

function renderizarTarefa(tarefa) {
    const itemDiv = document.createElement('div');
    itemDiv.style.marginBottom = "10px";
    itemDiv.setAttribute('data-id', tarefa.id);

    itemDiv.innerHTML = `
        <input type="checkbox" id="check-${tarefa.id}" class="itens" ${tarefa.concluida ? 'checked' : ''}>
        <label for="check-${tarefa.id}">${tarefa.texto}</label>
    `;

    const checkbox = itemDiv.querySelector('input');
    checkbox.addEventListener('change', () => alternarConclusao(tarefa.id));

    itemDiv.addEventListener('dblclick', () => excluirTarefa(tarefa.id, itemDiv));

    listaContainer.appendChild(itemDiv);
}

// --- LocalStorage ---

function salvarTarefaNoStorage(tarefa) {
    const tarefas = JSON.parse(localStorage.getItem('minhasTarefas') || '[]');
    tarefas.push(tarefa);
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('minhasTarefas') || '[]');
    tarefas.forEach(tarefa => renderizarTarefa(tarefa));
}

function alternarConclusao(id) {
    let tarefas = JSON.parse(localStorage.getItem('minhasTarefas'));
    tarefas = tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t);
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

function excluirTarefa(id, elementoHtml) {
    let tarefas = JSON.parse(localStorage.getItem('minhasTarefas'));
    tarefas = tarefas.filter(t => t.id !== id);
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
    elementoHtml.remove();
}