let answers = [
`1) Click on the "Register" button near the top right of the page

2) Enter in all nessesary information to create an account

3) Choose whether you want to be a member or non-member

4) Click the "Register" button and you just created your account`,
`1) Click on the "Log in" button near the top right of the page

2) Enter in your username and password

3) Click log in
`,
`1) Log into your account or create a new account

2) Select the "Programs" tab to see the list of all programs available

3) Find a program that you want to sign up for and click on it's name

4) If the program has any prerequisites make sure you have completed them already.
   If you are not sure consalt with a staff member.

5) Click on the "Register for class" button 
`,
`You're account may have been removed. Please contact the YMCA and speak to a staff
member to get your account unlocked again.
`
]


function checkProb(){
    let y = document.getElementById("answer")
    if(y.firstChild != null){
      y.removeChild(y.firstChild)
    }
    let x = document.getElementById("problem").value
    if(x == 'register'){
      let para = document.createElement('pre')
      let txt = document.createTextNode(answers[0])
      para.appendChild(txt)
      document.getElementById('answer').appendChild(para)
    }
    else if(x == 'login'){
      let para = document.createElement('pre')
      let txt = document.createTextNode(answers[1])
      para.appendChild(txt)
      document.getElementById('answer').appendChild(para)
    }
    else if(x == 'signup'){
        let para = document.createElement('pre')
        let txt = document.createTextNode(answers[2])
        para.appendChild(txt)
        document.getElementById('answer').appendChild(para)
    } else if(x == 'prob_login'){
        let para = document.createElement('pre')
        let txt = document.createTextNode(answers[3])
        para.appendChild(txt)
        document.getElementById('answer').appendChild(para)
    }
}