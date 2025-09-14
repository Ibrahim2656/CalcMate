$(document).ready(function(){
    let display=$("#display");
    let history=$("#history");
    let historylist=[];
    
    //button clicks
    $("#toggleTheme").on('click',function(){
        $("body").toggleClass("light-mode")
    })
    $(".btn").not(".equals,.clear,.back").on('click',function(){
        display.val(display.val()+$(this).text());
    });

    $(".clear").on('click',function(){
        display.val("");
    });

    $(".back").on("click",function(){
        display.val(display.val().slice(0,-1));
    });

    $(".equals").on("click",function(){
        calculate();
    });

    // support and restrict errors
    $(document).on("keydown",function(e){
        const allowedKeys="0123456789+-*/.";
        if(allowedKeys.includes(e.key)) display.val(display.val()+e.key())
        else if(e.key=="Enter") calculate();
        else if(e.key=="Backspace") display.val(display.val().slice(0,-1));
        else if(e.key.tolowerCase()==='c')display.val("")
    });

    // Calc function
    function calculate(){
        let expr=display.val();
        //base case
        if(!expr)return;

        try{
            let res=eval(expr);
            display.val(res);
            historylist.unshift(`${expr}=${res}`);
            if(historylist.length>5){
                historylist.pop();
            }
            history.html(historylist.join('<br>'));

        }
        catch(e){
            display.val("error")
        }
    }
    display.on("input",function(){
        this.scrollLeft=this.scrollWidth
    })


});