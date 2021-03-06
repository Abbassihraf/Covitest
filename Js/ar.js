//*  ::::::::::::::       Selector

const testBtn = document.querySelector('.start-btn')
const questionnaire = document.querySelector('.questionnaire')
const Préambule = document.querySelector('.Préambule')
const stepper = document.querySelectorAll('.stepper h1')
const nextBtn = document.querySelector('.next')
const previousBtn = document.querySelector('.previous')
const currentquestion = document.querySelector('.question')
const answerInputs = document.querySelector('.answer-inputs')
const progressBar = document.querySelector('.bar')
const questionNumber = document.querySelector('.question-number')
const animateBox = document.querySelector('.animation')
const result = document.querySelector('.Préambule h1')
const resultMessage = document.querySelectorAll('.Préambule p')

console.log(resultMessage[0]);

// ?  ::::::::      Event Listener

testBtn.addEventListener('click', startTest)

animateBox.addEventListener('change', (e) => {

    const input = e.target

    if (input.type === 'number') {

        const number = parseFloat(input.value)

        if (number >= input.min && number <= input.max) {

            answers[input.name] = input
                .value
                console
                .log(answers);

            nextBtn.disabled = false
        } else {
            nextBtn.disabled = true

        }

    } else {

        answers[input.name] = input
            .id
            console
            .log(answers);
        nextBtn.disabled = false
    }

})

// ! ::::::     fuction

let currentQuestionIndex = 0

function hideprevious() {

    if (currentQuestionIndex === 0) {
        previousBtn
            .classList
            .add('hide')
    } else {
        previousBtn
            .classList
            .remove('hide')
    }
}

function startTest() {
    stepper[0]
        .classList
        .remove('select')
    stepper[1]
        .classList
        .add('select')
    testBtn.style.display = 'none'
    Préambule.style.display = 'none'
    questionnaire.style.display = 'block'
    hideprevious()
    nextBtn.disabled = true
    showQuestion(questions[currentQuestionIndex])

}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < 21) {
        currentQuestionIndex++
        showQuestion(questions[currentQuestionIndex])
        folowProgress(currentQuestionIndex)
        hideprevious()
        transition('next')
        nextBtn.disabled = true
        if (currentQuestionIndex === 21) {
            nextBtn.innerText = 'ننهي الإختبار'
            nextBtn
                .classList
                .add('result')
            const resultBtn = document.querySelector('.result')
            resultBtn.addEventListener('click', Results)

        } else {
            nextBtn.innerText = 'سؤال التالي'
        }
    }
})

previousBtn.addEventListener('click', () => {
    currentQuestionIndex--
    showQuestion(questions[currentQuestionIndex])
    folowProgress(currentQuestionIndex)
    hideprevious()
    transition('السؤال السابق')
    nextBtn.disabled = true
    if (currentQuestionIndex === 21) {
        nextBtn.innerText = 'ننهي الإختبار'

    } else {
        nextBtn.innerText = 'السؤال التالي'
        nextBtn
            .classList
            .remove('نتائج')
    }
})

function showQuestion(question) {

    currentquestion.innerText = question.question
    answerInputs.innerHTML = ''
    const inputAnswer = question.input.answer
    const input = question.input

    if (question.input.type === 'radio') {

        inputAnswer.forEach(answer => {

            answerInputs.innerHTML += `
                    <div>
                        <input type="radio" name="${input.qNumber}" id="${answer.text}">
                        <label for="${answer.text}">
                        <i class="fas ${answer.icon}"></i>
                        <span>${answer.text}</span> </label>
                    </div>`
        })

    } else {

        answerInputs.innerHTML += `<input type="number" name="${input.qNumber}" id="${input.name}" min="${input.min}" max="${input.max}" placeholder="${input.min} - ${input.max}">
                                    <span class="input-span">${input.name}</span>`
    }

}

function folowProgress(number) {

    const currentNmber = number + 1

    questionNumber.innerText = currentNmber
    progressBar.style.width = `calc(${currentNmber} * calc(100% / 22))`

}

function transition(frame) {

    animateBox.style.animation = ` ${frame} .5s ease`
    animateBox.addEventListener('animationend', () => {
        animateBox.style.animation = ``
    })
}

let answers = {}

let severity = 0

function Results() {



//Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée :
//Tout patient sans facteur pronostique :Sans facteur de gravité & <50 ans :

if (((answers['Q1'] === 'نعم' || answers['Q3'] === 'نعم') && (answers['Q5'] === 'نعم' || answers['Q3'] === 'نعم') && (answers['Q4'] === 'نعم' || answers['Q1'] === 'نعم') && answers['Q6'] === 'نعم') && (answers['Q14'] === 'لا' && answers['Q15'] === 'لا' && answers['Q16'] === 'لا' && answers['Q17'] === 'لا' && answers['Q18'] === 'لا' && answers['Q19'] === 'لا' && ( answers['Q20'] === 'لا' || answers['Q20'] === 'راجل' ) && answers['Q21'] === 'لا' && answers['Q22'] === 'لا' &&  answers['Q11'] < 50 )) {

    resultMessage[0].innerText = 'كنصحوك تبقى في الدار وتصوني على طبيب ديالك في حالة ماشكيتي براسك' +
            ' عاود الاختبار' 
    resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
    resultMessage[0].style.fontWeight = 'bold'
    resultMessage[0].style.color = '#369D53'
}


//Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée :
//Tout patient sans facteur pronostique : Sans facteur de gravité & 50-69 ans, ou avec au moins un facteur de gravité mineur

if  (((answers['Q1'] === 'نعم' || answers['Q3'] === 'نعم') && (answers['Q5'] === 'نعم' || answers['Q3'] === 'نعم') && (answers['Q4'] === 'نعم' || answers['Q1'] === 'نعم') && answers['Q6'] === 'نعم') && ((answers['Q14'] === 'لا' && answers['Q15'] === 'لا' && answers['Q16'] === 'لا' && answers['Q17'] === 'لا' && answers['Q18'] === 'لا' && answers['Q19'] === 'لا' && ( answers['Q20'] === 'لا' || answers['Q20'] === 'راجل' ) && answers['Q21'] === 'لا' && answers['Q22'] === 'لا' && answers['Q11'] > 50) || ((answers['Q2'] >= 39) || (answers['Q7'] === 'نعم') || (answers['Q10'] === ' عيان') || (answers['Q10'] === 'مهلوك')))) {

    resultMessage[0].innerText = "تقد تشاور مع طبيب فالتيليفون او يزورك طبيب فالدار" +
    "إذا كان عندك صعوبة فالتنفس او مقديتيش تاكل مزيان او تشرب لكثر من 24 ساعة ضروري اتصل ب" +
    "141"
    resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
     resultMessage[0].style.fontWeight = 'bold'
     resultMessage[0].style.color = '#369D53'
}


//Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée :
//Tout patient avec un facteur pronostique ou plus: Aucun facteur de gravité :

if (((answers['Q1'] === 'نعم' || answers['Q3'] === 'نعم') && (answers['Q5'] === 'نعم' || answers['Q3'] === 'نعم') && (answers['Q4'] === 'نعم' || answers['Q1'] === 'نعم') && answers['Q6'] === 'نعم') && ((answers['Q14'] === 'نعم' || answers['Q15'] === 'نعم' || answers['Q16'] === 'نعم' || answers['Q17'] === 'نعم' || answers['Q18'] === 'نعم' || answers['Q19'] === 'نعم' ||answers['Q20'] === 'نعم'  || answers['Q21'] === 'نعم' || answers['Q22'] === 'نعم') && (answers['Q7'] === 'لا' && answers['Q8'] === 'لا' && answers['Q17'] === 'لا' && answers['Q10'] === 'شويا' && answers['Q10'] === 'مزيان'))){

    resultMessage[0].innerText = "تقد تشاور مع طبيب فالتيليفون او يزورك طبيب فالدار" +
    "إذا كان عندك صعوبة فالتنفس او مقديتيش تاكل مزيان او تشرب لكثر من 24 ساعة ضروري اتصل ب" +
    "141"
    resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
     resultMessage[0].style.fontWeight = 'bold'
     resultMessage[0].style.color = '#369D53'
}


//Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée :
//Tout patient avec un facteur pronostique ou plus: Un seul facteur de gravité mineur :  

if (((answers['Q1'] === 'نعم' || answers['Q3'] === 'نعم') && (answers['Q5'] === 'نعم' || answers['Q3'] === 'نعم') && (answers['Q4'] === 'نعم' || answers['Q1'] === 'نعم') && answers['Q6'] === 'نعم') && (answers['Q14'] === 'نعم' || answers['Q15'] === 'نعم' || answers['Q16'] === 'نعم' || answers['Q17'] === 'نعم' || answers['Q18'] === 'نعم' || answers['Q19'] === 'نعم' ||answers['Q20'] === 'نعم'  || answers['Q21'] === 'نعم' || answers['Q22'] === 'نعم') && (answers['Q2'] >= 39 || answers['Q7'] === 'نعم' || answers['Q10'] === 'مهلوك' || answers['Q10'] === 'عيان' )){

resultMessage[0].innerText = "تقد تشاور مع طبيب فالتيليفون او يزورك طبيب فالدار" +
                "إذا كان عندك صعوبة فالتنفس او مقديتيش تاكل مزيان او تشرب لكثر من 24 ساعة ضروري اتصل ب" +
                "141"
resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
 resultMessage[0].style.fontWeight = 'bold'
 resultMessage[0].style.color = '#369D53'
}


//Patient avec fièvre, ou toux + mal de gorge, ou toux + courbatures ou fièvre + diarrhée :
//Tout patient avec un facteur pronostique ou plus: deux facteurs de gravité mineurs :

if (((answers['Q1'] === 'نعم' || answers['Q3'] === 'نعم') && (answers['Q5'] === 'نعم' || answers['Q3'] === 'نعم') && (answers['Q4'] === 'نعم' || answers['Q1'] === 'نعم') && answers['Q6'] === 'نعم') && (answers['Q14'] === 'نعم' || answers['Q15'] === 'نعم' || answers['Q16'] === 'نعم' || answers['Q17'] === 'نعم' || answers['Q18'] === 'نعم' || answers['Q19'] === 'نعم' ||answers['Q20'] === 'نعم'  || answers['Q21'] === 'نعم' || answers['Q22'] === 'نعم') && ((answers['Q2'] >= 39 && answers['Q7'] === 'نعم') || (answers['Q2'] >= 39 && answers['Q10'] === 'عيان') || (answers['Q2'] >= 39 && answers['Q10'] === 'مهلوك') || (answers['Q7'] === 'نعم' && answers['Q10'] === 'عيان') || (answers['Q7'] === 'نعم' && answers['Q10'] === 'مهلوك'))){

    resultMessage[0].innerText = "Appelez le 141"
    resultMessage[1].innerText = 'Restez chez vous au maximum en attendant que les symptômes disparaissent. Pren' +
            'ez votre température deux fois par jour. Rappel des mesures d’hygiène.'
    resultMessage[0].style.color = '#FF0000'
    resultMessage[0].style.fontSize = '48px'
    resultMessage[0].style.fontWeight = 'bold'

}


//Tout patient avec fièvre et toux :
//Tout patient sans facteur pronostique :
//Sans facteur de gravité ou au moins 1 facteur de gravité mineur sans facteur de gravité majeur:

if (((answers['Q1'] === 'نعم' && answers['Q3'] === 'نعم') && (answers['Q14'] === 'لا' && answers['Q15'] === 'لا' && answers['Q16'] === 'لا' && answers['Q17'] === 'لا' && answers['Q18'] === 'لا' && answers['Q19'] === 'لا' && ( answers['Q20'] === 'لا' || answers['Q20'] === 'راجل' ) && answers['Q21'] === 'لا' && answers['Q22'] === 'لا')) && (answers['Q7'] === 'لا' && answers['Q8'] === 'لا' && answers['Q17'] === 'لا' && answers['Q10'] === 'شويا' && answers['Q10'] === 'مزيان') || ((answers['Q2'] >= 39 || answers['Q7'] === 'نعم' || answers['Q10'] === 'مهلوك' || answers['Q10'] === 'عيان') && answers['Q2'] <= 35,4 && answers['Q17'] === 'لا' && answers['Q8'] === 'لا')) {

resultMessage[0].innerText = "تقد تشاور مع طبيب فالتيليفون او يزورك طبيب فالدار" +
                "إذا كان عندك صعوبة فالتنفس او مقديتيش تاكل مزيان او تشرب لكثر من 24 ساعة ضروري اتصل ب" +
                "141"
resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
 resultMessage[0].style.fontWeight = 'bold'
 resultMessage[0].style.color = '#369D53'
}

//Tout patient avec fièvre et toux :
//Tout patient avec un facteur pronostique ou plus :
//Aucun facteur de gravité:

if ((answers['Q1'] === 'نعم' && answers['Q3'] === 'نعم') && (answers['Q14'] === 'نعم' || answers['Q15'] === 'نعم' || answers['Q16'] === 'نعم' || answers['Q17'] === 'نعم' || answers['Q18'] === 'نعم' || answers['Q19'] === 'نعم' ||answers['Q20'] === 'نعم'  || answers['Q21'] === 'نعم' || answers['Q22'] === 'نعم') && answers['Q7'] === 'لا' && answers['Q8'] === 'لا' && answers['Q17'] === 'لا' && answers['Q10'] === 'شويا ' && answers['Q10'] === 'مزيان') {

resultMessage[0].innerText = "تقد تشاور مع طبيب فالتيليفون او يزورك طبيب فالدار" +
                "إذا كان عندك صعوبة فالتنفس او مقديتيش تاكل مزيان او تشرب لكثر من 24 ساعة ضروري اتصل ب" +
                "141"
resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
 resultMessage[0].style.fontWeight = 'bold'
 resultMessage[0].style.color = '#369D53'

}

//Tout patient avec fièvre et toux :
//Tout patient avec un facteur pronostique ou plus :
//Un seul facteur de gravité mineur:

if ((answers['Q1'] === 'نعم' && answers['Q3'] === 'نعم') && (answers['Q14'] === 'نعم' || answers['Q15'] === 'نعم' || answers['Q16'] === 'نعم' || answers['Q17'] === 'نعم' || answers['Q18'] === 'نعم' || answers['Q19'] === 'نعم' ||answers['Q20'] === 'نعم'  || answers['Q21'] === 'نعم' || answers['Q22'] === 'نعم') && (answers['Q2'] >= 39 || answers['Q7'] === 'نعم' || answers['Q10'] === 'مهلوك' || answers['Q10'] === 'عيان')) {

resultMessage[0].innerText = "تقد تشاور مع طبيب فالتيليفون او يزورك طبيب فالدار" +
                "إذا كان عندك صعوبة فالتنفس او مقديتيش تاكل مزيان او تشرب لكثر من 24 ساعة ضروري اتصل ب" +
                "141"
resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
 resultMessage[0].style.fontWeight = 'bold'
 resultMessage[0].style.color = '#369D53'
}

//Tout patient avec fièvre et toux :
//Tout patient avec un facteur pronostique ou plus :
//Au moins deux facteurs de gravité mineurs:

if (((answers['Q1'] === 'نعم' && answers['Q3'] === 'نعم') && (answers['Q14'] === 'نعم' || answers['Q15'] === 'نعم' || answers['Q16'] === 'نعم' || answers['Q17'] === 'نعم' || answers['Q18'] === 'نعم' || answers['Q19'] === 'نعم' ||answers['Q20'] === 'نعم'  || answers['Q21'] === 'نعم' || answers['Q22'] === 'نعم')) && ((answers['Q2'] >= 39 && answers['Q7'] === 'نعم') || (answers['Q2'] >= 39 && answers['Q10'] === 'عيان') || (answers['Q2'] >= 39 && answers['Q10'] === 'مهلوك') || (answers['Q7'] === 'نعم' && answers['Q10'] === 'عيان') || (answers['Q7'] === 'نعم' && answers['Q10'] === 'مهلوك'))) {

resultMessage[0].innerText = "اتصل ب 141"
resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
resultMessage[0].style.color = '#FF0000'
resultMessage[0].style.fontSize = '48px'
resultMessage[0].style.fontWeight = 'bold'
}

//Tout patient avec un seul symptôme parmi fièvre, toux, mal de gorge, courbatures :
//Pas de facteur de gravité:

if ((answers['Q1'] === 'نعم' ||answers['Q3'] === 'نعم'  || answers['Q5'] === 'نعم' || answers['Q4'] === 'نعم') &&(answers['Q7'] === 'لا' && answers['Q8'] === 'لا' && answers['Q17'] === 'لا' && answers['Q10'] === 'شويا' && answers['Q10'] === 'مزيان')){

resultMessage[0].innerText = 'مافيكش فيروس كورونا على الأرجح، إذا عندك شك اتصل بالطبيب ديالك. ولا صوني ل 141'
resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
resultMessage[0].style.fontWeight = 'bold'
resultMessage[0].style.fontWeight = 'bold'
resultMessage[0].style.color = '#369D53'

}

//Tout patient avec un seul symptôme parmi fièvre, toux, mal de gorge, courbatures :
//Au moins un facteur de gravité ou un facteur pronostique:

if ((answers['Q1'] === 'نعم' ||answers['Q3'] === 'نعم'  || answers['Q5'] === 'نعم' || answers['Q4'] === 'نعم') && ((answers['Q14'] === 'نعم' || answers['Q15'] === 'نعم' || answers['Q16'] === 'نعم' || answers['Q17'] === 'نعم' || answers['Q18'] === 'نعم' || answers['Q19'] === 'نعم' ||answers['Q20'] === 'نعم'  || answers['Q21'] === 'نعم' || answers['Q22'] === 'نعم') || (answers['Q7'] === 'نعم' && answers['Q8'] === 'نعم' && answers['Q17'] === 'نعم' && answers['Q10'] === 'مهلوك' && answers['Q10'] === 'عيان' ) )) {

resultMessage[0].innerText = 'مافيكش فيروس كورونا على الأرجح، إذا عندك شك اتصل بالطبيب ديالك. ولا صوني ل 141'
resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
resultMessage[0].style.fontWeight = 'bold'
resultMessage[0].style.fontWeight = 'bold'
resultMessage[0].style.color = '#369D53'
}


// Tout patient avec aucun symptôme :

if ((answers['Q1'] === 'لا') && (answers['Q3'] === 'لا') && (answers['Q4'] === 'لا') && (answers['Q5'] === 'لا') && (answers['Q6'] === 'لا')){

resultMessage[0].innerText = 'مافيكش فيروس كورونا على الأرجح، إذا عندك شك اتصل بالطبيب ديالك. تقد تعاود الإختبار لكانوا عندك اعراض اخرى. لبغيتي تعرف اكثر على الڤيروس ممكن تشوف صفحة النصائح'
resultMessage[1].innerText = 'خليك فدارك حتى تحيد الاعراض، عبر درجة الحراة 2 مرات فالنهار. ومتنساوش النظافة و غسل إيديك بزاف ديال المرات فالنهار'
resultMessage[0].style.fontWeight = 'bold'
resultMessage[0].style.fontWeight = 'bold'
resultMessage[0].style.color = '#369D53'
}

    showResult(severity)

}

function showResult(severity) {

    stepper[1]
        .classList
        .remove('select')
    stepper[2]
        .classList
        .add('select')
    testBtn.style.display = 'block'
    Préambule.style.display = 'block'
    questionnaire.style.display = 'none'
    testBtn.textContent = ' نعاود الإختبار'
    testBtn.addEventListener('click', () => {

        window
            .location
            .reload()
    })

    result.innerText = 'النتائج'



}


























































const questions = [{
        question: 'واش كانت فيك السخانة في 10 أيام لي فاتت (التوريشة,العرق؟',
            input: {
            type: 'radio',
            qNumber: 'Q1',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'شحال درجة الحرارة ديالك ؟',

        input: {
            type: 'number',
            qNumber: 'Q2',
            name: 'درجة',
            min: 34,
            max: 42
        }
    }, {
        question: 'في الايام لي فاتو واش كانت فيك الكحبة اولا تزادت الكحبة لي كانت كتجيك عادية؟',

        input: {
            type: 'radio',
            qNumber: 'Q3',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'واش كتعاني من آلام عضلية غير معتادة في الأيام القليلة لي فاتت؟',

        input: {
            type: 'radio',
            qNumber: 'Q4',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'واش كتحس بآلام فحلقك هاد الايام ؟',

        input: {
            type: 'radio',
            qNumber: 'Q5',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'فهاد 24 ساعة لي فاتو واش كان فيك الإسهال ؟ على الاقل 3 مرات',

        input: {
            type: 'radio',
            qNumber: 'Q6',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'فهاد الايام لي فاتو، واش عيتي بطريقة ماشي عادية لدرجة بقيتي مريح اكثر من نص يوم ؟',

        input: {
            type: 'radio',
            qNumber: 'Q7',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'واش لقيتي صعوبة كبيرة فالماكلة و الشراب لاكثر من 24 ساعة ؟',

        input: {
            type: 'radio',
            qNumber: 'Q8',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'واش كتحس بضيق فالتنفس ملي كتكلم ولا كدير جهد كثر من العادة ؟',

        input: {
            type: 'radio',
            qNumber: 'Q9',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'فهاد الوقت كيف كتحس بالجسم ديالك ؟',

        input: {
            type: 'radio',
            qNumber: 'Q10',
            answer: [{
                text: 'مزيان',
                icon: ' far fa-laugh'
            }, {
                text: 'شويا',
                icon: ' far fa-smile'
            }, {
                text: 'عيان',
                icon: ' far fa-frown'
            }, {
                text: 'مهلوك',
                icon: 'far fa-dizzy'
            }]
        }
    }, {
        question: 'شحال عندك فعمرك ؟ هادشي باش نقدو نعرفو الخطورة ديال المرض إلا كان.',

        input: {
            type: 'number',
            qNumber: 'Q11',
            name: 'سنة',
            min: 15,
            max: 110
        }
    }, {
        question: 'شحال عندك فالوزن ؟ باش نعرفو مؤشر الوزن ديال الجسم ديالك حيث يقدر يتزاد عليك الحال فحالة كان فيك الڤيروس',

        input: {
            type: 'number',
            qNumber: 'Q12',
            name: 'كلغ',
            min: 20,
            max: 250
        }
    }, {
        question: 'شحال فيك فالطول ؟ باش نعرفو مؤشر الوزن ديال الجسم ديالك حيث يقدر يتزاد عليك الحال فحالة كان فيك الڤيروس',

        input: {
            type: 'number',
            qNumber: 'Q13',
            name: 'سنتيمتر',
            min: 80,
            max: 250
        }
    }, {
        question: 'واش عندك ارتفاع ضغط الدم ؟ ولا فيك مرض القلب او الأوعية الدموية ؟ او كتاخد دوا ديال القلب ؟',

        input: {
            type: 'radio',
            qNumber: 'Q14',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'فيك مرض السكر ؟',

        input: {
            type: 'radio',
            qNumber: 'Q15',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'واش فيك السرطان ولا كان فيك السرطان؟',

        input: {
            type: 'radio',
            qNumber: 'Q16',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'واش عندك الضيقة ؟ او متبع مع شي طبيب ديال الرية',

        input: {
            type: 'radio',
            qNumber: 'Q17',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'واش كدير دياليز؟',

        input: {
            type: 'radio',
            qNumber: 'Q18',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'واش عندك إلتهاب فالكبد ؟',

        input: {
            type: 'radio',
            qNumber: 'Q19',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'واش حاملة ؟',

        input: {
            type: 'radio',
            qNumber: 'Q20',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }, {
                text: 'راجل',
                icon: 'fa-male'

            }]
        }
    }, {
        question: 'واش عندك شي مرض تينقص لك المناعة ديالك ؟',

        input: {
            type: 'radio',
            qNumber: 'Q21',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }, {
        question: 'واش تتاخد شي دواء تينقص لك المناعة ديالك ؟ بحال: الكورتيكوستيرويدات ، الميثوتريكسات ، السيكلوسبورين ، تاكروليموس ، الآزوثيوبرين ، سيكلوفوسفاميد (كاين ادوية اخرى من غير هادو).',

        input: {
            type: 'radio',
            qNumber: 'Q22',
            answer: [{
                text: 'نعم',
                icon: 'fa-check'
            }, {
                text: 'لا',
                icon: 'fa-times'
            }]
        }
    }

]