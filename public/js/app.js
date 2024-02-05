let whiteboard = document.getElementById('whiteboard')
let question = document.getElementById('question')
let button = document.getElementById('button')
let answer = document.getElementById('answer')
let loaderWrapper =document.getElementById('loaderWrapper')
let loader =document.getElementById('loader')
let model;

async function loadModel(){
    try {
        model = await qna.load();
        button.classList.remove('invisible');
        answer.classList.remove('invisible');
    } catch (e){
        console.log(e)
    }

}
loadModel()
async function findAnswersBert(){
    let answers = await model.findAnswers(question.value, whiteboard.value)
    if(answers[0]){
        answer.innerHTML= answers[0].text + ' (probability: ' + ((answers[0].score/25)*100).toFixed(2) + '%)'
        console.log(answers)
        button.classList.remove('invisible');
        loaderWrapper.classList.add('none');
        loader.classList.add('none');
    } else{
        answer.innerHTML= 'try again'
        button.classList.remove('invisible');
        loaderWrapper.classList.add('none');
        loader.classList.add('none');
    }
}

button.onclick = function() {
    loaderWrapper.classList.remove('none');
    loader.classList.remove('none');
    button.classList.add('invisible');

    try {
        findAnswersBert();
    } catch (e){
        console.log(e)
        window.alert(e + ' try reloading the page')
    }
};