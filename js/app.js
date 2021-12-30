const preloader = document.querySelector(".preloader")
const infoBox = document.querySelector(".info-box")
var screenWidth = screen.width

const timeCount = document.querySelector(".timer-box p");
const timeCountLine = document.querySelector(".timer-line");
const option_list = document.querySelector('.option-answer');
const correctCount = document.querySelector('.wrong-ans p span');
const nextQue = document.querySelector('.next-que');
const randomNumb = Math.floor((Math.random() * 3) + 1);
const creepyImg = document.querySelector('.lose-page' + randomNumb);

let que_count = 0;
let correct_ans = 0;
let wrong_ans = 0;
let counter;

window.addEventListener("load", loading)
if(screenWidth > 915){
  document.addEventListener("mousemove", parallaxEffect)
}

function loading(){
  preloader.children[0].style.display = 'block'
  preloader.children[1].textContent = 'Loading . . .'
  preloader.className += ' hidden'
  infoBox.innerHTML = '<p>Kenapa diam saja?</p>'
                      + '<p>Ayo, klik aku!</p>'
  anime({
    targets: 'section',
    opacity: [
      { value: 0, duration: 0, delay: 6000 },
      { value: 1, duration: 1000, delay: 0 }
    ],
    easing: 'easeInOutQuad'
  });
  anime({
    targets: '.info-box',
    scale: [
    { value: 0, duration: 0, delay: 15000 },
    { value: 0.8, duration: 0, delay: 0 },
    { value: 1, duration: 1000, delay: 0 }
    ],
    endDelay: 15000,
    easing: 'easeOutElastic(1, .5)',
    loop: true
  });
}

function parallaxEffect(e){
  this.querySelectorAll(".layer").forEach(layer => {
    const speed = layer.getAttribute("speed")
    var x = ((window.innerWidth - e.pageX * speed) / 180) + 'px'
    var y = ((window.innerHeight - e.pageY * speed) / 180) + 'px'

    layer.style.transform = 'translateX(' + x + ')' + 'translateY(' + y + ')'
  })
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  
  function timer() {
    timeCount.textContent = time;
    timeCountLine.classList.add('animate');
    time--;
    if (time < 9) {
      let zero = timeCount.textContent;
      timeCount.textContent = "0" + zero;
    }
    if (time < 0) {
      timeCountLine.style.width = "0%";
      clearInterval(counter);
      if (Math.floor((Math.random() * 3) + 1) > 2) {
        if(screenWidth > 915){
          creepyImg.style.display = "block";
          $(function () {
            $('.preloader').hide();
            $('section').hide();
            $('.shape-box').hide();
            $('.bab4').hide();
          });
        } else{
          let allOptAns = option_list.children.length;
          let correctAns = questions[que_count].answer;
          option_list.classList.add('no-drop');
          for (let i = 0; i < allOptAns; i++) {
            if (option_list.children[i].textContent == correctAns) {
              option_list.children[i].setAttribute('class', 'btn answer-btn opt correct');
            } else {
              option_list.children[i].setAttribute('class', 'btn answer-btn opt incorrect');
            }
            option_list.children[i].classList.add('disabled');
          }
          nextQue.innerHTML = '<button id="next-que" class="btn" onclick="nextQuestion()">Next<i class="fas fa-angle-double-right"></i></button>';
          nextQue.classList.remove('hide');
        }
      } else {
        let allOptAns = option_list.children.length;
        let correctAns = questions[que_count].answer;
        option_list.classList.add('no-drop');
        for (let i = 0; i < allOptAns; i++) {
          if (option_list.children[i].textContent == correctAns) {
            option_list.children[i].setAttribute('class', 'btn answer-btn opt correct');
          } else if (correctAns == 'all') {
            nextQue.classList.add('hide');
            option_list.children[0].classList.add('disabled');
            option_list.children[1].classList.add('disabled');
            option_list.children[2].classList.add('disabled');
            option_list.children[3].classList.add('disabled');
            alert('Kamu tidak memilih salah satu jawaban. Kamu kalah.');
            return;
          } else {
            option_list.children[i].setAttribute('class', 'btn answer-btn opt incorrect');
          }
          option_list.children[i].classList.add('disabled');
        }

        nextQue.innerHTML = '<button id="next-que" class="btn" onclick="nextQuestion()">Next<i class="fas fa-angle-double-right"></i></button>';
        nextQue.classList.remove('hide');
      }
    }
  }
}
$('#play-btn').click(function () {
  $('.bab3').hide()
  $('.bab4').addClass('show')
  $('.timer-line').css('width', '100%')
  startTimer(20)
});

function showQuestions(index) {
  const que_text = document.querySelector('.question-text');
  let que_tag = '<p>' + questions[index].question + '</p>';
  let option_tag = '<button class="btn answer-btn opt">' + questions[index].options[0] + '</button>' +
    '<button class="btn answer-btn opt">' + questions[index].options[1] + '</button>' +
    '<button class="btn answer-btn opt">' + questions[index].options[2] + '</button>' +
    '<button class="btn answer-btn opt">' + questions[index].options[3] + '</button>';
  MathJax.typesetPromise().then(() => {
    // modify the DOM here
    que_text.innerHTML = que_tag;
    MathJax.typesetPromise();
  }).catch((err) => console.log(err.message));
  option_list.innerHTML = option_tag;
  const opt = option_list.querySelectorAll(".opt");
  for (let i = 0; i < opt.length; i++) {
    opt[i].setAttribute('onclick', 'optionSelected(this)');
  }
}

// const questionCount = questions.length
// var randomQuestion = Math.floor(Math.random() * questionCount)
// const screenW = screen.width;
if (screenWidth <= 915) {
  showQuestions(0)
  // showQuestions(randomQuestion);
} else {
  que_count += 15
  showQuestions(15)
}

// for(i = 0; i < 1; i++){
//   do{
//     var randomQuestion = Math.floor(Math.random() * questionCount)
//   } while(onceShowing())
// }

// function

function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptAns = option_list.children.length;
  if (userAns == correctAns) {
    correct_ans++;
    correctCount.textContent = correct_ans;
    clearInterval(counter);
    answer.classList.add('correct');
    timeCountLine.style.animationPlayState = "paused";
  } else if (correctAns == "all") {
    clearInterval(counter);
    timeCountLine.style.animationPlayState = "paused";
    answer.classList.add('correct');
  } else {
    if(screenWidth > 915){
      wrong_ans++;
      if (wrong_ans === 3) {
        creepyImg.style.display = "block";
        $(function () {
          $('.preloader').hide();
          $('section').hide();
          $('.shape-box').hide();
          $('.bab4').hide();
        });
      }
    }
      answer.classList.add('incorrect');
      clearInterval(counter);
      timeCountLine.style.animationPlayState = "paused";
  
      for (let i = 0; i < allOptAns; i++) {
        if (option_list.children[i].textContent == correctAns) {
          option_list.children[i].setAttribute('class', 'btn answer-btn opt correct');
        }
      }
  }

  option_list.classList.add('no-drop');

  for (let i = 0; i < allOptAns; i++) {
    option_list.children[i].classList.add('disabled');
  }

  nextQue.innerHTML = '<button id="next-que" class="btn" onclick="nextQuestion()">Next<i class="fas fa-angle-double-right"></i></button>';
  nextQue.classList.remove('hide');
}

function nextQuestion() {
  nextQue.classList.add('hide');
  option_list.classList.remove('no-drop');
  timeCountLine.style.animationPlayState = "running"
  clearInterval(counter);
  startTimer(20);
  que_count++;
  // showQuestions(randomQuestion);
  if (que_count == 15) {
    clearInterval(counter);
    const informationPage = document.querySelector('.information');
    informationPage.style.display = "flex";
  } else if (que_count == 43) {
    $(function () {
      clearInterval(counter);
      $('.preloader').hide();
      $('section').hide();
      $('.shape-box').hide();
      $('.bab4').hide();
      $('.backdrop').addClass('show');
      anime({
        targets: '.last-page',
        scale: [{
            value: 0.8,
            duration: 0,
            delay: 0
          },
          {
            value: 1,
            duration: 1000,
            delay: 0
          }
        ],
        translateX: [{
            value: 800,
            duration: 0,
            delay: 0
          },
          {
            value: 0,
            duration: 1000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .5)',
      });
      anime({
        targets: '.balloon1-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 7500
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon2-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 7000
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon3-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 6500
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon4-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 6000
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon5-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 5500
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon6-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 5000
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon7-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 4500
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon8-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 4000
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon9-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 3500
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon10-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 3000
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon11-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 3500
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon12-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 4000
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon13-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 4500
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon14-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 5000
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon15-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 5500
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon16-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 6000
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon17-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 6500
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon18-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 7000
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.balloon19-box',
        translateY: [{
            value: 800,
            duration: 0,
            delay: 7500
          },
          {
            value: 0,
            duration: 5000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.wyatb-box',
        opacity: [{
            value: 0,
            duration: 0,
            delay: 11000
          },
          {
            value: 1,
            duration: 1000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .8)',
      });
      anime({
        targets: '.svg path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 10000,
        delay: 10000,
        loop: false
      });
      anime({
        targets: 'img.h',
        opacity: [{
            value: 0,
            duration: 0,
            delay: 13500
          },
          {
            value: 1,
            duration: 1000,
            delay: 0
          }
        ],
        easing: 'linear'
      });
      anime({
        targets: 'img.b',
        translateY: [{
            value: -200,
            duration: 0,
            delay: 16000
          },
          {
            value: 0,
            duration: 2000,
            delay: 0
          },
        ],
        easing: 'easeOutElastic(1, .3)'
      });
      anime({
        targets: '.typing-box',
        opacity: [{
            value: 0,
            duration: 0,
            delay: 19500
          },
          {
            value: 1,
            duration: 0,
            delay: 0
          },
        ],
        easing: 'linear'
      });
    });
    const timerFinalPage = document.querySelector('.timer-final-page span');
    const wyatbBtnBox = document.querySelector('.wyatb-btn-box');
    let countDown;

    function startTimerFinalPage(time) {
      countDown = setInterval(timerFinal, 1000);

      function timerFinal() {
        timerFinalPage.textContent = time;
        time--;
        if (time < 9) {
          let zero = timerFinalPage.textContent;
          timerFinalPage.textContent = "0" + zero;
        }
        if (time < 0) {
          $(function () {
            clearInterval(countDown);
            $('.timer-final-page').hide();
            wyatbBtnBox.innerHTML = '<button id="wyatb-btn" class="btn wyatb-btn">' + 'pesan dari yang jauh' + '</button>';
            $('#wyatb-btn').click(function () {
              $('.wyatb-btn-box').css('cursor', 'no-drop');
              $('#wyatb-btn').attr('disabled', 'disabled');
              $('#wyatb-btn').css('pointer-events', 'none');
              anime({
                targets: '.balloon7-box',
                translateY: [{
                    value: 0,
                    duration: 0,
                    delay: 0
                  },
                  {
                    value: -200,
                    duration: 2000,
                    delay: 0
                  }
                ],
                easing: 'easeOutElastic(1, .8)',
              });
              anime({
                targets: '.balloon8-box',
                translateY: [{
                    value: 0,
                    duration: 0,
                    delay: 200
                  },
                  {
                    value: -200,
                    duration: 2000,
                    delay: 0
                  }
                ],
                easing: 'easeOutElastic(1, .8)',
              });
              anime({
                targets: '.balloon9-box',
                translateY: [{
                    value: 0,
                    duration: 0,
                    delay: 400
                  },
                  {
                    value: -200,
                    duration: 2000,
                    delay: 0
                  }
                ],
                easing: 'easeOutElastic(1, .8)',
              });
              anime({
                targets: '.balloon10-box',
                translateY: [{
                    value: 0,
                    duration: 0,
                    delay: 600
                  },
                  {
                    value: -200,
                    duration: 2000,
                    delay: 0
                  }
                ],
                easing: 'easeOutElastic(1, .8)',
              });
              anime({
                targets: '.balloon11-box',
                translateY: [{
                    value: 0,
                    duration: 0,
                    delay: 800
                  },
                  {
                    value: -200,
                    duration: 2000,
                    delay: 0
                  }
                ],
                easing: 'easeOutElastic(1, .8)',
              });
              anime({
                targets: '.balloon12-box',
                translateY: [{
                    value: 0,
                    duration: 0,
                    delay: 1000
                  },
                  {
                    value: -200,
                    duration: 2000,
                    delay: 0
                  }
                ],
                easing: 'easeOutElastic(1, .8)',
              });
              anime({
                targets: '.balloon13-box',
                translateY: [{
                    value: 0,
                    duration: 0,
                    delay: 1200
                  },
                  {
                    value: -200,
                    duration: 2000,
                    delay: 0
                  }
                ],
                easing: 'easeOutElastic(1, .8)',
              });
            });
          });
        }
      }
    }
    startTimerFinalPage(30);
  } else {
    showQuestions(que_count);
    timeCountLine.classList.remove('animate');
    timeCountLine.style.width = "100%";
    anime({
      targets: '.bab4',
      opacity: [{
          value: 0,
          duration: 0,
          delay: 0
        },
        {
          value: 1,
          duration: 1000,
          delay: 0
        }
      ],
      easing: 'linear',
    });
  }
}

$(function () {
  anime({
    targets: '#start-btn',
    scale: 1.05,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    duration: 300,
    loop: true
  });
  $('#start-btn').click(function () {
    $('.button-box').hide();
    $('.shape-box').addClass('show');
    anime({
      targets: 'span.shape.shape1',
      scale: [{
          value: 0,
          duration: 0,
          delay: 0
        },
        {
          value: 1,
          duration: 1000,
          delay: 600
        }
      ],
      easing: 'easeOutElastic(1, .5)'
    });
    anime({
      targets: 'span.shape.shape2',
      scale: [{
          value: 0,
          duration: 0,
          delay: 0
        },
        {
          value: 1,
          duration: 1400,
          delay: 800
        }
      ],
      easing: 'easeOutElastic(1, .5)'
    });
    $('.bab1').addClass('show');
    anime({
      targets: '.bab1',
      translateX: [{
          value: -300,
          duration: 0,
          delay: 0
        },
        {
          value: 0,
          duration: 1000,
          delay: 0
        }
      ],
      easing: 'easeOutElastic(1, .5)'
    });
  });
  var realName = 'uma raissa janitra';
  var input = document.querySelector('#name');
  input.oninput = function () {
    input.value = input.value.toLowerCase()
  }
  $('#name').click(function () {
    $('input').removeClass('danger');
    $('.error-message').removeClass('show');
    $('.error-message2').removeClass('show');
  });

  function checkNum(nama) {
    var cek = /^[a-zA-Z ]{1,28}$/;
    return cek.test(nama);
  }

  function trueName(nama, event) {
    if (!checkNum(nama)) {
      anime({
        targets: '.error-message',
        scale: [{
            value: 0.8,
            duration: 0,
            delay: 0
          },
          {
            value: 1,
            duration: 1000,
            delay: 0
          }
        ],
        easing: 'easeOutElastic(1, .5)',
      });
      $('.error-message').addClass('show');
      $('input').addClass('danger');
      event.preventDefault();
    } else {
      if ($('#name').val() != realName) {
        anime({
          targets: '.error-message2',
          scale: [{
              value: 0.8,
              duration: 0,
              delay: 0
            },
            {
              value: 1,
              duration: 1000,
              delay: 0
            }
          ],
          easing: 'easeOutElastic(1, .5)',
        });
        $('.error-message2').addClass('show');
        $('input').addClass('danger');
        event.preventDefault();
      } else {
        $('.bab1').hide();
        $('.content-text p b').text($('#name').val());
        $('.bab2').addClass('show');
        anime({
          targets: '.bab2',
          translateX: [{
              value: 300,
              duration: 0,
              delay: 0
            },
            {
              value: 0,
              duration: 1000,
              delay: 0
            }
          ],
          easing: 'easeOutElastic(1, .5)',
        });
      }
    }
  }
  $('#save-btn').click(function () {
    var userName = $('#name').val();
    trueName(userName, event);
  });
  $('#exit-btn').click(function () {
    $('.bab2').hide();
    $('.exit-page-text').html('<p>Yah, Rara sedih karena kamu belum siap untuk temani Rara main. &#128546;</p>'
                            + '<p>Mungkin di lain kesempatan, ya. Kalau sudah siap, Rara selalu ada di sini, kok.</p>'
                            + '<p><i>See yah!</i></p>');
    $('.exit-page').addClass('show');
  });
  $('#next-btn').click(function () {
    $('.bab2').hide();
    $('.bab3').addClass('show');
    anime({
      targets: '.bab3',
      translateY: [{
          value: -300,
          duration: 0,
          delay: 0
        },
        {
          value: 0,
          duration: 1000,
          delay: 0
        }
      ],
      easing: 'easeOutElastic(1, .5)',
    });
  });
});
var typed = new Typed('.type', {
  strings: ['', 'Uma Raissa Janitra'],
  startDelay: 1000,
  backDelay: 3000,
  typeSpeed: 60,
  backSpeed: 60,
  loop: true,
});