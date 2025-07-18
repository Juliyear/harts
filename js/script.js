document.addEventListener('DOMContentLoaded', () => {

  const todosOsContainers = document.querySelectorAll('.container-imagem-texto');

  // =======================================================
  // O PAINEL DE CONTROLE CENTRALIZADO
  // Altere este valor para definir o tamanho máximo da fonte em telas pequenas.
  const LIMITE_FONTE_MOBILE_PX = 18;
  // =======================================================

  todosOsContainers.forEach(container => {

    const imagemBase = container.querySelector('.imagem-base');
    const elementosSobrepostos = container.querySelectorAll('.elemento-sobreposto');

    if (!imagemBase) return;

    const ajustarElementos = () => {
      const larguraAtualDaImagem = imagemBase.clientWidth;

      elementosSobrepostos.forEach(elemento => {
        const top = elemento.dataset.top;
        const left = elemento.dataset.left;
        const width = elemento.dataset.width;
        const fontScale = elemento.dataset.fontScale;
        const lineHeight = elemento.dataset.lineHeight;

        elemento.style.top = `${top}%`;
        elemento.style.left = `${left}%`;
        elemento.style.width = `${width}%`;

        if (fontScale) {
          // 1. Calculamos o tamanho da fonte proporcionalmente, como sempre.
          // Usamos 'let' porque o valor pode ser modificado.
          let novoTamanhoFonte = larguraAtualDaImagem * (parseFloat(fontScale) / 100);

          // 2. O "DISJUNTOR DE SEGURANÇA" AUTOMÁTICO
          // Se a largura da JANELA for menor que 1180px...
          if (window.innerWidth < 1180) {
            // ...e se o tamanho calculado ultrapassar nosso limite de segurança...
            if (novoTamanhoFonte > LIMITE_FONTE_MOBILE_PX) {
              // ...então nós forçamos a fonte a obedecer o limite.
              novoTamanhoFonte = LIMITE_FONTE_MOBILE_PX;
            }
          }

          // 3. Aplicamos o tamanho final, que agora é seguro.
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



