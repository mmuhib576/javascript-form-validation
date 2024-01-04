console.log('script running')
const forminfo = document.forms[0]
const errorEL = document.querySelector('#errormsg')
forminfo.addEventListener("submit",(e)=>{
e.preventDefault();

let errorMsg = '';

const name = forminfo.elements.name.value;
const email = forminfo.elements.email.value;
const phone = forminfo.elements.phone.value;
const address = forminfo.elements.address.value;
const city = forminfo.elements.city.value;
const credit = forminfo.elements.credit.value;
const credit_month = forminfo.elements.credit_month.value;
const credit_year = forminfo.elements.credit_year.value;
const postcode = forminfo.elements.postcode.value;
const province = forminfo.elements.province.value;
const product1 = forminfo.elements.prod1.value;
const product2 = forminfo.elements.prod2.value;
const product3 = forminfo.elements.prod3.value;

// Name validation
if(!name)
{
    errorMsg+="Name cannot be empty \n"
}

// Email Validation
if(!email)
{
    errorMsg+="Email cannot be empty \n"
}
else if(!validateEmail(email))
{
    errorMsg+="Email is invalid"
}

// phone no Validation
if(!phone)
{
    errorMsg+="Phone no cannot be empty \n"
}
else if(!validatePhone(phone))
{
    errorMsg+="Phone no Invalid \n"
}

// address validation
if(!address)
{
    errorMsg+="Address cannot be empty \n"
}

// city validation
if(!city)
{
    errorMsg+="City cannot be empty\n"
}

//credit card validation
if(!credit)
{
    errorMsg+="Credit Card Number cannot be empty\n"
}
else if(!validateCredit(credit))
{
    errorMsg+="Credit Card Number is Invalid \n"
}
if(!credit_month)
{
    errorMsg+="Credit Card Expiry Month cannot be empty\n"
}
else if(!validateCreditMonth(credit_month))
{
    errorMsg+="Credit Card Expiry Month is Invalid \n"
}
if(!credit_year)
{
    errorMsg+="Credit Card Expiry Year cannot be empty\n"
}
else if(!validateCreditYear(credit_year))
{
    errorMsg+="Credit Card Expiry Year is Invalid \n"
}

// postalcode
if(!postcode)
{
    errorMsg+="postcode cannot be empty\n"
}
if(errorMsg)
{
    errorEL.innerText = errorMsg;
}
else
{
    errorEL.innerText = "";

    let data = 
    {
        name:name,
        email:email,
        phone:phone,
        address:`${address},\n${city},\n${province},${postcode}`,
        credit:credit,
        credit_month:credit_month,
        credit_year:credit_year,
        p1no:product1,
        p2no:product2,
        p3no:product3,
    }

        localStorage.setItem('order',JSON.stringify(data))
        location.href = "invoice.html"
    }
})

function validateEmail(email) 
{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.trim())) {
    return true;
    } 
    else 
    {
    return false;
    }
}
function validatePhone(phone) 
{
    const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (re.test(phone.trim())) 
    {
    return true;
    } 
    else 
    {
    return false;
    }
}
function validateCredit(credit) 
{
    const re = /^\d{4}[\s.-]?\d{4}[\s.-]?\d{4}[\s.-]?\d{4}$/;
    if (re.test(credit.trim())) 
    {
    return true;
    } 
    else 
    {
    return false;
    }
}
function validateCreditMonth(credit_month)
{
    const re = /^(\D{3})$/;
    if (re.test(credit_month.trim())) 
    {
    return true;
    } 
    else 
    {
    return false;
    }
}
function validateCreditYear(credit_year)
{
    const re = /^(\d{4})$/;
    if (re.test(credit_year.trim())) 
    {
    return true;
    } 
    else 
    {
    return false;
    }
}
function fillData()
{
    const data = JSON.parse(localStorage.getItem('order'))

    if(data)
    {
        document.getElementById('name').innerText = data.name;
        document.getElementById('email').innerText = data.email;
        document.getElementById('phone').innerText = data.phone;
        document.getElementById('address').innerText = data.address;
        const p1quantity = data.p1no;
        const p1Total = p1quantity * 6;
        document.getElementById('p1').innerText= data.p1no + document.getElementById('p1').innerText;
        document.getElementById('p1total').innerText ='$'+ p1Total;
        const p2quantity = data.p2no;
        const p2Total = p2quantity * 2;
        document.getElementById('p2').innerText= data.p2no + document.getElementById('p2').innerText;
        document.getElementById('p2total').innerText ='$'+ p2Total;
        const p3quantity = data.p3no;
        const p3Total = p3quantity * 3;
        document.getElementById('p3').innerText= data.p3no + document.getElementById('p3').innerText;
        document.getElementById('p3total').innerText ='$'+ p3Total;
        const subtotal = parseInt(p1Total)+parseInt(p2Total)+parseInt(p3Total);
        document.getElementById('subtotal').innerText = '$'+ subtotal;
        const taxes = subtotal * .15;
        document.getElementById('taxes').innerText = '$'+ taxes;
        const total = subtotal+taxes;
        document.getElementById('total').innerText ='$'+ total;
    }
}

