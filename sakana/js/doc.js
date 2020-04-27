//文章管理

const input = document.getElementById("input");

input.addEventListener('input', updateValue);

function updateValue() {
    var inp = document.getElementById("input");
    var oup = document.getElementById('output');

    var fi = document.getElementById("_0");
    if (fi==null){
        console.log(inp)
        console.log(inp.innerHTML)
        inp.innerHTML = '<p><a id="_0">'+"#"+title_name+'</a></p>';
    }else{
        fi.innerHTML = "#"+title_name;
    }

    var ouptxt = '';
    
    var hc = inp.getElementsByTagName("p");
    hc = Array.prototype.slice.call(hc);

    for ( var i = 0; i < hc.length; i++ ) {
        var v = hc[i]

        if(v.getElementsByTagName("a").length == 0){
            var myA = document.createElement("a");
            myA.innerHTML = v.innerHTML;
            v.innerHTML = myA.outerHTML;
        }

        var w = v.getElementsByTagName("a")[0]

        w.setAttribute('id', '_'+String(i));

        var item = w.innerHTML


        if ( item == '' || item.search("^#")==-1) {
            v.setAttribute('class', '');
            continue;

        }
        else if(item.search("^##") == -1){
            v.setAttribute('class', 'hash1');
            ouptxt += '<li type="disc" class="side_main"><a href="' + '#_'+ String(i) + '">'+ item.slice(1,)+'</a></li>';
            
        }
        else{
            v.setAttribute('class', 'hash2');
            ouptxt += '<li type="disc" class="side_sub"><a href="' + '#_'+ String(i) + '">' + item.slice(2,)+'</a></li>';

        };

    }

    oup.innerHTML = ouptxt;    

}