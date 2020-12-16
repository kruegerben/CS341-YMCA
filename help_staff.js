// Pregenerated answers to questions the staff might need help with
let answers = [
`1) Click on the "Create a Program" tab on the menu bar
    
2) Enter in all the necessary information for the new program
    
3) Click "Create"`,
`1) Click on the "Programs" tab on the menu bar

2) Find the program that is to be canceled

3) Click the "Cancel" to cancel the class
`,

`1) Click on the "Users" tab on the menu bar

2) Search and select the user that is to be deleted

3) Click on button to delete user
`]
 
// Function that will have the answer based on what question is asked
    function checkProb(){
        // Removes previous answer if there was an answer already
        let y = document.getElementById("answer")
        if(y.firstChild != null){
          y.removeChild(y.firstChild)
        }
        // The following code will change the answer based on the question that got selected in the select box
        let x = document.getElementById("problem").value
        if(x == 'create'){
          let para = document.createElement('pre')
          let txt = document.createTextNode(answers[0])
          para.appendChild(txt)
          document.getElementById('answer').appendChild(para)
        }
        else if(x == 'cancel'){
          let para = document.createElement('pre')
          let txt = document.createTextNode(answers[1])
          para.appendChild(txt)
          document.getElementById('answer').appendChild(para)
        }
        else if(x == 'delete'){
            let para = document.createElement('pre')
            let txt = document.createTextNode(answers[2])
            para.appendChild(txt)
            document.getElementById('answer').appendChild(para)
        } 
    }
