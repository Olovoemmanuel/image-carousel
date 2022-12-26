const track = document.querySelector('.carousel__track');
const prevButton = document.querySelector('.carousel__button--left');
const nextButton = document.querySelector('.carousel__button--right');
const slides = Array.from(track.children);
const dotNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotNav.children);


const slidesWidth = slides[0].getBoundingClientRect().width;

// function that sets slides position
function setSlidePosition(slide, index){
    slide.style.left = index * slidesWidth + 'px';
}

// function that moves slide 
function moveToSlide(track, currentSlide, targetSlide){
    track.style.transform = 'translateX(-'+ targetSlide.style.left +')'
    currentSlide.classList.remove('current--slide');
    targetSlide.classList.add('current--slide');
}

function updateDots(currentDot, targetDot){
    currentDot.classList.remove('current--slide');
    targetDot.classList.add('current--slide');
}

function updateDisplay(slides, prevButton, nextButton, targetIndex){
    if(targetIndex === 0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }else if(targetIndex === slides.length-1){
        prevButton.classList.remove('is-hidden')
        nextButton.classList.add('is-hidden');
    }else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden')
    }
}

slides.forEach(setSlidePosition)
// when i click on the right button move slide to the right
nextButton.addEventListener('click', ()=> {
    const currentSlide = track.querySelector('.current--slide');
    const nextSlide = currentSlide.nextElementSibling
    moveToSlide(track,currentSlide,nextSlide)

    const currentDot = dotNav.querySelector('.current--slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide ===nextSlide);

    updateDots(currentDot, nextDot)
    updateDisplay(slides, prevButton, nextButton, nextIndex)
    
})
//  when i click on the left button move slide to the left

prevButton.addEventListener('click', ()=> {
    const currentSlide = track.querySelector('.current--slide');
    const prevSlide = currentSlide.previousElementSibling;

    moveToSlide(track,currentSlide,prevSlide)

    const currentDot = dotNav.querySelector('.current--slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    updateDots(currentDot, prevDot)
    updateDisplay(slides, prevButton, nextButton, prevIndex)
    
})


//  when i click on the indicators move slide to that position

dotNav.addEventListener('click', (e)=>{
    const targetDot = e.target.closest('button');
    
    if(!targetDot) return

    const currentSlide = track.querySelector('.current--slide');
    const currentDot = dotNav.querySelector('.current--slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const slideIndex = slides[targetIndex];

    moveToSlide(track,currentSlide,slideIndex);
    updateDots(currentDot, targetDot)
    updateDisplay(slides, prevButton, nextButton, targetIndex)

    
})