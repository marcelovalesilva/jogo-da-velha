var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['a'][3] = 0;



$(document).ready( function(){

	$('#tabuleiro').hide();
	
	$('#iniciar-jogo').click( function(){
		//valida se os campos de inserir o nome dos jogadores estão preenchidos
		if($('#nome-jogador1').val() == ''){
			alert('Apelido do jogador 1 não foi inserido');
			return false;
		}

		if($('#nome-jogador2').val() == ''){
			alert('Apelido do jogador 2 não foi inserido');
			return false;
		}

		//exibe os apelidos dos jogadores no tabuleiro
		$('#apelido-jogador1').html($('#nome-jogador1').val());
		$('#apelido-jogador2').html($('#nome-jogador2').val());

		//exibe o tabuleiro e oculta os campos para inserir os nomes.
		$('#inserir-nomes').hide();
		$('#tabuleiro').show();
	});

	$('.jogada').click( function(){
		var id_campo_clicado = this.id;

		//impede que um campo já marcado no tabuleiro seja marcado novamente.
		$('#'+id_campo_clicado).off();

		//chama a função jogada passando o id refente a tag correspondente a class jogada que foi clicada.
		jogada(id_campo_clicado);
	});

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if((rodada % 2) == 1){
			icone = 'url("imagens/marcador_1.png")';
			ponto = -1;
		}else{
			icone = 'url("imagens/marcador_2.png")';
			ponto = 1;
		}

		//aplica a imagem na tag através da função 'css'
		$('#'+id).css('background-image', icone);

		rodada++;

		//divide o valor do id, separando pelo '-'.
		var linha_coluna = id.split('-');

		//coloca os caracteres que compôem o id dentro da 1ª posição da matriz
		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		console.log(matriz_jogo);

		//função que verifica se a combinação define o ganhador.
		verifica_combinacao();

	}

	function verifica_combinacao(){
		//verifica na horizontal
		var pontos = 0;
		for(i = 1; i <= 3 ; i++){
			pontos = pontos + matriz_jogo['a'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for(i = 1; i <= 3 ; i++){
			pontos = pontos + matriz_jogo['b'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for(i = 1; i <= 3 ; i++){
			pontos = pontos + matriz_jogo['c'][i];
		}
		ganhador(pontos);

		//verifica na vertical
		for(x = 1; x <= 3; x++){
			pontos = 0;
			pontos += matriz_jogo['a'][x];
			pontos += matriz_jogo['b'][x];
			pontos += matriz_jogo['c'][x];

			ganhador(pontos);
		}

		//verifica na diagonal
		pontos = 0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);
	}

	//verifica se a soma de pontos define o jogador como vencedor
	function ganhador(pontos){
		if(pontos == -3){
			var jogada_1 = $('#nome-jogador1').val();
			alert(jogada_1 +' é o vencedor');

			$('.jogada').off();

		}else if(pontos == 3){
			var fogada_2 = $('#nome-jogador2').val();
			alert(jogada_2 +' é o vencedor');			
			
			$('.jogada').off();
		}
	}
});