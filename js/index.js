////////////////////////////////// TABS

const tabsButton = document.querySelectorAll('.pay__tabs-item')
const tabsButtonLink = document.querySelectorAll('.pay__tabs-title')
const tabsContnent = document.querySelectorAll('.pay__content-item')
const tabsButtonWrap = document.querySelector('.pay__tabs-list')
const submit = document.querySelectorAll('button[type=submit]')
const btnPrev = document.querySelectorAll('.btn__steps.prev')
const btnNext = document.querySelectorAll('.btn__steps.next')
// shared variable
let tabsIndex = 0

// hide tab function
function hideTabsContent() {
    tabsContnent.forEach(item => {
        item.classList.remove('active')
    })
    tabsButton.forEach(item => {
        item.classList.remove('active') 
    })
}
// hide all tab
hideTabsContent()
// show tab function
function showTabsContent(index) {
    hideTabsContent()
    tabsButton[index].classList.add('active')
    tabsContnent[index].classList.add('active')
}
// show first tab
showTabsContent(tabsIndex)


tabsButton.forEach(item => {
    // tab switching function
    item.addEventListener('click', function() {
        tabsIndex = this.getAttribute('data-title')
        --tabsIndex
        hideTabsContent()
        showTabsContent(tabsIndex)
    })
})

// go to the next tab if the form is complete
submit.forEach(item => {
    item.closest('form').addEventListener('submit', function(e) {
        e.preventDefault()
        ++tabsIndex
        showTabsContent(tabsIndex)
        tabsButton[tabsIndex].classList.add('unlocked')
    })
})

// next tab function
btnNext.forEach(item => {
    item.addEventListener('click', () => {
        item.closest('.pay__content-item').querySelector('button[type=submit]').click()
    })
})
// previus tab function
btnPrev.forEach(item => {
    item.addEventListener('click', () => {
        --tabsIndex
        showTabsContent(tabsIndex)
    })
})
///////////////////////////////////////////////
/////////////////////////////////INPUT IMG
// uploaded image output function
function previewFile() {
    var preview = document.querySelector('.product-img img');
    var file    = document.querySelector('#file-input').files[0];
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
      document.querySelector('.product-img span').style.display = 'none'
    }
  
    if (file) {
      reader.readAsDataURL(file);
      preview.style.zIndex = '1'
    } else {
      preview.src = "";
    }
  }
///////////////////////////////////////////////
//////////////////////////////////MASK PHONE


window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) {
            event.preventDefault();
        }
        var matrix = "+38 (0xx) xxx xx xx",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[x\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("x");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/x+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});


//////////////////////////////////////////////
///////////////////////////////////CARD

const cardName = document.getElementById('cardName')
const cardNum = document.getElementById('cardNum')
const cardDate = document.getElementById('cardDate')
const cardCVV = document.getElementById('cardCVV')
//
const numbС = document.getElementById('card-numb')
const nameС = document.getElementById('card-name')
const dateС = document.getElementById('card-date')
//
const cardLogo = document.querySelector('.card__logo img')

let position = 4


// synchronization of inputs
function syncInputs(name, card) {
    name.addEventListener('input', (event) => {
        card.value = event.target.value;
        // logo card
        if (card.value[0] == 4) {
            cardLogo.src = 'img/icons8-visa-50.png'
        } else if (card.value[0] == 5) {
            cardLogo.src = 'img/icons8-mastercard-50.png'
        }
    });
}
syncInputs(cardName, nameС);
syncInputs(cardNum, numbС);
syncInputs(cardDate, dateС);

// card number validation
cardNum.addEventListener('keydown', function (e) {
    let value = this.value.replace(/\s+/g, '');
    let isBackspace = e.key === 'Backspace'; 
    if ((e.key.length === 1 && /^[^\d\s]+$/.test(e.key)) || (!isBackspace && value.length === 16)) {
        e.preventDefault();
        return false;
    }
    
    this.value = value.split('').reverse().join('').replace(/\B(?=(\d{4})+(?!\d))/g, " ").split('').reverse().join('').trim();
  });

// card date validation
  cardDate.addEventListener('keydown', function (e) {
    let value2 = this.value.replace(/\/+/g, '');
    let isBackspace2 = e.key === 'Backspace'; 

    if ((e.key.length === 1 && /^[^\d\/]+$/.test(e.key)) || (!isBackspace2 && value2.length === 4)) {
        e.preventDefault();
        return false;
    }
    
    this.value = value2.split('').reverse().join('').replace(/\B(?=(\d{2})+(?!\d))/g, "/").split('').reverse().join('').trim();
  });


// name validation
cardName.addEventListener('keydown', function(e) {
    if (e.key.match(/[0-9]/)) {
        e.preventDefault();
        return false
    } 
})

cardCVV.addEventListener('keydown', function(e) {
    if (!e.key.match(/[0-9]/)) {
        e.preventDefault();
        return false
    } else {}
})


////////////////////////////////////////////
///////////////////////////////PRICE

const price = document.getElementById('price')
const numProduct = document.getElementById('numProd')
const btnPrice = document.querySelector('#btnPrice span')

// price calculation function
function calculatePrice(price, num) {
    let result = parseInt(price.value) * parseInt(num.value)
    btnPrice.textContent = '$' + result.toFixed(2)
    return result
}
// calculation when the price of goods changes
price.addEventListener('input', () => {
    calculatePrice(price, numProduct)
})
// counting when changing the quantity of goods
numProduct.addEventListener('input', () => {
    calculatePrice(price, numProduct)
})

