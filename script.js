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

// initDropDown menu

const dropDownMenus = document.querySelectorAll('[data-dropdown]');

dropDownMenus.forEach((menu) => {
    ['click'].forEach((userEvent) => {
        menu.addEventListener(userEvent, handleClick)
    })
})

function handleClick(event) {
    event.preventDefault()
    this.classList.add('ativo')
    outSideClick(this, ['click', 'touchstart'], () =>{
        this.classList.remove('ativo')
    });
}

function outSideClick(element, events, callback) {
    const html = document.documentElement;
    const outside = 'data-outside';

    if(!element.hasAttribute(outside)) {
        events.forEach(userEvent => {
            setTimeout(() => html.addEventListener(userEvent, handleOutsideClick))
        });
       
        element.setAttribute(outside, '');
    }
    function handleOutsideClick(event) {
        if(!element.contains(event.target)) {
        element.removeAttribute(outside);
        events.forEach(userEvent => {
            html.removeEventListener(userEvent, handleOutsideClick);
        })
        callback();
        }
    }
}

// init menuMobile

function initMenuMobile() {


    const menuButton = document.querySelector('[data-menu="button"]');
    const menuList = document.querySelector('[data-menu="list"]');
    const eventos = ['click', 'touchstart'];
    
    if(menuButton) {
    function openMenu(event) {
        menuList.classList.add('ativo');
        menuButton.classList.add('ativo');
        outSideClick(menuList, eventos, () => {
            
            menuList.classList.remove('ativo');
            menuButton.classList.remove('ativo');
        
        })
    }
    eventos.forEach(evento => menuButton.addEventListener(evento, openMenu));
    }

}

initMenuMobile()

// anima numeros

function animaNumeros() {
    const numeros = document.querySelectorAll('[data-numero]');

    numeros.forEach((numero) => {
        const total = +numero.innerText; // o + na frente do número.innertext é para transformar string em numero
        const incremento = Math.floor(total / 100)

        let start = 0;
        const timer = setInterval(()=> {
            start = start + incremento;
            numero.innerText = start;
            if(start > total) {
                numero.innerText = total
                clearInterval(timer); 
            }
        }, 25)
    })
}



function handleMutation(Mutation) {
    if((Mutation[0].target.classList.contains('ativo'))) {
        observer.disconnect();
        animaNumeros();
    }
}

const observeTarget = document.querySelector('.numeros')
const observer = new MutationObserver(handleMutation);

observer.observe(observeTarget, {attributes: true})

// horário de funcionamento

const funcionamento = document.querySelector('[data-semana]');
const diasSemana = funcionamento.dataset.semana.split(',').map(Number);
const horarioSemana = funcionamento.dataset.horario.split(',').map(Number);


const dataAgora = new Date();
const hoje = dataAgora.getDay()
const horaAgora = dataAgora.getHours();

const semanaAberto = diasSemana.indexOf(hoje) !== -1;

let horarioAberto = (horaAgora >= horarioSemana[0] && horaAgora < horarioSemana[1])


if(semanaAberto && horarioAberto) {
    funcionamento.classList.add('aberto')
} else {
    funcionamento.classList.add('fechado')
}


// fetch bitcoin
// https://blockchain.info/ticker

async function btcApi() {
    try {
        const responseFetch = await fetch('https://blockchain.info/ticker');
        const responseJson = await responseFetch.json();
        const btcReal = (1000 / (await responseJson.BRL.buy)).toFixed(4) 
        
        const btcSpan = document.querySelector('.btc-preco');
        
        btcSpan.innerHTML = btcReal
    } catch (error) {
        console.log(error)
    }
    
    
}


btcApi();
