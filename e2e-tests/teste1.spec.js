describe("teste1", function () {

    beforeEach(function () {
        browser.get("http://localhost:8000/#!/view1");
    });

    it("Deve salvar um aluno", function () {

        element(by.id("btnNovoAluno")).click();
        /*element(by.id("inputNome")).sendKeys("Teste 3");
        element(by.id("inputCpf")).sendKeys("57681293086");
        element(by.id("inputIdade")).sendKeys("12");*/
        inserirDadosAlunos("Teste 3", "12", "57681293086", "4798528", "05/02/1991");
        var btnSalvar = element(by.id("btnSalvarAluno"));
        if (btnSalvar.isPresent()) {
            console.log("btnSalvar esta presente");
            btnSalvar.click().then(function () {
                element(by.className("message")).getText().then(function (message) {
                    expect(message).toEqual("Aluno cadastrado");
                });
            });
            var alunosList = element.all(by.repeater('aluno in alunos'));
            expect(alunosList.count()).toEqual(1);
        }
    });

    it("Deve atualizar um aluno", function () {
        element(by.binding("aluno.id")).getText().then(function (alunoId) {
            console.log("ID: " + alunoId);
            element(by.id("btnEditarAluno_" + alunoId)).click().then(function () {
                var inputNome = element(by.id("inputNome"));
                inputNome.clear();
                inputNome.sendKeys("Teste 3 - atualizado");
                element(by.id("btnAtualizarAluno")).click().then(function () {
                    var messageElement = element(by.className("message"));
                    if (messageElement.isPresent()) {
                        messageElement.getText().then(function (message) {
                            expect(message).toEqual("Aluno Atualizado");
                        });
                    }
                });
                var alunosList = element.all(by.repeater('aluno in alunos'));
                expect(alunosList.count()).toEqual(1);
            });
        });
    });

    it("Deve remover um aluno", function () {
        element(by.binding("aluno.id")).getText().then(function (alunoId) {
            console.log("ID: " + alunoId);
            element(by.id("btnRemoverAluno_" + alunoId)).click().then(function () {
                element(by.className("message")).getText().then(function (message) {
                    expect(message).toEqual("Aluno Removido");
                });
            });
            var alunosList = element.all(by.repeater('aluno in alunos'));
            expect(alunosList.count()).toEqual(0);
        });
    });

    it("Deve mostrar mensagem de Erro CPF já cadastrado", function () {
        var btnNovo = element(by.id("btnNovoAluno"));
        btnNovo.click();
        inserirDadosAlunos("Teste 2", "15", "57681293086", undefined, undefined);
        var btnSalvar = element(by.id("btnSalvarAluno"));
        btnSalvar.click();

        btnNovo.click();
        inserirDadosAlunos("Teste com CPF repetido", undefined, "57681293086", undefined, undefined);
        btnSalvar.click().then(function () {
            element(by.className("message")).getText().then(function (message) {
                expect(message).toEqual("Operação não permitida - CPF já cadastrado");
            });
        });
        removerPrimeiro();
    });

    it("Deve mostrar mensagem de Erro Matrícula já cadastrada", function () {
        var btnNovo = element(by.id("btnNovoAluno"));
        btnNovo.click();
        inserirDadosAlunos("Teste 2", "12", undefined, "123456", undefined);
        var btnSalvar = element(by.id("btnSalvarAluno"));
        btnSalvar.click();

        btnNovo.click();
        inserirDadosAlunos("Teste com Matrícula repetida", undefined,undefined, "123456", undefined);
        btnSalvar.click().then(function () {
            element(by.className("message")).getText().then(function (message) {
                expect(message).toEqual("Operação não permitida - Matrícula já cadastrada");
            });
        });
        removerPrimeiro();
    });

    it("Deve validar os campos salvos na pagina de detalhes", function () {
        element(by.id("btnNovoAluno")).click();
        inserirDadosAlunos("Teste", "12", "33790030007", "789456123", "05/02/1991");
        element(by.id("btnSalvarAluno")).click().then(function () {
            element(by.binding("aluno.id")).getText().then(function (alunoId) {
                element(by.id("btnDetalhesAluno_" + alunoId)).click();
                element(by.id("textDetalheAlunoIdNome")).getText().then(function (txtIdNome) {
                    expect(txtIdNome).toEqual(alunoId + " - " + "Teste");
                });
                element(by.id("textDetalheAlunoIdade")).getText().then(function (txtIdade) {
                    expect(txtIdade).toEqual("Idade: 12");
                });
                element(by.id("textDetalheAlunoCpf")).getText().then(function (txtCpf) {
                    expect(txtCpf).toEqual("CPF: 33790030007");
                });
                element(by.id("textDetalheAlunoMatricula")).getText().then(function (txtMatricula) {
                    expect(txtMatricula).toEqual("Matrícula: 789456123");
                });
                element(by.id("textDetalheAlunoDataNascimento")).getText().then(function (txtDtNasc) {
                    expect(txtDtNasc).toEqual("Data Nasci.: 05/02/1991");
                });
            });
        });
    });

    function inserirDadosAlunos(nome, idade, cpf, matricula, dtNasc) {
        if (nome != undefined) {
            var inputNome = element(by.id("inputNome"));
            inputNome.clear();
            inputNome.sendKeys(nome);
        }
        if (idade != undefined) {
            var inputIdade = element(by.id("inputIdade"));
            inputIdade.clear();
            inputIdade.sendKeys(idade);
        }
        if (cpf != undefined) {
            var inputCPF = element(by.id("inputCpf"));
            inputCPF.clear();
            inputCPF.sendKeys(cpf);
        }
        if (matricula != undefined) {
            var inputMatricula = element(by.id("inputMatricula"));
            inputMatricula.clear();
            inputMatricula.sendKeys(matricula);
        }
        if (dtNasc != undefined) {
            var inputDtNasc = element(by.id("inputDataNascimento"));
            inputDtNasc.clear();
            inputDtNasc.sendKeys(dtNasc);
        }
    }

    function removerPrimeiro() {
        element(by.binding("aluno.id")).getText().then(function (alunoId) {
            element(by.id("btnRemoverAluno_" + alunoId)).click();
        });
    }

});