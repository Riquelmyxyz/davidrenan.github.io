function formatarCPF(campo) {
    campo.value = campo.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (campo.value.length > 3) {
        campo.value = campo.value.replace(/^(\d{3})(\d{0,3})(\d{0,3})(\d{0,2}).*/, '$1.$2.$3-$4'); // Formata o CPF
    } else if (campo.value.length > 0) {
        campo.value = campo.value.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2}).*/, '$1.$2.$3-$4'); // Formata o CPF
    }
}

function validarCPF() {
    var cpf = document.getElementById('cpf').value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        document.getElementById('resultado').innerText = 'CPF inválido';
        document.getElementById('resultado').classList.remove('text-success'); // Remove a classe de texto verde
        return;
    }

    // Verifica se todos os dígitos são iguais, o que torna o CPF inválido
    if (/^(\d)\1+$/.test(cpf)) {
        document.getElementById('resultado').innerText = 'CPF inválido';
        document.getElementById('resultado').classList.remove('text-success'); // Remove a classe de texto verde
        return;
    }

    // Validação do primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = 11 - (soma % 11);
    var digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador1 != cpf.charAt(9)) {
        document.getElementById('resultado').innerText = 'CPF inválido';
        document.getElementById('resultado').classList.remove('text-success'); // Remove a classe de texto verde
        return;
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    var digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador2 != cpf.charAt(10)) {
        document.getElementById('resultado').innerText = 'CPF inválido';
        document.getElementById('resultado').classList.remove('text-success'); // Remove a classe de texto verde
        return;
    }

    // Se passou por todas as validações, o CPF é válido
    document.getElementById('resultado').innerText = 'CPF válido';
    document.getElementById('resultado').classList.add('text-success'); // Adiciona a classe de texto verde
}
