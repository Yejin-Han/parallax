//////////////////////////////////////
// Scroll Position Bar
$(document).scroll(function(e) {
    var scrollAmount = $(window).scrollTop();
    var documentHeight = $(document).height();
    var windowHeight = $(window).height();
    var scrollPercent = (scrollAmount / (documentHeight - windowHeight)) * 100;
    var roundScroll = Math.round(scrollPercent);

    $('.scroll-line').css('width', scrollPercent + '%');
    $('.scroll-line span').text(roundScroll);
})


//////////////////////////////////////
// Contact Toggle
$('.quill-wrap, .email-me').click(function() {
    $('#contact-form').toggleClass('active');
    $($('.block').get().reverse()).each(function(i) {
        var $item = $(this);
        setTimeout(function() {
            $item.toggleClass('active');
        }, 300 * i);
    });
});


//////////////////////////////////////
// Nav Toggle
$(function() {
    var trigger = $('.nav-toggle');
    trigger.on('click', function() {
        $(this).toggleClass('open');
        $(this).next().toggleClass('active');
    });

    var triggerLink = $('.nav-list a');
    triggerLink.on('click', function() {
        $('.nav-toggle').toggleClass('open');
        $('.nav').toggleClass('active');
    });
});


//////////////////////////////////////
// Loaded Trigger
gsap.from('.loaded2', {
    duration: 1,
    opacity: 0,
    delay: 3.3,
    x: 0,
    y: 0,
    rotation: 8
});

gsap.from('.loaded3', {
    duration: 1,
    opacity: 0,
    delay: 3.8,
    x: 0,
    y: 0,
    rotation: -8
});

var tl1 = gsap.timeline(),
    elements1 = $('.loaded-down > .line');

$.each(elements1, function() {
    tl1.from($(this), {
        duration: 0.2,
        delay: 6,
        autoAlpha: 1,
        left: -500,
        ease: 'back.out(1.7)'
    });
});


//////////////////////////////////////
// Animated Titles
var ctrl1 = new ScrollMagic.Controller();

$('.gs-headline').each(function(i) {
    var inner = $(this).find('.inner');
    var inner2 = $(this).find('.inner span');
    var outer = $(this).find('.outer');

    var tl = gsap.timeline()
        .from(outer, { duration: 0.5, scaleX: 0 })
        .from(inner, {
            duration: 0.6,
            yPercent: 100,
            ease: 'back.out',
            transformOrigin: '0% 0%'
        })
        .from(inner2, {
            duration: 0.7,
            scaleX: 0,
            ease: 'back.out',
            transformOrigin: '0% 0%'
        });

    new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.8
    })
        .setTween(tl)
        .addTo(ctrl1);
});


//////////////////////////////////////
// Text Animation
function loop(elements, callback) {
    for(let i = 0; i < elements.length; i++) {
        callback(elements[i]);
    }
}

const ctrl2 = new ScrollMagic.Controller();
loop(document.querySelectorAll('.gs-reveal'), (elem) => {
    var tl = gsap.timeline();

    tl.fromTo(elem, {
            autoAlpha: 0,
            x: 0,
            y: 100
        }, {
            duration: 0.7,
            autoAlpha: 1,
            x: 0,
            y: 0,
            ease: 'back.out(1.5)'
        });

    new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 0.9,
        reverse: true
    })
        .setTween(tl)
        .addTo(ctrl2);
});


//////////////////////////////////////
// Compass Rose hide
$(document).ready(function() {
    var ctrl = new ScrollMagic.Controller();
    var flexContect = $('.section');

    new ScrollMagic.Scene({
        triggerElement: '.compass-rose',
        triggerHook: 0.8
    })
        .setClassToggle('.compass-rose', 'goodbye')
        .addTo(ctrl);
});

// Compass Rose Inner Drawing
var lineInc = 2, // 각 각도침의 회전 각도 증가값
    majMarkDegree = 10, // 주요 마크의 간격
    degreeInc = 30, // 각도 표시 텍스트의 증가값
    compassrose = document.querySelector('#compass-rose'),
    xmlns = 'http://www.w3.org/2000/svg',
    xlink = 'http://www.w3.org/1999/xlink';

if(lineInc > 0) {
    for(var i = 0; i < 360; i += lineInc) {
        var newline = document.createElementNS(xmlns, 'use'); // svg는 XTHML 언어이므로 NS사용
        
        if(i % majMarkDegree == 0) {
            newline.setAttributeNS(xlink, 'xlink:href', '#majline');
        } else {
            newline.setAttributeNS(xlink, 'xlink:href', '#roseline');
        }

        newline.setAttributeNS(null, 'transform', 'rotate(' + i + ' 250 250)'); // 앞의 i가 회전각도, 뒤의 250 250은 회전의 중심점
        compassrose.appendChild(newline);
    }
}

// Compass Deg num Writing
var writeDegs = document.createElementNS(xmlns, 'text'),
    currentDeg = 0,
    writeOffset = 0;

for(let i = 0; i < 99; i += (degreeInc / 360) * 100) {
    var degree = document.createElementNS(xmlns, 'textPath');
    degree.setAttributeNS(xlink, 'xlink:href', '#rose-circle');
    var length = (Math.log(i) * Math.LOG10E + 1) | 0;
    if(length > 1) writeOffset = 1;
    degree.setAttributeNS(null, 'startOffset', i - writeOffset + '%');
    degree.textContent = currentDeg;
    writeDegs.appendChild(degree);
    currentDeg += degreeInc;
}
compassrose.appendChild(writeDegs);

// Compass Rose Spinning
gsap.to(compassrose, {
    duration: 111,
    rotation: '360',
    ease: 'none',
    repeat: -1
});

var rose = document.querySelector('#rose');
gsap.to(rose, {
    duration: 111,
    rotation: '-360',
    ease: 'none',
    repeat: -1
});


//////////////////////////////////////
// Mouse Parallax
$.fn.parallax = function(resistance, mouse) {
    $el = $(this);
    gsap.to($el, {
        duration: 0.2,
        x: -((mouse.clientX - window.innerWidth / 2) / resistance),
        y: -((mouse.clientY - window.innerHeight / 2) / resistance)
    });
}

$(document).mousemove(function(e) {
    $('#element1 img').parallax(300, e);
    $('#element1 .para1').parallax(100, e);
    $('#element1 .para3').parallax(200, e);
    $('#element2 img').parallax(350, e);
    $('#element2 .para2').parallax(30, e);
});

var widthJs = 1024;
function animations() { // 약간 perspective에 회전 걸어서 입체적으로 보이게
    $('body').on('mousemove', function(e) {
        if($(window).width() > widthJs) {
            var $this = $('.pic-wrap');

            var x = e.clientX / $(window).width() - 0.5;
            var y = e.clientY / $(window).height() - 0.5;

            gsap.to($this, {
                duration: 1,
                rotationX: 2 * y,
                rotationY: 5 * x,
                ease: 'power1.out',
                transformPerspective: 500,
                transformOrigin: 'center'
            });
        }
    });
}

animations();
$(window).on('resize', animations);


//////////////////////////////////////
// Bar Graphs
$(document).ready(function() {
    var $win = $(window),
        $win_height = $(window).height(),
        $win_percentage = $(window).height() * 1; // 트리거 포인트를 윈도우 높이의 배수로 설정(1배)

    function scrollReveal() {
        var scrolled = $win.scrollTop();

        $('.chart-bars-hor .bar').each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if(scrolled + $win_percentage > offsetTop) {
                $(this).each(function(key, bar) {
                    var percentage = $(this).data('percentage');
                    $(this).css('width', percentage + '%');

                    // Animated numbers
                    $(this)
                        .prop('Counter', 0)
                        .animate({
                            Counter: $(this).data('percentage')
                        }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function(now) {
                                $(this).text(Math.ceil(now));
                            }
                        });
                });
            } else {
                $(this).each(function(key, bar) {
                    $(this).stop().css('width', '0%').prop('Counter', 0).text('0');
                });
            }
        });
    }

    scrollReveal();
    $(window).on('scroll', scrollReveal);
});


//////////////////////////////////////
// Rotator
var Emblem = {
    init: function(el, str) {
        var element = document.querySelector(el);
        var text = str ? str : element.innerHTML;
        element.innerHTML = '';

        for(var i = 0; i < text.length; i++) {
            var letter = text[i];
            var span = document.createElement('span');
            var node = document.createTextNode(letter);
            var r = (360 / text.length) * i;
            var x = (Math.PI / text.length).toFixed(0) * i;
            var y = x;
            span.appendChild(node);
            span.style.transform = `rotateZ(${r}deg) translate3d(${x}px, ${y}px, 0)`;
            element.appendChild(span);
        }
    }
}

Emblem.init('.rotator');


//////////////////////////////////////
// Morphing Area
/**
 * Wavy Columns
 *
 * demo3.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
    class MorphingBG {
        constructor(el) {
            this.DOM = {
                el,
                paths: Array.from(el.querySelectorAll('path')),
            };
            this.animate();
        }
        /* animate() { // 기존 코드는 anime.js 이용, but anime3에 호환이 안돼서 gsap으로 변경함
            this.DOM.paths.forEach(path => {
                setTimeout(() => {
                    anime({
                        targets: path,
                        duration: anime.random(3000, 5000),
                        easing: [0.5, 0, 0.5, 1],
                        d: path.getAttribute("pathdata:id"),
                        loop: true,
                        direction: 'alternate'
                    });
                }, anime.random(0, 1000));
            });
        } */
        
        animate() {
            this.DOM.paths.forEach(path => {
                setTimeout(() => {
                    const pathDataId = path.getAttribute('pathdata:id');

                    gsap.to(path, {
                        duration: gsap.utils.random(3, 5),
                        attr: { d: pathDataId },
                        ease: 'power1.inOut',
                        repeat: -1,
                        yoyo: true,
                    });
                }, gsap.utils.random(0, 1) * 1000);
            });
        }
    }

    new MorphingBG(document.querySelector('svg.scene'));
}


//////////////////////////////////////
// Main Nav
$(document).ready(function() {
    $('a.scrollLink').click(function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500);
    });
});


//////////////////////////////////////
// BackToTop Button
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 5) { //정확히 마지막 스크롤에 보임
        $('.back-to-top').addClass('show');
    } else {
        $('.back-to-top').removeClass('show');
    }
});



//////////////////////////////////////  -->  전체 스크롤 이벤트
// SupahScroll
// by Fabio Ottaviani
// https://codepen.io/supah/pen/MMveGv?editors=1010

class SupahScroll {
    constructor(options) {
        this.opt = options || {};
        this.el = this.opt.el ? this.opt.el : ".supah-scroll";
        this.speed = this.opt.speed ? this.opt.speed : 0.1;
        this.init();
    }
    init() {
        this.scrollY = 0;
        this.supahScroll = document.querySelectorAll(this.el)[0];
        this.events();
        this.resize();
        this.animate();
    }
    resize() {
        document.body.style.height = `${
            this.supahScroll.getBoundingClientRect().height
        }px`;
    }
    animate() {
        this.scrollY += (window.scrollY - this.scrollY) * this.speed;
        this.supahScroll.style.transform = `translate3d(0, ${-Math.floor(
            this.scrollY
        )}px, 0)`;
        this.raf = requestAnimationFrame(this.animate.bind(this));
    }
    events() {
        window.addEventListener("load", this.resize.bind(this));
        window.addEventListener("resize", this.resize.bind(this));
    }
}

const supahscroll = new SupahScroll({
    el: ".container",
    speed: 0.05
});