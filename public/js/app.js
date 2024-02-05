let whiteboard = document.getElementById('whiteboard')
let question = document.getElementById('question')
let button = document.getElementById('button')
let answer = document.getElementById('answer')
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

button.onclick = async function() {
    button.classList.add('invisible');
    try {
        let answers =await model.findAnswers(question.value, whiteboard.value)
        answer.innerHTML= answers[0].text + ' (probability: ' + ((answers[0].score/25)*100).toFixed(2) + '%)'
        console.log(answers)
        button.classList.remove('invisible');
    } catch (e){
        console.log(e)
    }
};