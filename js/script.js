document.addEventListener('DOMContentLoaded', () => {

  const todosOsContainers = document.querySelectorAll('.container-imagem-texto');

  todosOsContainers.forEach(container => {

    const imagemBase = container.querySelector('.imagem-base');
    const elementosSobrepostos = container.querySelectorAll('.elemento-sobreposto');

    if (!imagemBase) return;

    const ajustarElementos = () => {
      const larguraAtualDaImagem = imagemBase.clientWidth;

      elementosSobrepostos.forEach(elemento => {
        const top = elemento.dataset.top;
        // 1. Usamos 'let' para que o valor de 'left' possa ser alterado
        let leftPercent = parseFloat(elemento.dataset.left); 
        const width = elemento.dataset.width;
        const fontScale = elemento.dataset.fontScale;
        const lineHeight = elemento.dataset.lineHeight;

        // =======================================================
        // A LÓGCA PRO MEU CELULAR QUE N SERVE PRA MAIS NENHUM
        // =======================================================
        // if (window.innerWidth <= 1180) {
        //   if (elemento.classList.contains('debug')) {
        //     leftPercent += 0.77;
        //   }
        // }
        // =======================================================

        elemento.style.top = `${top}%`;
        // 3. Aplicamos a variável 'leftPercent'
        elemento.style.left = `${leftPercent}%`; 
        elemento.style.width = `${width}%`;

        // LÓGICA PURA E DIRETA (INTOCADA):
        // A fonte é SEMPRE relativa à largura da imagem.
        if (fontScale) {
          const novoTamanhoFonte = larguraAtualDaImagem * (parseFloat(fontScale) / 100);
          elemento.style.fontSize = `${novoTamanhoFonte}px`;
        }

        if (lineHeight) {
          elemento.style.lineHeight = lineHeight;
        }
      });
    };

    const observadorDeTamanho = new ResizeObserver(ajustarElementos);
    observadorDeTamanho.observe(imagemBase);

    if (imagemBase.complete) {
      ajustarElementos();
    } else {
      imagemBase.addEventListener('load', ajustarElementos);
    }
  });
});











const circulo = document.getElementById('circulo');
const seta = document.getElementById('seta');

function animarTrocaLugar(element, keyframeName, duration, easing) {
  element.style.animation = `${keyframeName} ${duration}s ${easing} forwards`;
}

function animarEncontrarMeio(element, keyframeName, duration, easing) {
  element.style.animation = `${keyframeName} ${duration}s ${easing} forwards`;
}

// Keyframes para troca de lugar (do começo até a troca)
const keyframesTrocaCirculo = `@keyframes troca-circulo {
  0% { opacity: 1; left: 54.59%; }
  100% { left: 40.2%; }
}`;

const keyframesTrocaSeta = `@keyframes troca-seta {
  0% { opacity: 1; left: 40.2%; }
  100% { left: 54.59%; }
}`;

// Keyframes para encontrar meio (do fim da troca até o meio)
const keyframesMeioCirculo = `@keyframes meio-circulo {
  0% { left: 40.2%; }
  100% { left: 47.395%; }
}`;

const keyframesMeioSeta = `@keyframes meio-seta {
  0% { left: 54.59%; }
  100% { left: 47.395%; }
}`;

// Adicione os keyframes dinamicamente (ou coloque no CSS estático)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframesTrocaCirculo, styleSheet.cssRules.length);
styleSheet.insertRule(keyframesTrocaSeta, styleSheet.cssRules.length);
styleSheet.insertRule(keyframesMeioCirculo, styleSheet.cssRules.length);
styleSheet.insertRule(keyframesMeioSeta, styleSheet.cssRules.length);

// Inicia a troca de lugar com easing que desacelera no fim
animarTrocaLugar(circulo, 'troca-circulo', 2.5, 'cubic-bezier(0.0, 0.0, 0.2, 1)');
animarTrocaLugar(seta, 'troca-seta', 2.5, 'cubic-bezier(0.0, 0.0, 0.2, 1)');

// Quando acabar a troca de lugar, inicia o movimento para o meio com easing mais suave
setTimeout(() => {
  animarEncontrarMeio(circulo, 'meio-circulo', 1.5, 'cubic-bezier(0.4, 0, 0.2, 1)');
  animarEncontrarMeio(seta, 'meio-seta', 1.5, 'cubic-bezier(0.4, 0, 0.2, 1)');
}, 2500);



