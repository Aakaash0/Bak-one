/* Author: 

*/


// Filtered tab functionality

var tabContent = document.querySelectorAll(".tab-content");
var imgGallery = document.querySelectorAll(".image-gallery");

for (var i = 0; i < tabContent.length; i++) {
  tabContent.forEach(function (tab) {
    tab.addEventListener('click', function () {
      for (var j = 0; j < tabContent.length; j++) {
        tabContent[j].classList.remove('active');
      }
      this.classList.add('active');

      var dataFilter = this.getAttribute('data-filter');

      for (var k = 0; k < imgGallery.length; k++) {
        imgGallery[k].classList.remove('active');
        imgGallery[k].classList.add('hide');
        if (imgGallery[k].getAttribute('data-img-filter') == dataFilter || dataFilter == "all") {
          imgGallery[k].classList.remove('hide');
          imgGallery[k].classList.add('active');
        }
      }
    })
  })
}

// Load More functionality

let loadMoreBtn = document.querySelector('.about-profile__load-more');
let currentItem = 3;
loadMoreBtn.onclick = function () {
  let cards = document.querySelectorAll('#about .wrapper .about-profile li');
  for (var i = currentItem; i < currentItem + 3; i++) {
    // cards[i].style.display = 'inline-block';
    cards[i].classList.add('cards')
  }
  currentItem += 3;

  if (currentItem >= cards.length) {
    document.querySelector('#about .wrapper .about-profile__load-more').classList.add('show')
  }
}

// form validation

var phoneReg = /^\d{10}$/;
var passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,20}$/;
var cPasswordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

var phone = document.getElementById('phone');
var Password = document.getElementById('password');
var cPassword = document.getElementById('cPassword');
var form = document.querySelector('form');
var error = document.getElementsByClassName('error');

phone.addEventListener('input', phoneval)
Password.addEventListener('input', Passwordval);
cPassword.addEventListener('input', cpasswordval);


// function for phone
function phoneval(successobj) {
  var span = document.querySelector(".phones");
  if (phone.value.length >= 10 && phone.value.match(phoneReg)) {
    document.querySelector('.phones').classList.add('success');
    document.querySelector('.phones').innerText = "Phone No is correct"
    span.classList.add("show")
    successobj.phoneSuccess = true
    return true;
  } else {
    document.querySelector('.phones').classList.remove('success');
    document.querySelector('.phones').innerText = " Please enter Number digits only."
    span.classList.add("show")
    return false;
  }
}

// function for password
function Passwordval(successobj) {
  var span = document.querySelector(".password");
  if (Password.value.length > 3 && Password.value.match(passwordReg)) {
    document.querySelector('.password').classList.add('success');
    document.querySelector(".password").innerText = "password is correct"
    span.classList.add("show")
    successobj.passwordSuccess = true
    return true;
  } else {
    document.querySelector('.password').classList.remove('success')
    document.querySelector(".password").innerHTML = "password must contain uppercase lowercase and number"
    span.classList.add("show")
    return false;
  }
}

// function for confirm password
function cpasswordval(successobj) {
  var span = document.querySelector(".c-Password");
  if (Password.value === cPassword.value && Password.value.length > 3) {
    document.querySelector('.c-Password').classList.add('success');
    document.querySelector(".c-Password").innerText = "Password successfully matched"
    span.classList.add("show")
    successobj.cPasswordsuccess = true
    return true;
  } else {
    document.querySelector('.c-Password').classList.remove('success')
    document.querySelector(".c-Password").innerText = "Password doesn't match"
    span.classList.add("show")
    return false;
  }
}

// check all functions
function checkAll(successobj) {
  var checks = false;
  Object.values(successobj).every(function (v) {
    if (!v) {
      checks = false;
      return false
    }
    else {
      checks = true
    }
    return true;
  });
  if (checks) {
    alert("Thank You! Your Data Submitted");
    document.querySelectorAll('.error').forEach(function (e) {
      e.innerHTML = ""
    });
  } else {
    alert("Please add correct data")
    return null
  }
  document.querySelector('form').reset();
}

// on submit 
document.querySelector("form").addEventListener('submit', function (e) {
  e.preventDefault();
  var successobj = { phoneSuccess: '', passwordSuccess: '', cPasswordsuccess: '' }

  phoneval(successobj)
  Passwordval(successobj)
  cpasswordval(successobj)
  checkAll(successobj)
})


// scroll top functionality
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', checkHeight)

function checkHeight() {
  if (window.scrollY > 200) {
    scrollTop.style.display = "flex"
  } else {
    scrollTop.style.display = "none"
  }
}

scrollTop.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})

// modal image
const images = document.querySelectorAll(".image-gallery figure");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modalImg");
const close = document.querySelector(".close");

images.forEach(function (image) {
  image.addEventListener("click", function () {
    modalImg.src = image.children[0].src;
    modal.classList.add("appear");
    close.addEventListener("click", function () {
      modal.classList.remove("appear");
    });
  });
});

// banner slider
var prevBtn = document.querySelector('.arrow-left');
var nextBtn = document.querySelector('.arrow-right');
var slides = document.querySelectorAll('.slide');
var dots = document.querySelectorAll('.dot');

var counter = 0;

dots.forEach(function (dot, i) {
  dot.addEventListener('click', function (e) {
    e.preventDefault();
    slides.forEach(e => e.classList.remove('show'));
    slides[i].classList.add('show');
    counter = i
  })
})

nextBtn.addEventListener('click', function (e) {
  e.preventDefault();
  counter += 1;
  slides.forEach(function (e) { e.classList.remove('show') });
  if (counter > 2) {
    counter = 0;
    slides[counter].classList.add('show');
  } else { slides[counter].classList.add('show'); }
})
prevBtn.addEventListener('click', function (e) {
  e.preventDefault();
  counter -= 1;
  slides.forEach(function (e) { e.classList.remove('show') });
  if (counter < 0) {
    counter = 2;
    slides[counter].classList.add('show');
  } else { slides[counter].classList.add('show'); }
})
