document.addEventListener('DOMContentLoaded', () => {

  // encontro TODOS os contêineres que seguem nosso padrão.
  // isso retorna uma NodeList, que é uma coleção de elementos.
  const todosOsContainers = document.querySelectorAll('.container-imagem-texto');

  // eu itero sobre cada contêiner encontrado para tratá-lo individualmente.
  todosOsContainers.forEach(container => {

    //DENTRO de cada iteração, eu encontro a imagem base e os elementos
    // que pertencem APENAS a este contêiner específico.
    const imagemBase = container.querySelector('.imagem-base');
    const elementosSobrepostos = container.querySelectorAll('.elemento-sobreposto');

    // se um conteiner, por algum erro, não tiver uma imagem base, eu o ignoro.
    if (!imagemBase) return;

    // a função de ajuste é a mesma, mas agora ela opera
    // com as variáveis 'imagemBase' e 'elementosSobrepostos' do seu escopo atual.
    const ajustarElementos = () => {
      const larguraAtualDaImagem = imagemBase.clientWidth;

      elementosSobrepostos.forEach(elemento => {
        const top = elemento.dataset.top;
        const left = elemento.dataset.left;
        const width = elemento.dataset.width;
        const fontScale = elemento.dataset.fontScale;
         const lineHeight = elemento.dataset.lineHeight; // LER O NOVO ATRIBUTO

        elemento.style.top = `${top}%`;
        elemento.style.left = `${left}%`;
        elemento.style.width = `${width}%`;

        if (fontScale) {
          const novoTamanhoFonte = larguraAtualDaImagem * (parseFloat(fontScale) / 100);
          elemento.style.fontSize = `${novoTamanhoFonte}px`;
        }

        if (lineHeight) { //SE O ATRIBUTO EXISTIR...
          elemento.style.lineHeight = lineHeight; // ...APLICAR O VALOR
        }
      });
    };

    // isso garante que o redimensionamento da imagem 1 só acione
    // o ajuste dos elementos da imagem 1.
    const observadorDeTamanho = new ResizeObserver(ajustarElementos);
    observadorDeTamanho.observe(imagemBase);

    // Garanto a execução inicial quando a imagem carregar.
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



