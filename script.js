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

