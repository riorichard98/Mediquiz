let users = []
let currentUser = JSON.parse(localStorage.getItem('user'))
function login(user) {
    let sameName = false
    for (let i = 0; i < users.length; i++) {
        if (user === users[i].nama) {
            users[i].score = 0
            sameName = true
        }
    }
    if (sameName === false) {
        let objek = {
            nama: user,
            score: 0
        }
        users.push(objek)
    }
    return users
}

function generateRandom() {
    let pertanyaan = [
        {
            question: 'kantong plastik yang digunakan untuk mengumpulkan feses atau kotoran dari saluran pencernaan melalui lubang di dinding perut yang disebut stoma adalah?',
            options: ["Asset/alkes-infrared-lamp-removebg-preview.png", "Asset/alkes-ems-removebg-preview.png", "Asset/alkes-colostomy-bag (true).png", "Asset/alkes-hearing-aid-removebg-preview.png"],
            answer: "Asset/alkes-colostomy-bag (true).png",
            type: 'gambar'
        },
        // {
        //     question: 'Transcutaneous electrical nerve stimulation (TENS) adalah perangkat yang mengirimkan arus listrik kecil ke bagian tubuh yang ditargetkan. Arus ini digunakan untuk menghilangkan rasa sakit adalah?',
        //     options: ["Asset/alkes-infrared-lamp-removebg-preview.png", "Asset/alkes-infrared-lamp-removebg-preview.png", "Asset/alkes-infrared-lamp-removebg-preview.png", "Asset/alkes-hearing-aid-removebg-preview.png"],
        //     answer: 'ems',
        //     type: 'gambar'
        // },
        {
            question: 'Alat yang digunakan untuk sterilisasi ruangan di rumah sakit dengan menggunakan sinar UVC LED yang dapat membunuh kuman sebesar 99,99 % adalah?',
            options: ['lampu-uv', 'centrifuge', 'nebulizer', 'ventilator'],
            answer: 'lampu-uv',
            type: 'string'
        }

    ]
    let random = Math.floor(Math.random() * pertanyaan.length)

    return pertanyaan[random]
}

console.log(generateRandom())

let submit = document.getElementById("submit")

if (submit) {
    submit.addEventListener('submit', function (event) {
        let namaUser = document.getElementById("namaUser").value
        // console.log(namaUser);
        event.preventDefault()
        login(namaUser)
        // console.log(login(namaUser));
        localStorage.setItem('user',JSON.stringify({
            nama: namaUser,
            score: 0
        })) //buat berpindah html
        localStorage.setItem("leaderboard", JSON.stringify(users)) // buat leaderboard
        // console.log(JSON.parse(localStorage.getItem('leaderboard')));
        location.replace("halaman-quiz.html")
    })
}



function showRandom() {


    let question = document.getElementById("pertanyaan")
    let random = generateRandom()
    question.innerHTML = random.question

    console.log(generateRandom());
    let pertanyaanGambar = document.getElementById('gambar')

    let pertanyaanString = document.getElementById('string')

    if (random.type === 'gambar') {
        pertanyaanString.style.display = 'none'
        pertanyaanGambar.style.display = 'block'

        for (let i = 0; i < random.options.length; i++) {
            let imgElement = document.querySelector(`#jawaban${i} img`)
            imgElement.setAttribute('src', random.options[i])
            let inputElement = document.querySelector(`#jawaban${i} input`)

            inputElement.value = random.options[i]
        }
    } else if (random.type === 'string') {
        pertanyaanGambar.style.display = 'none'
        pertanyaanString.style.display = 'block'

        for (let i = 0; i < random.options.length; i++) {
            let imgElement = document.querySelector(`#jawabans${i} p`)
            imgElement.innerHTML = random.options[i]

            let inputElement = document.querySelector(`#jawabans${i} input`)

            inputElement.value = random.options[i]
        }
    }

    return random
}


// console.log(window.location.pathname);
if(window.location.pathname === '/halaman-quiz.html'){
let output = showRandom()

let next = document.getElementById('next')
let count = 0
let jawaban =[]
next.addEventListener('click', function (event) {
    //dicek dulu jawaban user dengan jawaban yang benar
    let randomAnswer = output.answer
    let userAnswer = document.querySelector('input[name="flexRadioDefault"]:checked').value


    if(randomAnswer === userAnswer){
        currentUser.score += 20
        jawaban.push('Benar')
    }else{
        jawaban.push('Salah')
    }


    //untuk me-render question berikutnya
    let question = document.getElementById("pertanyaan").innerHTML
    let randomQuestion = output.question
    while(randomQuestion === question){
    output = showRandom()
    randomQuestion = output.question
    }
 
    count++

    console.log(randomAnswer, 'randomAnswer');

    console.log(userAnswer , 'UserAnswer');
    
    // currentUser.score += 10
    if(count === 5){
        localStorage.setItem('nilai',JSON.stringify(currentUser.score))
        localStorage.setItem('jawaban',JSON.stringify(jawaban))
        location.replace("halaman-leaderboard.html")
    }
    console.log(currentUser.score);
})
}



let pemain = document.getElementById('pemain')
pemain.innerHTML = currentUser.nama

let dataJawaban = JSON.parse(localStorage.getItem('jawaban'))

let tampilanJawaban = document.getElementById("daftarJawaban")
for(let i = 0 ; i < dataJawaban.length ; i++){
    tampilanJawaban.innerHTML += `<li>${dataJawaban[i]}</li>`
}

let nilaiTotal = JSON.parse(localStorage.getItem('nilai'))
let nilai = document.getElementById('score')
nilai.innerHTML = nilaiTotal