$(document).ready(function() {
    $('.alert').hide();
});

function loadResult() {
    var question1 = getRadioValue('options');
    var question2 = getRadioValue('options2');
    var question3 = getRadioValue('options3');
    var question4 = getRadioValue('options4');
    var question5 = getRadioValue('options5');
    var question6 = getRadioValue('options6');
    var question7 = getRadioValue('options7');
    var question8 = getRadioValue('options8');

    if (question1 == null || question2 == null ||
        question3 == null || question4 == null ||
        question5 == null || question6 == null ||
        question7 == null || question8 == null) {
        $('.alert').show();
        return;
    }
    $('.alert').hide();

    getJSON('dogs.json', function(err, data) {
        if (err !== null) {
            console.log('Error' + err);
        } else {
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pergunta1 == question1) {
                        data[i].valor += 2;
                    }
                    if (data[i].pergunta2 == question2) {
                        data[i].valor += 1;
                    }
                    if (data[i].pergunta3 == question3) {
                        data[i].valor += 1;
                    }
                    if (data[i].pergunta4.includes(question4)) {
                        data[i].valor += 2;
                    }
                    if (data[i].pergunta5 == question5) {
                        data[i].valor += 1;
                    }
                    if (data[i].pergunta6 == question6) {
                        data[i].valor += 1;
                    }
                    if (data[i].pergunta7 == question7) {
                        data[i].valor += 1;
                    }
                    if (data[i].pergunta8 == question8) {
                        data[i].valor += 1;
                    }
                }

                var dog = { "name": '', "value": 0, "image": '', "text": '' };
                for (var j = 0; j < data.length; j++) {
                    if (j == 0) {
                        dog.name = data[j].raca;
                        dog.value = data[j].valor;
                        dog.image = data[j].imagem;
                        dog.text = data[j].descricao;
                    } else {
                        console.log(data[j].raca + ' / ' + data[j].valor);
                        if (data[j].valor > dog.value || (data[j].valor == dog.value && data[j].pergunta4.includes(question4))) {
                            dog.name = data[j].raca;
                            dog.value = data[j].valor;
                            dog.image = data[j].imagem;
                            dog.text = data[j].descricao;
                        }
                    }
                }
                console.log(dog);
                document.getElementById('modalTitle').innerHTML = dog.name;
                document.getElementById('modalImage').src = dog.image;
                document.getElementById('modalText').innerHTML = dog.text;
                $('#myModalCenter').modal();
            }
            console.log(data);
        }
    });
}

function getRadioValue(name) {
    var rads = document.getElementsByName(name);
    for (var i = 0; i < rads.length; i++) {
        if (rads[i].checked) {
            return rads[i].value;
        }

    }
    return null;
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function reload() {
    document.location.reload(true);
}