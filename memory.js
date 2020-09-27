//globale Variablen
let pairs = 0;
let win = 0;
let amount = 0;
let first = "eins";
let second = "zwei";
let check = false;


$(document).ready(function () {

    // lesen des Buttons
    $("#start").click( function (e) {
        let name = $("#menu input[name='size']:checked" ).val();
        amount = 0;
        pairs = 0;
        win = 0;

        // anlegen der Bords mit der gewünschten Größe
        if (name == "small"){
            $("#memoryField").css({
                "width" : "400px",
            });
            pairs = 8;
            buildBoard(16);
        }
        if(name == "medium"){
            $("#memoryField").css({
                "width" : "400px",
            });
            pairs = 12;
            buildBoard(24);        }

        if(name == "big"){
            $("#memoryField").css({
                "width" : "500px",
            });
            pairs = 18;
            buildBoard(36);
        }
    })

});

function buildBoard(cards){

    // Div leeren
    $("#memoryField").empty();

    //vorgegebener Teil
    var arr = new Array();
    for (var i=0; i<cards; i++){
        arr.push(i);
        $("#memoryField").append("<div class = 'karte'><img width='75'src='' id='i" + i + "' /></div>");
    }
    var r;
    for (var i=0; i<(cards/2); i++){
        r = getRandom(0, arr.length-1);
        $("#memoryField div #i" + arr[r]).attr(
            "src", "imgs/img_" + i + ".jpg");
        arr.splice(r, 1); //deletes the element on index r
        r = getRandom(0, arr.length-1);
        $("#memoryField div #i" + arr[r]).attr(
            "src", "imgs/img_" + i + ".jpg");
        arr.splice(r, 1);
    }

    // hide the Elements
    $(".karte img").hide();


    // Klicks
    $(".karte").click(function(e){
        let img = $(this).children();
        img.fadeIn();

        if(check){
            console.log("hi");
            $(`#${first}`).hide();
            $(`#${second}`).hide();
            first = "eins";
            second = "zwei";
            check = false;
        }

        if (first == "eins"){
            first = img.attr("id");
        }
        else if(second == "zwei"){
            amount ++;
            second = img.attr("id");

            if (first == second){
                console.log("Klick auf die gleiche Karte");
                amount--;
                second = "eins";
            }
            else if($(`#${first}`).attr("src") == $(`#${second}`).attr("src")){

                $(`#${first}`).parent().addClass("back");
                $(`#${second}`).parent().addClass("back");

                $(`#${first}`).parent().unbind();
                $(`#${second}`).parent().unbind();
                win++;

                window.setTimeout(function(){
                    $(`#${first}`).fadeOut();
                    $(`#${second}`).fadeOut();
                    first = "eins";
                    second = "zwei";

                    if (win == pairs){
                        alert(`Herzlichen Glückwunsch Sie haben gewonnen. Benötigte Versuche: ${amount} `);
                    }

                }, 1000);

            }
            else{
                check = true;
            }

        }
    })

}



function getRandom(min, max){
    if (min > max)
        return -1;
    if (min == max)
        return min;
    return min + parseInt(Math.random() * (max-min+1));
}
