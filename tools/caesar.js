function decipher() {
    var text = document.getElementById("inputtext").value.toLowerCase();

    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var alphabetSplit = alphabet.split("");

    var results = [];
    for (let offset = 1; offset < 26; offset++) {
        var comboSplit = [];
        for (let ind = 0; ind < text.length; ind++) {
            var currentChar = text[ind]

            if (alphabet.includes(currentChar)) {
                var newIndex = alphabet.indexOf(currentChar) + offset
                if (newIndex >= 26) { newIndex -= 26 }

                comboSplit.push(alphabet[newIndex]);
            } else {
                comboSplit.push(currentChar)
            }
        }

        results.push(comboSplit.join(""))
    }

    var allWords = "";
    var rawFile = new XMLHttpRequest();
    // words list from http://www.mieliestronk.com/corncob_lowercase.txt
    rawFile.open("GET", "https://www.act25.com/tools/corncob_lowercase.txt", false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                allWords = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);

    var greatestCount = -1;
    var greatestIndex = -1;
    for (let i = 0; i < results.length; i++) {
        var count = 0;
        var resultWords = results[i].split(" ");

        for (let w = 0; w < resultWords.length; w++) {
            if (allWords.includes(resultWords[w])) { count++ }
        }

        if (count > greatestCount) {
            greatestCount = count;
            greatestIndex = i;
        }
    }

    var output = "";
    if (greatestIndex > -1) {
        output += "Most likely result:\n\n"+results[greatestIndex];
        results.splice(greatestIndex, 1);
    } else {
        output += "No likely result could be found.";
    }

    for (let r = 0; r < results.length; r++) {
        output += "\n\n" + results[r];
    }

    document.getElementById("output_txt").value = output;

    if (document.getElementById("toggle_clear").checked) {
        clearbox();
    }
}

function clearbox() {
    document.getElementById("inputtext").value = "";
}