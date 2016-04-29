/*

In this file, comments are used to identify different parts of the code by letter.
The Sporclone Instructions file will refer to letters when describing the sequence of
steps necessary to create a working Sporclone game. Complete the project according
to the order of the NUMBERED instructions, not the order of the letters.

DO NOT DELETE THE LETTER COMMENTS AFTER YOU COMPLETE STEPS!!!!!

*/


// global vars (Do not edit!)
var correct;
var total;
var is_guessed;
var timer;
var time_remaining;
var playing;


/**
 * Sets initial game state. 
 */
function setup()
{
    correct = 0;
    total = answers.length;

    is_guessed = new Array(answers.length);
    for (var i=0; i<is_guessed.length; i++)
    {
        is_guessed[i] = false;
    }

    time_remaining = time_limit;
    playing = false;

    document.getElementById('score').innerHTML = correct + "/" + total;

    // o. 
    document.getElementById('time').innerHTML = formatTime(time_remaining);
}


/**
 * Starts the game and focus cursor in input field.
 */
function start()
{
    if (!playing)
    {
        playing = true;
        document.getElementById('start').value = "Give Up";
        document.getElementById('start').onclick = function() { end() };


        // p. 
        timer = setInterval(tick, 1000);
    
        // q. 
        document.getElementById('time').style.color = "green";

        // r. 
        document.getElementById('guess').focus();

    }
}


/**
 * Decreases seconds by one and updates time display. Ends game when time runs out.
 */
function tick()
{
    // s. 
    document.getElementById('time').innerHTML = formatTime(time_remaining);

    console.log(time_remaining);
    // t.
    if (time_remaining < 1)
    {
        end();
    }
    else if(time_remaining <= 10)
    {
        document.getElementById('time').style.color = "orange";
    }

    // u.
    time_remaining = time_remaining - 1;


}


/**
 * Loops through answers array and compares current guess to each.
 * If correct answer is found, is_guessed is updated and answer is written
 * to appropriate HTML element. Guess is cleared.
 */
function check()
{
    if (playing)
    {
        var guess = document.getElementById('guess').value;
    
        for (var i=0; i<answers.length; i++)
        {
            if (!is_guessed[i])
            {
                var acceptable = answers[i].split('|');
                var preferred = acceptable[0];
    
                for (var j=0; j<acceptable.length; j++)
                {
                    if (isAlphanumericMatch(acceptable[j], guess))
                    {
                        var id = 'answer' + i;

                        document.getElementById(id).innerHTML = preferred;
                        document.getElementById(id).style.color = "green";
                        document.getElementById('guess').value = "";
        
                        is_guessed[i] = true;
        
                        // v.

                        correct = correct + 1;
                        // w. 
                        document.getElementById('score').innerHTML = correct + "/" + total;

    
                    }
                }
            }
        }
    
        if (correct == answers.length)
        {
            end();
        }
    }
}


/**
 * Shows all answers and highlights correct and incorrect answers different colors.
 */
function end()
{
    playing = false;
    clearInterval(timer);

    // x.
    document.getElementById('time').style.color = "red";

    for (var i=0; i<is_guessed.length; i++)
    {
        var id = 'answer' + i;

        
        var acceptable = answers[i].split('|');
        var preferred = acceptable[0];
        document.getElementById(id).innerHTML = preferred;

        // y.
        if (is_guessed[i]==true)
        {
            document.getElementById(id).style.color = "green";
        }
        else
        {
            document.getElementById(id).style.backgroundColor= "red";
        }

    }

}


/**
 * Creates a formatted time string.
 * 
 * @param {number} Time in seconds.
 * @return {string} Time in mM:SS form.
 */
function formatTime(seconds)
{
    var mm = Math.floor(seconds / 60);
    var ss = seconds % 60;

    if (ss<10)
    {
        ss = "0" + ss;
    }

    return mm + ":" + ss;
}


/**
 * Strips all non-alphanumeric characters from a string and converts to lowercase.
 *
 * @param {string} Any string
 * @returns {string} Strring with all non-alphanumeric characters removed.
 */
function convertToAlphanumericLowerCase(str)
{
    str = str.replace(/[^a-zA-Z0-9]+/g, '');

    // z.
    str = str.toLowerCase();

    return str;
}

function isAlphanumericMatch(str1, str2) {
    str1 = convertToAlphanumericLowerCase(str1);
    str2 = convertToAlphanumericLowerCase(str2);
    return str1 == str2;
}