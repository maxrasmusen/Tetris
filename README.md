# Tetris

##Installation
Clone repo using `git clone https://github.com/maxrasmusen/Tetris.git`
Open index.html in browser.
Make sure javascript is enabled. 

##To add tetris to a project. 
Link all scripts in Tetris directory on your page. `Window.js` is not necessary if you do not want a 'next' window. 

Make sure you have jQuery installed. 

Link to the project by creating the element 
`<div id='main-game'><\div>`

Add the following to your stylesheet: 

~~~
#main-game li {
    width: 30px;
    height: 30px;
    border: solid grey 1px;
    display: table-cell;
    opacity: 0.85;
    /*transform: rotate(7deg);*/
}

#main-game ul {
    list-style-type: none;
    padding: 0px;
}


#main-game {
    border: solid black 1px;
    border-radius: 5px;
    /*width: 320px;*/
    /*background-color: yellow;*/
    background-image: url('https://media.giphy.com/media/lSzQjkthGS1gc/giphy.gif');
    background-size: cover;
    display: inline-block;
    margin-left: 20px;
    /*margin-top: 50px;*/
    box-shadow: 0px 0px 10px 0px black;
}

#main-game .background {
    background-color: black;
    border: solid darkgrey 1px;
    opacity: 0;
}

#main-game .terrain {
    background-color: black;
    border: solid black 1px;
}

#main-game .block {
    background-color: grey;
    border: solid grey 1px;
}

#main-game * {
    margin: 0px;
}

~~~

Note: You can change #main-game to anything else. To update this in the js change 'main-game' in `main.js`.

Similarly you can add a window to display the next block by adding: `<div id='next-window'></div>`
and adding: 

~~~
#next-window li {
    width: 30px;
    height: 30px;
    border: solid grey 1px;
    display: table-cell;
    opacity: 0.85;
    /*transform: rotate(7deg);*/
}

#next-window ul {
    list-style-type: none;
    padding: 0px;
}

#next-window .background {
    background-color: black;
    border: solid darkgrey 1px;
    opacity: 0;
}

#next-window .terrain {
    background-color: black;
    border: solid black 1px;
}

#next-window .block {
    background-color: grey;
    border: solid grey 1px;
}

#next-window * {
    margin: 0px;
}
~~~
to the stylesheet. 