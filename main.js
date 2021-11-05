let log = console.log;

const skill_numbers = document.querySelectorAll('.skills .skill__prcent')
const spans = document.querySelectorAll('.skills .skill__range__width');
const section = document.getElementById('skills');
const times = document.querySelectorAll('.events [data-time]');
const stats = document.querySelectorAll('.stats [data-stat]');
const statsSection = document.querySelector('.stats');
const btnTop = document.querySelector('[data-btn-top]');
const btnTopMedia = document.querySelector('[data-btn-media]');
const articlesSec = document.getElementById('articles');



//////////////////////////////////////////////////////////////////////   Skills Section  ///////////////////////////////

let start = true;
window.addEventListener('scroll',function () {
    if (scrollY >= section.offsetTop - 100 )  {
        spans.forEach(span => {
            span.style.width = span.dataset.width;
        })

        if (start) {
            skill_numbers.forEach((span) => setNum(span));
        }
        start = false;
    }

})

function setNum(el) {
    let end = el.dataset.post

        let countNum = setInterval( () => {
                el.textContent++;
                if (el.textContent == end) {
                    clearInterval(countNum);
                    el.innerHTML = `${el.innerHTML}%`
                }

            }, 500 / end)

    }

//////////////////////////////////////////////////////////////////////   Time Events    ///////////////////////////////

let timeThen = new Date("Dec 31 2021 23:59:59").getTime();

let counter = setInterval(_=> {
    let timeNow = new Date()
    let leftTime = timeThen - timeNow;
    
    let days = Math.floor(leftTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor(leftTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    let minutes = Math.floor((leftTime % (1000 * 60 * 60 ) / ( 1000 * 60 )));
    let seconds = Math.floor((leftTime % (1000 * 60 ) /  1000 ))

    times.forEach(el => {
        if (el.classList.contains('days')) {
            el.innerHTML = days;
        }
        if (el.classList.contains('hours')) {
            el.innerHTML = hours;
        }
        if (el.classList.contains('minutes')) {
            el.innerHTML = minutes;
        }
        if (el.classList.contains('seconds')) {
            el.innerHTML = seconds;
        }

        if(el.innerHTML <= 9) {
            el.innerHTML = `0${el.innerHTML}`;
        }
    })
    
},1000)
//////////////////////////////////////////////////////////////////////   Stats Numbers    ///////////////////////////////

let go = true;

window.addEventListener('scroll', function () {
    if (scrollY >= statsSection.offsetTop - 350 ) {
        if(go) {
            stats.forEach(span => plusNum(span))
        }
        go = false;
    }
})

function plusNum(el) {
    let point = el.dataset.stat;

    let incr = setInterval( _=> {
        el.innerHTML++;

        if(el.innerHTML == point){
            clearInterval(incr)
        }

    }, 500 / point)
}

//////////////////////////////////////////////////////////////////////  Scroll Top Btn  ///////////////////////////////
function checker() {
    
    if (window.innerWidth <= 1199) {
        btnTop.style.display = 'none';
        btnTopMedia.style.display = 'block';
        
        
        window.addEventListener('scroll', _=> {
            if (scrollY >= articlesSec.offsetTop + 100) {
                btnTopMedia.classList.add('show')
            } else {
                    btnTopMedia.classList.remove('show')
                }
        })
        
        btnTopMedia.addEventListener('click',_=> {
            btnTopMedia.classList.remove('show');
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        })
    
    } else if (window.innerWidth >= 1200) {
        btnTopMedia.style.display = 'none';
        btnTop.style.display = 'block';

        window.addEventListener('scroll', _=> {
                if (scrollY >= articlesSec.offsetTop + 100) {
                    btnTop.classList.remove('hide')        
                    btnTop.classList.add('show')  
                } else {
                    if (btnTop.classList.contains('show')) {
                        btnTop.classList.remove('show')  
                        btnTop.classList.add('hide')        
                    }
                }
            })
            
            btnTop.addEventListener('click',_=> {
                // btnTop.classList.remove('show');  
                btnTop.classList.add('hide');   
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        })
    
    }
}


checker();

window.addEventListener('resize', _=> {
    checker();
})

window.addEventListener('scroll', _=> {
    checker();
})

