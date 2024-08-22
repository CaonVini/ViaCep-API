document.addEventListener('DOMContentLoaded', () => {
    const buscarBtn = document.getElementById('buscar-btn');
    const cepInput = document.getElementById('cep');
    const rua = document.getElementById('logradouro');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');
    const enderecos = document.getElementsByClassName('enderecos');

    buscarBtn.addEventListener('click', async () => {
        try {
            const cepValid = /^[0-9]{8}$/;

            if (!cepValid.test(cepInput.value)) {
                throw new Error("O CEP não é válido. Deve conter apenas números e ter exatamente 8 dígitos.");
            }

            const response = await fetch(`https://viacep.com.br/ws/${cepInput.value}/json/`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar o CEP: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.erro) {
                throw new Error("CEP não encontrado.");
            }

            if (enderecos.length > 0) {
                enderecos[0].style.display = 'flex';
            }

            cidade.textContent = `Cidade: ${data.localidade}`;
            estado.textContent = `Estado: ${data.uf}`;
            bairro.textContent = `Bairro: ${data.bairro}`;
            rua.textContent = `Rua: ${data.logradouro}`;

            console.log(data); 

        } catch (error) {
            console.error("Erro:", error.message);
            alert(error.message);
        }
    });
});
