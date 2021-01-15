let cursorIndex;

document.getElementById('lyrics').addEventListener('keydown', e => {
    console.log('Caret at: ', e.target.selectionStart);
    cursorIndex = e.target.selectionStart;
  });

var lyrics = document.getElementById("lyrics");
lyrics.addEventListener("keydown", function (e) {
    if (e.keyCode == 13){
        getRhymes();
    }
});

function getRhymes(){
    // alert(last(lyrics.value));
    document.getElementById("rhymes").innerHTML = "";
    var words = lyrics.value.substring(0, cursorIndex);
    var word = last(words);
    var url = buildURL(word);
    fetch(url)
        .then(response => response.json())
        .then(response => {
            for (res in response){
                document.getElementById("rhymes").innerHTML += ('<p>' + response[res]['word'] + "</p>");
            }
        })

}

function last(words) {
    var n = words.split(" ");
    return n[n.length - 1];
}

function buildURL(word){
    return ("https://rhymebrain.com/talk?function=getRhymes" +
        "&word=" + encodeURIComponent(word));
}

