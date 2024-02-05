let whiteboard = document.getElementById('whiteboard');
let question = document.getElementById('question');
let button = document.getElementById('button');
let answer = document.getElementById('answer');
let loaderWrapper = document.getElementById('loaderWrapper');
let loader = document.getElementById('loader');
let model;

async function loadModel() {
    try {
        model = await qna.load();
        button.classList.remove('invisible');
        answer.classList.remove('invisible');
    } catch (e) {
        console.log(e);
    }
}
loadModel();

async function findAnswersBert() {
    loaderWrapper.classList.remove('none');
    loader.classList.remove('none');
    button.classList.add('invisible');

    try {
        let answers = await model.findAnswers(question.value, whiteboard.value);
        if (answers[0]) {
            answer.innerHTML = answers[0].text + ' (probability: ' + ((answers[0].score / 25) * 100).toFixed(2) + '%)';
            console.log(answers);
        } else {
            answer.innerHTML = 'try again';
        }
    } catch (e) {
        console.log(e);
        window.alert(e + ' try reloading the page');
    } finally {
        loaderWrapper.classList.add('none');
        loader.classList.add('none');
        button.classList.remove('invisible');
    }
}

button.onclick = async function() {
    loaderWrapper.classList.remove('none');
    loader.classList.remove('none');
    button.classList.add('invisible');

    // Introduce a small delay (e.g., 100 milliseconds) before calling findAnswersBert
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
        await findAnswersBert();
    } catch (e) {
        console.log(e);
        window.alert(e + ' try reloading the page');
    }
};

