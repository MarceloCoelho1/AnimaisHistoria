// Images

function initTabNav() {
    const tabMenu = document.querySelectorAll('.js-tabmenu li');
    const tabContent = document.querySelectorAll('.js-tabcontent section');
    tabContent[0].classList.add('ativo')
    
    if(tabContent.length && tabMenu.length) {
        function activeTab(index){
            tabContent.forEach((section) => {
                section.classList.remove('ativo');
            })
            tabContent[index].classList.add('ativo');
        }
        
        tabMenu.forEach((item, index) => {
            item.addEventListener('click', function() {
                activeTab(index);
            })
        })
    }
    
    
}
initTabNav();

// Accordion

function initAccordion() {
    const accordionList = document.querySelectorAll('.js-accordion dt');

    if (accordionList.length) {
        accordionList[0].classList.add('ativo')
        accordionList[0].nextElementSibling.classList.add('ativo')


        function activeAccordion() {
            this.classList.toggle('ativo')
            this.nextElementSibling.classList.toggle('ativo');
        }

        accordionList.forEach((item) => {
            item.addEventListener('click', activeAccordion)
        })
    }
    
}

initAccordion();

// Scroll Smooth

function initScrollSuave() {
    const linksInternos = document.querySelectorAll('.js-menu a[href^="#"]');

    function scrollToSection(event) {
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        const section = document.querySelector(href)
        const top = section.offsetTop
        console.log(top)
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        })
    }

    linksInternos.forEach((link)=> {
        link.addEventListener('click', scrollToSection)
    })
}

initScrollSuave();

// Anima Scroll

function initAnimaScroll() {
    const sections = document.querySelectorAll('.js-scroll');

if (sections.length) {
    const windowMetade = window.innerHeight * 0.6;

    function animaScroll() {
    sections.forEach((section)=> {
        const top = section.getBoundingClientRect().top - windowMetade;
        if (top < 0) {
            section.classList.add('ativo')
        }
    })
    }

    animaScroll();

    window.addEventListener('scroll', animaScroll)
}

}

initAnimaScroll();

// modal 

const botaoAbrir = document.querySelector('[data-modal="abrir"]');
const botaoFechar = document.querySelector('[data-modal="fechar"]');
const containerModal = document.querySelector('[data-modal="container"]');


if (botaoAbrir && botaoFechar && containerModal) {
    function abrirModal(event) {
        event.preventDefault();
        containerModal.classList.add('ativo')
        
    }
    
    function fecharModal(event) {
        event.preventDefault();
        containerModal.classList.remove('ativo')
    }
    
    function cliqueForaModal(event) {
        if (event.target === this) {
            fecharModal(event);
        }
        
    }
    
    
    botaoAbrir.addEventListener('click', abrirModal);
    botaoFechar.addEventListener('click', fecharModal);
    containerModal.addEventListener('click', cliqueForaModal);
}

// tooltip

const tooltips = document.querySelectorAll('[data-tooltip]');

function onMouseOver(event) {
    const toolTipBox = criarTooltipBox(this)
    this.addEventListener('mouseleave', function() {
        toolTipBox.remove();
    })
    onMouseMove.toolTipBox = toolTipBox;
    this.addEventListener('mousemove', onMouseMove)
    
}

const onMouseMove = {
    handleEvent(event) {
        this.toolTipBox.style.top = event.pageY + 20 +'px';
        this.toolTipBox.style.left = event.pageX + 20 + 'px';
    }
}


function criarTooltipBox(element) {
    const toolTipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    toolTipBox.classList.add('tooltip');
    toolTipBox.innerText = text;
    document.body.appendChild(toolTipBox);
    return toolTipBox;
}

tooltips.forEach((item)=> {
    item.addEventListener('mouseover', onMouseOver)
})

