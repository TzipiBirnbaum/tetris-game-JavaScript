window.onkeydown = change;//מתיחס ללחיצות על המיקלדת

var endArr = [
    [0, 4], [0, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [4, 5], [4, 4], [2, 5], [2, 4],
    [10, 6], [9, 6], [8, 6], [7, 6], [8, 5], [9, 4], [10, 3], [9, 3], [8, 3], [7, 3],
    [13, 6], [14, 6], [15, 6], [16, 6], [17, 6], [13, 5], [14, 4], [15, 4], [16, 4], [17, 5]
];
var shapesArr = [
    /*shape1*/
    [
            /*option1*/[ [0, 0], [1, 0], [-1, 0], [-1, -1]],
            /*option2*/[ [0, 0], [0, -1], [0, 1], [1, -1]],
            /*option3*/[ [0, 0], [-1, 0], [1, 0], [1, 1]],
            /*option4*/[ [0, 0], [0, -1], [0, 1], [-1, 1]]
    ],
    /*shape2*/
    [
            /*option1*/[ [0, 0], [1, 0], [0, 1], [1, 1]]
    ],
    /*shape3*/
    [
            /*option1*/[ [0, 0], [-1, 0], [1, 0], [2, 0]],
            /*option2*/[ [0, 0], [0, -1], [0, 1], [0, 2]]
    ],
    /*shape4*/
    [
            /*option1*/[[0, 0], [-1, 0], [0, -1], [0, 1]],
            /*option2*/[[0, 0], [-1, 0], [0, -1], [1, 0]],
            /*option3*/[[0, 0], [0, -1], [0, 1], [1, 0]],
            /*option4*/[[0, 0], [-1, 0], [0, 1], [1, 0]]
    ],
    /*shape5*/
    [
            /*option1*/[[0, 0], [0, -1], [1, 0], [1, 1]],
            /*option2*/[[0, 0], [-1, 0], [0, -1], [1, -1]]
    ],
    /*shape6*/
    [
            /*option1*/[[0, 0], [0, 1], [1, 0], [1, -1]],
            /*option2*/[[0, 0], [-1, 0], [0, 1], [1, 1]]
    ],
    /*shape7*/
    [
            /*option1*/[[0, 0], [-1, 0], [-1, 1], [1, 0]],
            /*option2*/[[0,-1], [1, -1], [1, 0], [1, 1]],
            /*option3*/[[1, 0], [1, 1], [0, 1], [-1, 1]],
            /*option4*/[[0,1], [-1, 1], [-1, 0], [-1, -1]]
    ]
]
var ratearry = [400, 325, 250, 165, 100, 400]//מערך מהירויות
var background = "rgb(128, 128, 128)"
var colorsArr = ["mistyrose", "lightsalmon", "lightgreen", "lightblue", "lightyellow", "pink", "plum", background]//מערך צבעים
var translateColor = { "mistyrose": 0, "lightsalmon": 1, "lightgreen": 2, "lightblue": 3, "lightyellow": 4, "pink": 5, "plum": 6, "rgb(128, 128, 128)":7 }//מערך עזר לשמירה בlocalstorage
var currentShape = Math.ceil((Math.random() * shapesArr.length - 1))
var option = Math.ceil((Math.random() * shapesArr[currentShape].length - 1))
var nextShape = Math.ceil((Math.random() * shapesArr.length - 1));
var nextoption = Math.ceil((Math.random() * shapesArr[nextShape].length - 1));
var maxRow = 19;
var maxcolumn = 9;
var nextImidlle=1;
var nextJmidlle = 1;
var speedLevel  
var speed
var iMidlle;
var jMidlle;
var flagtout;
var tout;
var ifFinish;
var score;
var isPopUp;
var index = 0;
//jumping items
var jumpingMat = [//מערך צורות
    [[0, 2], [0, 7], [1, 1], [1, 3], [1, 6], [1, 8], [2, 0], [2, 4], [2, 5], [2, 9], [3, 0], [3, 9], [4, 1], [4, 8], [5, 2], [5, 7], [6, 3], [6, 6], [7, 4], [7, 5]],
    [[0, 2], [0, 7], [1, 1], [1, 2], [1, 7], [1, 8], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [4, 1], [4, 2], [4, 7], [4, 8], [5, 2], [5, 7]],
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [1, 9], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [3, 4], [3, 9], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]]
]
var jumpingArr;
var point = [18, 4]
var originSnake = [[19, 3], [19, 4], [19, 5]]
var currentsnakeArr = [[19, 3], [19, 4], [19, 5]]
var goRight = 1;
var goTop = -1;
var isWin = false;
var level = 1
var endtout;

function start()
{
    for (var i = 0; i <= maxRow; i++) {//בניית טבלה
        document.getElementById("board").innerHTML += "<tr id='" + i + "'></tr>";
        for (var j = 0; j <= maxcolumn; j++) {
            document.getElementById(i).innerHTML += "<td id='" + i + " " + j + "'></td>";
        }
    }
    if (localStorage.getItem("lastSpeed"))//אתחול מהירות
        speedLevel = Number(localStorage.getItem('lastSpeed'))
    else
        speedLevel = 1
    speed = ratearry[speedLevel - 1]
   
    if (localStorage.getItem("numGame") == "1") {//אם נבחר המשחק הראשון
        var x = document.createElement("table")
        x.id = "nextShapeTB"
        document.getElementsByTagName("fieldset")[0].appendChild(x)
        document.getElementsByTagName("legend")[0].innerText = "next shape"
        for (var i = 0; i < 4; i++) {//בניית מערך לצורה הבאה
            document.getElementById("nextShapeTB").innerHTML += "<tr id='" + "0" + i + "'></tr>";
            for (var j = 0; j < 4; j++) {
                document.getElementById("0" + i).innerHTML += "<td id='" + "0" + i + " " + "0" + j + "'></td>";
            }
        }
        if (localStorage.getItem("game") == "new")
            reStart();
        else
            prevGame()
    }
    else {
        var x = document.createElement("div")
        x.id = "level"
        document.getElementsByTagName("fieldset")[0].appendChild(x)
        document.getElementsByTagName("legend")[0].innerText = "level";

        if (localStorage.getItem("numGame") == 2) {//אם נבחר המשחק השני
            if (localStorage.getItem("lastJumpingLevel"))//אתחול רמה
                level = Number(localStorage.getItem('lastJumpingLevel'))
            else
                level = 1
            if (localStorage.getItem("game") == "new")
                JumpingReStart()
            else
                prevJumpingGame()
        }
        else {
            if (localStorage.getItem("lastSnakeLevel"))//אתחול רמה
                level = Number(localStorage.getItem('lastSnakeLevel'))
            else
                level = 1
            if (localStorage.getItem("game") == "new")
                snakeRestart()
            else
                prevSnakeGame()
        }
    }
}

function changeScore() {
document.getElementById("score").innerText = score
}
//tetris
function reStart() {
    paintNextShape(background);
    currentShape = Math.ceil((Math.random() * shapesArr.length - 1))
    option = Math.ceil((Math.random() * shapesArr[currentShape].length - 1))
    nextShape = Math.ceil((Math.random() * shapesArr.length - 1));
    nextoption = Math.ceil((Math.random() * shapesArr[nextShape].length - 1));
    iMidlle = 0;
    jMidlle = Math.ceil(maxcolumn / 2);
    flagtout = false;
    ifFinish = false
    score = 1
    isPopUp = false;
    index = 0;
    document.getElementById("speedLevel").innerText = document.getElementsByName("rate")[speedLevel - 1].nextSibling.textContent;
    for (var i = 0; i <= maxRow; i++)
        for (var j = 0; j <= maxcolumn; j++)
            document.getElementById(i + " " + j).style.backgroundColor = background
    paintNextShape(colorsArr[nextShape]);
    changeScore()
}

function prevGame() {
    //שליפה מlocalstorage
    iMidlle = Number(localStorage.getItem('Imiddle'));
    jMidlle = Number(localStorage.getItem('Jmiddle'));
    currentShape = Number(localStorage.getItem('shape'));
    option = Number(localStorage.getItem('option'));
    nextShape = Number(localStorage.getItem('nextShape'));
    nextoption = Number(localStorage.getItem('nextoption'))
    score = Number(localStorage.getItem('Score'))
    speedLevel = Number( localStorage.getItem('speedLevel'))
    var prevGameMat = localStorage.getItem('Arr1');
    //מחיקה מlocalstorage
    localStorage.removeItem("Imiddle")
    localStorage.removeItem("Jmiddle")
    localStorage.removeItem("shape")
    localStorage.removeItem("option")
    localStorage.removeItem("nextShape")
    localStorage.removeItem("nextoption")
    localStorage.removeItem("Score")
    localStorage.removeItem("speedLevel")
    localStorage.removeItem("Arr1")
    prevGameMat = prevGameMat.split(',')
    var help = 0;
    for (var i = 0; i <= maxRow; i++)
        for (var j = 0; j <= maxcolumn; j++) {
                document.getElementById(i + " " + j).style.backgroundColor = colorsArr[prevGameMat[help]]
            help++;
        }
    flagtout = false;
    ifFinish = false;
    isPopUp = false;
    document.getElementById("speedLevel").innerText = document.getElementsByName("rate")[speedLevel - 1].nextSibling.textContent
    localStorage.setItem("game", "new");//שינוי localStorage
    paintNextShape(colorsArr[nextShape]);
    changeScore()
}

function saveGame() {
    localStorage.setItem('lastSpeed', speedLevel);
    if (localStorage.getItem("numGame") == 1) {
        saveTetris()
    }
    else {
        if (localStorage.getItem("numGame") == 2)
            saveJumping()
        else
            saveSnake()
    }
 
}

function saveTetris() {
    if (!ifFinish) {
        var mat = new Array(maxRow + 1)
        for (var i = 0; i < mat.length; i++)
            mat[i] = new Array(maxcolumn + 1)
        for (var i = 0; i <= maxRow; i++)
            for (var j = 0; j <= maxcolumn; j++) {
                mat[i][j] = translateColor[document.getElementById(i + " " + j).style.backgroundColor];
            }
        if (window.localStorage) {
            localStorage.setItem('Arr1', mat);
            localStorage.setItem('Imiddle', iMidlle);
            localStorage.setItem('Jmiddle', jMidlle);
            localStorage.setItem('shape', currentShape);
            localStorage.setItem('option', option);
            localStorage.setItem("Score", score)
            localStorage.setItem("speedLevel", speedLevel)
            localStorage.setItem("nextShape", nextShape)
            localStorage.setItem("nextoption", nextoption)
        }
    }
}

function startNewGame() {
    clearTimeout(endtout)
    clearTimeout(tout)
    flagtout = false;
    speed = ratearry[speedLevel-1]
    if (localStorage.getItem("numGame") == "1")
        reStart()
    else {
        if (localStorage.getItem("numGame") == "2")
            JumpingReStart()
        else
            snakeRestart()
    }
}

function move() {
    moveDown()
    tout = setTimeout(move, speed);
}

function moveDown() {
    var dict = {}
    for (var i = 0; i < shapesArr[currentShape][option].length; i++) {
        dict[shapesArr[currentShape][option][i][1]] = dict[shapesArr[currentShape][option][i][1]] != null ? Math.max(dict[shapesArr[currentShape][option][i][1]], shapesArr[currentShape][option][i][0]) : shapesArr[currentShape][option][i][0];
    }
    for (var i = -2; i < 3; i++)
        if (dict[i] != null) {
            if (dict[i] + iMidlle == maxRow || document.getElementById(dict[i] + 1 + iMidlle + " " + Number(i + jMidlle)).style.backgroundColor != background && document.getElementById(dict[i] + 1 + iMidlle + " " + Number(i + jMidlle)).style.backgroundColor != "") {
                ifStop()

                if (flagtout) {
                    ifWin()
                    if (speedLevel == 6) {
                        speed--;
                    }
                    iMidlle = -1;
                    jMidlle = Math.ceil(maxcolumn / 2);
                    currentShape = nextShape
                    option = nextoption
                    paintNextShape(background)
                    nextShape = Math.ceil((Math.random() * shapesArr.length - 1))
                    nextoption = Math.ceil((Math.random() * shapesArr[nextShape].length - 1))
                    paintNextShape(colorsArr[nextShape])
                    score += 1
                    changeScore()
                }
                break;
            }
        }
    if (flagtout) {
        paint(background)
        iMidlle += 1;
        paint(colorsArr[currentShape])
    }
}

function ifStop() {
    for (var i = 0; i < maxcolumn; i++)
        if (document.getElementById(0 + " " + i).style.backgroundColor != background) {
            clearTimeout(tout);
            flagtout = false;
            ifFinish = true;
            for (var i = 0; i <= maxRow; i++)
                for (var j = 0; j <= maxcolumn; j++)
                    document.getElementById(i + " " + j).style.backgroundColor = background
            paintEnd();
            index = 0;
            break;
        }
}

function paintEnd() {
    if (index < endArr.length) {
        document.getElementById(endArr[index][0]+1 + " " + endArr[index][1]).style.backgroundColor = "black"
        index++;
        endtout = setTimeout(paintEnd, 150)
    }
    else {
        index = 0;
    }
}

function ifWin() {
    var sum=0
    var numLine=0
    var min = 0;
    var win = true;
    for (var i = 0; i < shapesArr[currentShape][option].length; i++)
    {
        if (shapesArr[currentShape][option][i][0] > min)
            min = shapesArr[currentShape][option][i][0]
    }
    for (var i = 0; i < 4 && (iMidlle + min)>=0; i++) {
        for (var j = 0; j <= maxcolumn; j++) {
            if (document.getElementById(iMidlle + min + " " + j).style.backgroundColor == background || document.getElementById(iMidlle + min + " " + j).style.backgroundColor == "")
                win = false
        }
           
        if (win) {
            numLine++
            for (var j = iMidlle+min; j > 1; j--)
                for (var k = 0; k <= maxcolumn; k++)
                    document.getElementById(j + " " + k).style.backgroundColor = document.getElementById(j - 1 + " " + k).style.backgroundColor
        }
        else
            min -= 1
       
        changeScore()
        win = true
    }
    for (var j = 1; j <= numLine; j++)
        sum += j
    score += 50 * sum
}

function paint(color) {
    for (var i = 0; i < shapesArr[currentShape][option].length; i++) {
        var currentID = iMidlle + Number(shapesArr[currentShape][option][i][0]) + " " + Number( jMidlle + shapesArr[currentShape][option][i][1]);
        if (document.getElementById(currentID))
            document.getElementById(currentID).style.backgroundColor = color
    }
}

function paintNextShape(color) {
    for (var i = 0; i < shapesArr[nextShape][nextoption].length; i++) {
        var currentID = "0" + Number(nextImidlle + Number(shapesArr[nextShape][nextoption][i][0]))  + " " + "0" + Number(nextJmidlle + shapesArr[nextShape][nextoption][i][1]);
        if (document.getElementById(currentID))
            document.getElementById(currentID).style.backgroundColor = color
    }
}

function change() {
    if (isPopUp)
        return;
    var x = event.keyCode;
    var flag = false
    switch (x) {
        //(למעלה - סובב (בטטריס
        case 17:
        case 38:
            if (flagtout) {
                if (localStorage.getItem("numGame") == "1") {
                    changeOption()
                }
                else {
                    if (localStorage.getItem("numGame") == "3") {
                        if (nextMoveSnake != 1) {
                            nextNextMoveSnake = 2;
                        }
                    }

                }
            }


            break
        //ימין - עברית הפוך
        case 37:
            if (flagtout) {
                if (localStorage.getItem("numGame") == "1")
                    moveRight()
                else {
                    if (localStorage.getItem("numGame") == "2") {
                        if (currentsnakeArr[currentsnakeArr.length - 1][1] < maxcolumn) {
                            paintSnake(background)
                            for (var i = 0; i < currentsnakeArr.length; i++) {
                                if (currentsnakeArr[i][0] - 1 == point[0] && currentsnakeArr[i][1] == point[1])
                                    flag = true
                                currentsnakeArr[i][1] += 1
                            }
                            if (flag) {
                                paintPoint(background)
                                point[1] += 1
                                paintPoint("red")
                            }
                            paintSnake("red")
                        }
                    }
                    else {
                        if (nextMoveSnake != 4) {
                            nextNextMoveSnake = 3;
                        }
                    }
                }
            }
            break
        //שמאל - עברית הפוך
        case 39:
            if (flagtout) {
                if (localStorage.getItem("numGame") == "1")
                    moveLeft()
                else {
                    if (localStorage.getItem("numGame") == "2") {
                        if (currentsnakeArr[0][1] > 0) {
                            paintSnake(background)
                            for (var i = 0; i < currentsnakeArr.length; i++) {
                                if (currentsnakeArr[i][0] - 1 == point[0] && currentsnakeArr[i][1] == point[1])
                                    flag = true
                                currentsnakeArr[i][1] -= 1
                            }
                            if (flag) {
                                paintPoint(background)
                                point[1] -= 1
                                paintPoint("red")
                            }
                            paintSnake("red")
                        }

                    }
                    else {
                        if (nextMoveSnake != 3) {
                            nextNextMoveSnake = 4;
                        }
                    }
                }
            }
               
            break
        //למטה
        case 40:
            if (flagtout) {
                if (localStorage.getItem("numGame") == "1") {
                    moveDown()
                }
                else if (localStorage.getItem("numGame") == "3") {
                    if (nextMoveSnake != 2) {
                        nextNextMoveSnake = 1;
                    }
                }
            }
            break
        //רווח - השהה/ הפעל משחק
        case 32:
            if (localStorage.getItem("numGame") == "1") {
                if (!ifFinish) {
                    if (flagtout)
                        clearTimeout(tout);
                    else
                        tout = setTimeout(move, speed)
                    flagtout = !flagtout

                }
            }
            else if (localStorage.getItem("numGame") == "2") {
                if (flagtout)
                    clearTimeout(tout);
                else
                    tout = setTimeout(jumpingMove, speed)
                flagtout = !flagtout
            }
            else {
                if (flagtout)
                    clearTimeout(tout);
                else
                    tout = setTimeout(moveSnake, speed)
                flagtout = !flagtout
            }
            break
    }
}

function moveRight() {
    var rightDict = {}
    for (var i = 0; i < shapesArr[currentShape][option].length; i++) {
        rightDict[shapesArr[currentShape][option][i][0]] = rightDict[shapesArr[currentShape][option][i][0]] != null ? Math.max(rightDict[shapesArr[currentShape][option][i][0]], shapesArr[currentShape][option][i][1]) : shapesArr[currentShape][option][i][1];
    }
    var flag = true
    for (var i = -2; i < 3; i++)
        if (rightDict[i] != null) {
            var element = document.getElementById(i + iMidlle + " " + Number(rightDict[i] + jMidlle + 1))
            if (!element || !(rightDict[i] + jMidlle < maxcolumn) || !(element.style.backgroundColor == background || element.style.backgroundColor == "")) {
                flag = false
            }
            
        }
    if (flag) {
        paint(background)
        jMidlle += 1
        paint(colorsArr[currentShape])
    }
}

function moveLeft() {
    var leftDict = {}
    for (var i = 0; i < shapesArr[currentShape][option].length; i++) {
        leftDict[shapesArr[currentShape][option][i][0]] = leftDict[shapesArr[currentShape][option][i][0]] != null ? Math.min(leftDict[shapesArr[currentShape][option][i][0]], shapesArr[currentShape][option][i][1]) : shapesArr[currentShape][option][i][1];
    }
    var flag = true
    for (var i = -2; i < 3; i++)
    if (leftDict[i] != null) {
        var element = document.getElementById(i + iMidlle + " " + Number(leftDict[i] + jMidlle - 1))
        if (!element || !(leftDict[i] + jMidlle >= 0) || !(element.style.backgroundColor == background || element.style.backgroundColor == "") ) {
                flag = false
            }

        }
    if (flag) {
        paint(background)
        jMidlle -= 1
        paint(colorsArr[currentShape])
    }
}

function changeOption() {
    var nextOption
    var nextElement;
    var canChange = true
    if (option < shapesArr[currentShape].length - 1)
        nextOption= option + 1;
    else
        nextOption = 0;
    paint(background)
    for (var i = 0; i < shapesArr[currentShape][nextOption].length; i++) {
        nextElement = document.getElementById(shapesArr[currentShape][nextOption][i][0] + iMidlle + " " + Number(shapesArr[currentShape][nextOption][i][1] + jMidlle))
        if (!nextElement ||(shapesArr[currentShape][nextOption][i][1] + jMidlle > maxcolumn || shapesArr[currentShape][nextOption][i][1] + jMidlle < 0) ||!(nextElement.style.backgroundColor == background || nextElement.style.backgroundColor == "")) {
            canChange = false
        }    
    }
    if (canChange) {
        if (option < shapesArr[currentShape].length - 1)
            option += 1;
        else
            option = 0;
    }
        
    paint(colorsArr[currentShape])
}

function rating() {  //שינוי מהירות  
    for (var i = 0; i < document.getElementsByName("rate").length; i++)
        if (document.getElementsByName('rate')[i].checked) {
            speedLevel = i+1;
            speed = ratearry[i]
            document.getElementById("speedLevel").innerText = document.getElementsByName("rate")[speedLevel - 1].nextSibling.textContent;
            break
        }
    isPopUp = false;
    flagtout = true;
    document.getElementsByClassName("radioAreaBackgraund")[0].style.display = "none";
    if (localStorage.getItem("numGame") == "1")
        reStart()
    else {
        if (localStorage.getItem("numGame") == "2")
            JumpingReStart()
        else
            snakeRestart()
    }
   
}

function changeLevel() {
    for (var i = 0; i < document.getElementsByName("radioLevel").length; i++)
        if (document.getElementsByName('radioLevel')[i].checked) {
            level = i + 1;
            document.getElementById("level").innerText = speedLevel;
            break
        }
    isPopUp = false;
    flagtout = true;
    document.getElementsByClassName("radioAreaBackgraund")[1].style.display = "none";
    if (localStorage.getItem("numGame") == "1")
        reStart()
    else {
        if (localStorage.getItem("numGame") == "2")
            JumpingReStart()
        else
            snakeRestart()
    }

}

function openNav() {//פתיחת תפריט צף
    if ((localStorage.getItem("numGame") == "1")) {
        document.getElementsByTagName("nav")[0].lastElementChild.style.display = "none"
    }
    else {
        document.getElementsByTagName("nav")[0].lastElementChild.style.display = "block"
    }
    document.getElementById("BoardMenu").style.borderBottom = "3.5px solid white";
    document.getElementById("BoardMenu").style.outlineWidth = "3px";
    document.getElementById("BoardMenu").style.top = "0";
    document.getElementById("openBoardMenu").style.top = "40vh";
    document.getElementById("openBoardMenu").setAttribute("z-index", "5");
    document.getElementById("BoardMenu").setAttribute("z-index", "5");

}

function closeNav() {//סגירת תפריט צף
    document.getElementById("BoardMenu").style.borderBottom = "0px solid white";
    document.getElementById("BoardMenu").style.outlineWidth = "0px";
    document.getElementById("BoardMenu").style.top = "-40vh";
    document.getElementById("openBoardMenu").setAttribute("z-index", "1");
    document.getElementById("BoardMenu").setAttribute("z-index", "1");
    document.getElementById("openBoardMenu").style.top = "0vh";
}

function showRadio() {//הצגת בחירת מהירות
    isPopUp = true;
    clearTimeout(tout);
    flagtout = false;
    document.getElementsByClassName("radioAreaBackgraund")[0].style.display = "grid";
    document.getElementsByName("rate")[speedLevel - 1].setAttribute("checked", "checked") 
    
}

function showLevelRadio() {
    isPopUp = true;
    clearTimeout(tout);
    flagtout = false;
    document.getElementsByClassName("radioAreaBackgraund")[1].style.display = "grid";
    document.getElementsByName("rate")[speedLevel - 1].setAttribute("checked", "checked")
}

function conGame() {
    if (localStorage.getItem("numGame") == 3) {
        if (!ifFinish) {
            tout = setTimeout(moveSnake, speed)
            flagtout = true;
        }
    }
    else {
        if (localStorage.getItem("numGame") == 2) {
            if (!ifFinish) {
                tout = setTimeout(jumpingMove, speed)
                flagtout = true;
            }
        }
        else {
            if (!ifFinish) {
                tout = setTimeout(move, speed)
                flagtout = true;
            }
        }
    }
    
    document.getElementsByClassName("radioAreaBackgraund")[0].style.display = "none";
    document.getElementsByClassName("radioAreaBackgraund")[1].style.display = "none";
    isPopUp = false;
}

//snake
var levelArr = [
    [],
    [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
        [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0],
        [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9], [16, 9], [17, 9], [18, 9], [19, 9],
        [19, 0], [19, 1], [19, 2], [19, 3], [19, 4], [19, 5], [19, 6], [19, 7], [19, 8], [19, 9],
    ],
    [
        [1, 1], [1, 2], [1, 3], [2, 1], [3, 1],
        [1, 6], [1, 7], [1, 8], [2, 8], [3, 8],
        [18, 1], [18, 2], [18, 3], [17, 1], [16, 1],
        [18, 6], [18, 7], [18, 8], [17, 8], [16, 8],
        [7, 0], [8, 0], [9, 0],
        [7, 9], [8, 9], [9, 9],
        [11, 0], [12, 0], [13, 0],
        [11, 9], [12, 9], [13, 9],
        [7, 3], [7, 4], [7, 5], [7, 6],
        [13, 3], [13, 4], [13, 5], [13, 6]
    ]
]
var snakeArr = [[10, 5], [10, 4], [10, 3]];
var panuyArr = [];
var colorSnake = 'blue';
var nextMoveSnake = 3;
var nextNextMoveSnake = 3;
var background = "rgb(128, 128, 128)"
var michsholimColor = "black";
var foodColor = 'red';
var foodSnake;
function saveSnake() {
    localStorage.setItem("panuyArr", panuyArr)
    localStorage.setItem("nextMoveSnake", nextMoveSnake)
    localStorage.setItem("nextNextMoveSnake", nextNextMoveSnake)
    localStorage.setItem("Arr3", snakeArr)
    localStorage.setItem("foodSnake", foodSnake)
    localStorage.setItem("snakeScore", score)
    localStorage.setItem("snakeLevel", level)
    localStorage.setItem("snakeSpeed", speedLevel)
}

function prevSnakeGame() {
    //שליפה מlocalstorage
    var help = localStorage.getItem("panuyArr")
    help = help.split(",")
    var index = 0
    panuyArr = []
    for (var i = 0; i < help.length; i += 2) {
        //אתחול המערך הפנוי
        var x = help[i]
        var y = help[i + 1]
        panuyArr[index] = [Number(x), Number(y)]
        index++
    }
    help = localStorage.getItem("Arr3")
    help = help.split(',')
    index = 0
    snakeArr = []
    for (var i = 0; i < help.length; i += 2) {
        var x = help[i]
        var y = help[i + 1]
        snakeArr[index] = [Number(x), Number(y)]
        index++
    }
    foodSnake = localStorage.getItem("foodSnake")
    foodSnake = foodSnake.split(',')
    document.getElementById(foodSnake[0] + " " + foodSnake[1]).style.backgroundColor = foodColor;
    score = Number(localStorage.getItem("snakeScore"))
    level = Number(localStorage.getItem("snakeLevel"))
    speedLevel = Number(localStorage.getItem("snakeSpeed"))
    //מחיקה מlocalstorage
    localStorage.removeItem("panuyArr")
    localStorage.removeItem("nextMoveSnake")
    localStorage.removeItem("nextNextMoveSnake")
    localStorage.removeItem("Arr3")
    localStorage.removeItem("foodSnake")
    localStorage.removeItem("snakeScore")
    localStorage.removeItem("snakeLevel")
    localStorage.removeItem("snakeSpeed")
    flagtout = false;
    isPopUp = false;
    document.getElementById("speedLevel").innerText = document.getElementsByName("rate")[speedLevel - 1].nextSibling.textContent
    document.getElementById("level").innerText = level
    localStorage.setItem("game", "new");//שינוי localStorage
    changeScore()
    paintMichsholim()
    drowwSnake(colorSnake);
}
function popMidlle(x, arr) {
    var result = ifExist(x, arr);
    if (result != -1) {
        panuyArr = arr.slice(0, result).concat(arr.slice(result + 1, arr.length));
    }
}

function snakeRestart() {
    ifFinish = false;
    flagtout = false;
    score = 0
    nextMoveSnake = 3;
    nextNextMoveSnake = 3;
    isPopUp = false;
    index = 0;
    snakeArr = [[10, 5], [10, 4], [10, 3]];
    panuyArr = [];
    document.getElementById("level").innerText = level
    document.getElementById("speedLevel").innerText = document.getElementsByName("rate")[speedLevel - 1].nextSibling.textContent;
    changeScore();
    for (var i = 0; i <= maxRow; i++)
        for (var j = 0; j <= maxcolumn; j++) {
            document.getElementById(i + " " + j).style.backgroundColor = background;
            panuyArr.push([i, j]);
        }
    for (var i = 0; i < snakeArr.length; i++) {
        popMidlle(snakeArr[i], panuyArr);
    }
    paintMichsholim()
    paintFood();
    drowwSnake(colorSnake);
}
function paintMichsholim() {
    for (var i = 0; i < levelArr[level - 1].length; i++) {
        document.getElementById(levelArr[level - 1][i][0] + " " + levelArr[level - 1][i][1]).style.backgroundColor = michsholimColor;
        popMidlle([levelArr[level - 1][i][0], levelArr[level - 1][i][1]], panuyArr);
    }
}
function drowwSnake(color) {
    for (var i = 0; i < snakeArr.length; i++) {
        document.getElementById(snakeArr[i][0] + " " + snakeArr[i][1]).style.backgroundColor = color;
    }
}

function ifExist(x, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][0] == x[0] && arr[i][1] == x[1])
            return i;
    }
    return -1;
}

function moveSnake() {
    if (ifFinish)
        return;
    var correctHead = snakeArr[0];
    var nextHead;
    nextMoveSnake = nextNextMoveSnake;
    switch (nextMoveSnake) {
        case 1://למטה
            nextHead = [(correctHead[0] + 1) % (maxRow + 1), correctHead[1]]
            break;
        case 2://למעלה
            var i = correctHead[0] == 0 ? maxRow : correctHead[0] - 1;
            nextHead = [i, correctHead[1]];
            break;
        case 3://שמאלה
            nextHead = [correctHead[0], (correctHead[1] + 1) % (maxcolumn + 1)]
            break;
        case 4://ימינה
            var j = correctHead[1] == 0 ? maxcolumn : correctHead[1] - 1;
            nextHead = [correctHead[0], (j)]
            break;
    }
    //בדיקה האם נגמר המשחק
    if (ifExist(nextHead, snakeArr) != -1 || ifExist(nextHead, levelArr[level - 1]) != -1) {
        ifFinish = true;
        clearTimeout(tout);
        var index = 0;
        for (i = 0; i <= maxRow; i++)
            for (j = 0; j <= maxcolumn; j++)
                document.getElementById(i + " " + j).style.backgroundColor = background;
        paintEnd()
    }
    else {
        drowwSnake(background);
        popMidlle(nextHead, panuyArr);
        snakeArr = [nextHead].concat(snakeArr);
        if (nextHead[0] == foodSnake[0] && nextHead[1] == foodSnake[1]) {
            if (speedLevel==6)
                speed -= 10;
            paintFood();
            score += 10;
            changeScore();
        }
        else {
            panuyArr.push(snakeArr[snakeArr.length - 1])
            snakeArr.pop();
        }
        drowwSnake(colorSnake);
        tout = setTimeout(moveSnake, speed);
    }
}

function speenSnake() {
    var x = event.keyCode;
    switch (x) {
        //למעלה
        case 38:
            if (flagtout) {
                if (nextMoveSnake != 1) {
                    nextNextMoveSnake = 2;
                }
            }
            break
        //ימין - עברית הפוך
        case 37:
            if (flagtout) {
                if (nextMoveSnake != 4) {
                    nextNextMoveSnake = 3;
                }
            }
            break
        //שמאל - עברית הפוך
        case 39:
            if (flagtout) {
                if (nextMoveSnake != 3) {
                    nextNextMoveSnake = 4;
                }
            }
            break
        //למטה
        case 40:
            if (flagtout) {
                if (nextMoveSnake != 2) {
                    nextNextMoveSnake = 1;
                }
            }
            break
        //רווח - השהה/ הפעל משחק
        case 32:
            if (!ifFinish) {
                if (flagtout)
                    clearTimeout(tout);
                else
                    tout = setTimeout(move, speed)
                flagtout = !flagtout

            }
            break
    }
}

function paintFood() {
    var i = Math.ceil(Math.random() * (panuyArr.length-1));
    foodSnake = [panuyArr[i][0], panuyArr[i][1]]
    document.getElementById(panuyArr[i][0] + " " + panuyArr[i][1]).style.backgroundColor = foodColor;
}

//jumping
function paintBoard() {
    isWin = false//מצייר לוח חדש
    for (var i = 0; i < jumpingArr.length; i++)
        document.getElementById(jumpingArr[i][0] + " " + jumpingArr[i][1]).style.backgroundColor = "blue"
    for (var k = 0; k < currentsnakeArr.length; k++)
        document.getElementById(currentsnakeArr[k][0] + " " + currentsnakeArr[k][1]).style.backgroundColor = "red"
    document.getElementById(point[0] + " " + point[1]).style.backgroundColor = "red"
    document.getElementById("speedLevel").innerText = document.getElementsByName("rate")[speedLevel - 1].nextSibling.textContent;
    document.getElementById("level").innerText = level
}

function saveJumping() {
    localStorage.setItem("Arr2", jumpingArr)
    localStorage.setItem("point", point)
    localStorage.setItem("currentsnakeArr", currentsnakeArr)
    localStorage.setItem("jumpingLevel", level)
    localStorage.setItem("jumpingScore", score)
}

function prevJumpingGame() {
    //שליפה מlocalstorage
    var help = localStorage.getItem("Arr2")
    help = help.split(",")
    var index = 0
    jumpingArr=[]
    for (var i = 0; i < help.length; i += 2) {
        //אתחול מערך הצורה
        var x = help[i]
        var y = help[i + 1]
        jumpingArr[index] = [Number(x), Number(y)]
        index++
    }
    help = localStorage.getItem("currentsnakeArr")
    help = help.split(',')
    index = 0
    currentsnakeArr =[]
    for (var i = 0; i < help.length; i += 2) {
        var x = help[i]
        var y = help[i + 1]
        currentsnakeArr[index] = [Number(x), Number(y)]
        index++
    }
    point = localStorage.getItem("point")
    point = point.split(',')
    var x = Number(point[0])
    var y = Number(point[1])
    point[0] = x
    point[1] = y
    score = Number(localStorage.getItem("jumpingScore"))
    level = Number( localStorage.getItem("jumpingLevel", level))
    //מחיקה מlocalstorage
    localStorage.removeItem("Arr2")
    localStorage.removeItem("point")
    localStorage.removeItem("currentsnakeArr")
    localStorage.removeItem("jumpingLevel")
    localStorage.removeItem("jumpingScore")
    flagtout = false;
    isPopUp = false;
    document.getElementById("speedLevel").innerText = document.getElementsByName("rate")[speedLevel - 1].nextSibling.textContent;
    localStorage.setItem("game", "new");//שינוי localStorage
    changeScore()
    paintBoard()
}

function JumpingReStart() {
    flagtout = false;
    score = 0
    isPopUp = false;
    index = 0;
    document.getElementById("speedLevel").innerText = document.getElementsByName("rate")[speedLevel - 1].nextSibling.textContent;
    for (var i = 0; i <= maxRow; i++)
        for (var j = 0; j <= maxcolumn; j++)
            document.getElementById(i + " " + j).style.backgroundColor = background
    jumpingArr = jumpingMat[level-1];
    point[0] = 18
    point[1] = 4
    currentsnakeArr = [[19, 3], [19, 4], [19, 5]]
     goRight = 1;
     goTop = -1;
     isWin = false
    paintBoard()
    paintPoint("red")
    paintSnake("red")
    changeScore()
}

function jumpingMove() {
    if (point[0] == maxRow) {//בדיקה אם נכשל
        for (var i = 0; i <= maxRow; i++)
            for (var j = 0; j <= maxcolumn; j++)
                document.getElementById(i + " " + j).style.backgroundColor = background
        clearTimeout(tout);
        flagtout = false;
        ifFinish = true;
        paintEnd();
    }
    else {
        var flag = false
        paintPoint(background);
        point[0] += goTop;
        point[1] += goRight;
        for (var i = 0; i < currentsnakeArr.length; i++) {//בדיקה אם הגיע למקפצה
            if (point[0] + 1 == currentsnakeArr[i][0] && (point[1] == currentsnakeArr[i][1] || point[1] + 1 == currentsnakeArr[i][1] || point[1] - 1 == currentsnakeArr[i][1])) {
                flag = true
                break
            }
        }
        if (point[1] > maxcolumn)//מניעת חריגה
            point[1] = maxcolumn
        if (point[1] < 0)
            point[1] = 0
        if ((point[1] == maxcolumn || point[1] == 0))//בדיקה אם הגיע לקצוות ושינוי כיוון
            goRight = -goRight
        if (point[0] == 0 || flag)
            goTop = -goTop
        ifDelete()
        if (!isWin) {
            paintPoint("red")
            clearTimeout(tout)
            tout = setTimeout(jumpingMove, speed)
        }

    }
}

function paintPoint(color) {//ציור הנקודה
    document.getElementById(point[0] + " " + point[1]).style.backgroundColor = color
}

function ifDelete() {
    var flag = false
    for (var i = 0; i < jumpingArr.length; i++) {//בדיקה אם הנקודה נמצאת בדיוק על אחת הקוביות בצורה
        if (point[0] == jumpingArr[i][0] && point[1] == jumpingArr[i][1]) {
            document.getElementById(jumpingArr[i][0] + " " + jumpingArr[i][1]).style.backgroundColor = background
            var help1 = jumpingArr.slice(0, i)
            var help2 = jumpingArr.slice(i + 1, jumpingArr.length)
            jumpingArr = help1.concat(help2)
            score += 10
            if (speedLevel==6)
                speed -= 5
            flag = true
            break
        }
    }
    if (!flag)//בדיקה אם הנקודה נוגעת באחד הקצוות של הקוביות בצורה
            for (var i = 0; i < jumpingArr.length; i++) {
                if ((point[0] == jumpingArr[i][0] && (point[1] + 1 == jumpingArr[i][1] || point[1] - 1 == jumpingArr[i][1])) ||
                    (point[1] == jumpingArr[i][1] && (point[0] + 1 == jumpingArr[i][0] || point[0] - 1 == jumpingArr[i][0]))) {
                    document.getElementById(jumpingArr[i][0] + " " + jumpingArr[i][1]).style.backgroundColor = background
                    var help1 = jumpingArr.slice(0, i)
                    var help2 = jumpingArr.slice(i + 1, jumpingArr.length)
                    jumpingArr = help1.concat(help2)
                    score += 10
                    speed -= 5
                    flag = true
                }
            } 
    if (flag) {//שינוי כיוון
        
        goTop = -goTop;
        goRight = -goRight;
        if (point[1] == maxcolumn || point[1] == 0)
            goRight = -goRight
        if (point[0] == maxRow || point[0] == 0)
            goTop = -goTop
        changeScore()
        if (jumpingArr.length == 0) {//בדיקה אם ניצח
              clearTimeout(tout)
              flagtout = false
              jumpingWin()
              
          }
    }       
}

function jumpingWin() {
    isWin = true;
    for (var i = 0; i <= maxRow; i++) //מחיקת הטבלה
        for (var j = 0; j <= maxcolumn; j++)
            document.getElementById(i + " " + j).style.backgroundColor = background;
    point[0] = 18;//איפוס נתונים
    point[1] = 4;
    currentsnakeArr = originSnake
    goRight = 1;
    goTop = -1;
    if (level == jumpingMat.length)//שינוי דרגה
        level = 1
    else
        level += 1
    jumpingArr = jumpingMat[level - 1]
    
    paintBoard()
    setTimeout(jumpingMove, 300)
    flagtout = true

}

function paintSnake(color) {//צביעת המקפצה
    for (var i = 0; i < currentsnakeArr.length; i++)
        document.getElementById(currentsnakeArr[i][0] + " " + currentsnakeArr[i][1]).style.backgroundColor = color
}

//דף פתיחה
function showButtons(x) {
    var thisDiv = event.currentTarget
    thisDiv.style.border = "3px solid black"
    thisDiv.style.borderRadius = "15px"
    if (thisDiv.children.length == 1) {
        var btn = document.createElement("button")
        btn.innerText = "משחק חדש"
        btn.addEventListener("click", newGame)
        document.getElementsByClassName("home")[x - 1].appendChild(btn)
        if (localStorage.getItem("Arr" + x)) {
            btn = document.createElement("button")
            btn.innerText = "המשך משחק קודם"
            btn.addEventListener("click", conPrevGame)
            document.getElementsByClassName("home")[x - 1].appendChild(btn)
        }
        btn = document.createElement("button")
        btn.innerText = "הוראות"
        btn.addEventListener("click", instruction)
        document.getElementsByClassName("home")[x - 1].appendChild(btn)
        localStorage.setItem("numGame",x)
    } 
}

function removeBtn() {
    var x = event.currentTarget
    x.style.border = "0px solid black"
    x.style.borderRadius = "0px"
    var len = x.children.length;
    for (var i = 0; i < x.children.length;) {
        if (x.children[i].tagName == "BUTTON") {
            var child = x.children[1]
            x.removeChild(child)
        }
        else
            i++
    }   
}
var imgArr = ["image/img5.png", "image/jumpingInstruction.png","image/snakeInstruction.PNG"]
function instruction() {
    closeInstruction()
    var d = document.createElement("div")
    d.setAttribute("class", "instruct")
    var x = document.createElement("img")
    x.setAttribute("src", imgArr[Number(localStorage.getItem("numGame"))  - 1])
    d.appendChild(x)
    var close = document.createElement("div")
    close.innerText = "x"
    close.addEventListener("click",closeInstruction)
    d.appendChild(close)
    document.getElementById("warpper").appendChild(d)
}

function closeInstruction() {
    var d = document.getElementsByClassName("instruct")
    if (d && d.length>0)
    document.getElementById("warpper").removeChild(d[0])
}

function newGame() {
    if (window.localStorage)
        localStorage.setItem('game', "new");
    location.assign("HtmlPage.html")
}

function conPrevGame() {
    if (window.localStorage)
        localStorage.setItem('game', "prev");
    location.assign("HtmlPage.html")
}