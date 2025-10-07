document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const keyElement = document.getElementById('key');
    const codeElement = document.getElementById('code');
    const keyCodeElement = document.getElementById('keyCode');
    const historyElement = document.getElementById('history');
    const virtualKeys = document.querySelectorAll('.key');
    
    // Variável para rastrear estado da tecla Fn
    let fnActive = false;
    
    // Função para adicionar uma entrada ao histórico
    function addToHistory(key, code, keyCode) {
        const historyItem = document.createElement('div');
        historyItem.className = 'flex justify-between items-center text-sm py-1 border-b border-gray-600';
        historyItem.innerHTML = `
            <span class="text-primary">${key}</span>
            <span class="text-gray-400">${code}</span>
            <span class="text-gray-400">${keyCode}</span>
        `;
        
        // Limitar o histórico a 20 itens
        if (historyElement.children.length >= 20) {
            historyElement.removeChild(historyElement.lastChild);
        }
        
        historyElement.insertBefore(historyItem, historyElement.firstChild);
    }
    
    // Função para destacar a tecla virtual correspondente
    function highlightVirtualKey(code) {
        // Remover destaque de todas as teclas
        virtualKeys.forEach(key => {
            key.classList.remove('key-active');
        });
        
        // Adicionar destaque à tecla correspondente
        const targetKey = document.querySelector(`.key[data-key="${code}"]`);
        if (targetKey) {
            targetKey.classList.add('key-active');
            
            // Remover o destaque após 300ms
            setTimeout(() => {
                targetKey.classList.remove('key-active');
            }, 300);
        }
    }
    
    // Evento de tecla pressionada
    document.addEventListener('keydown', (event) => {
        // Prevenir comportamento padrão para algumas teclas
        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.code)) {
            event.preventDefault();
        }
        
        // Verificar se é uma combinação com Fn (F1-F12)
        if (event.getModifierState && event.getModifierState("Fn")) {
            // Tentar detectar a tecla Fn através do modificador
            keyElement.textContent = `Fn + ${event.key}`;
            codeElement.textContent = event.code;
            keyCodeElement.textContent = event.keyCode;
            
            // Adicionar ao histórico
            addToHistory(`Fn + ${event.key}`, event.code, event.keyCode);
            
            // Destacar a tecla Fn e a tecla atual
            highlightVirtualKey("Fn");
            highlightVirtualKey(event.code);
            
            console.log(`Combinação Fn detectada: Fn + ${event.key}`);
            return;
        }
        
        // Atualizar informações da tecla
        const displayKey = event.key === ' ' ? 'Space' : event.key;
        keyElement.textContent = displayKey;
        codeElement.textContent = event.code;
        keyCodeElement.textContent = event.keyCode;
        
        // Adicionar ao histórico
        addToHistory(displayKey, event.code, event.keyCode);
        
        // Destacar tecla virtual
        highlightVirtualKey(event.code);
    });
    
    // Tratamento especial para a tecla Fn (que não é detectada normalmente pelo navegador)
    const fnKey = document.querySelector('.key[data-key="Fn"]');
    if (fnKey) {
        fnKey.addEventListener('click', () => {
            // Alternar estado da tecla Fn
            fnActive = !fnActive;
            
            // Atualizar aparência da tecla Fn
            if (fnActive) {
                fnKey.classList.add('key-active');
                fnKey.classList.add('bg-primary');
            } else {
                fnKey.classList.remove('key-active');
                fnKey.classList.remove('bg-primary');
            }
            
            // Simular informações da tecla Fn
            keyElement.textContent = "Fn";
            codeElement.textContent = "Fn";
            keyCodeElement.textContent = "-";
            
            // Adicionar ao histórico
            addToHistory("Fn", "Fn", "-");
            
            // Mostrar informação sobre a tecla Fn
            addToHistory("Info", "A tecla Fn é especial e gerenciada pelo sistema operacional", "-");
        });
    }
    
    // Adicionar eventos de clique às teclas virtuais
    virtualKeys.forEach(key => {
        if (key.getAttribute('data-key') !== "Fn") {
            key.addEventListener('click', () => {
                const keyCode = key.getAttribute('data-key');
                const keyText = key.textContent;
                
                // Verificar se Fn está ativo
                if (fnActive) {
                    // Simular combinação com Fn
                    keyElement.textContent = `Fn + ${keyText}`;
                    codeElement.textContent = keyCode;
                    keyCodeElement.textContent = '-';
                    
                    // Adicionar ao histórico
                    addToHistory(`Fn + ${keyText}`, keyCode, '-');
                    
                    // Desativar Fn após uso
                    fnActive = false;
                    fnKey.classList.remove('key-active');
                    fnKey.classList.remove('bg-primary');
                } else {
                    // Comportamento normal
                    keyElement.textContent = keyText;
                    codeElement.textContent = keyCode;
                    keyCodeElement.textContent = '-';
                    
                    // Adicionar ao histórico
                    addToHistory(keyText, keyCode, '-');
                }
                
                // Destacar tecla virtual
                highlightVirtualKey(keyCode);
            });
        }
    });
    
    // Adicionar informação sobre a tecla Fn
    addToHistory("Info", "A tecla Fn é uma tecla especial gerenciada pelo sistema operacional", "-");
    addToHistory("Info", "Clique em Fn e depois em outra tecla para simular combinações", "-");
});