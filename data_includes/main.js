PennController.ResetPrefix(null);

// DebugOff();

var progressBarText = "progresso";

var sendingResultsMessage = "Aguarde enquanto salvamos suas respostas. Isso pode levar alguns segundos. Por favor, não feche a janela ainda.";

// Sequencia

Sequence("counter", "preload_block",
"questionario", 
"instrucao1", 
"praticaSentences", 
"instrucao2", 
rshuffle("targetSentences", "fillerSentences"), 
"send", 
"telafinal");

// Codigo do participante

subjID = String.fromCharCode(65+Math.floor(Math.random() * 26)) + Math.floor((Math.random() * 200) + 1); //

SetCounter("counter", "inc", 1),

// Garantir o carregamento das imagens para poder iniciar o experimento

CheckPreloaded().label("preload_block");

// Questionario

newTrial("questionario",
         defaultText
         .print()
         .cssContainer({"font-size":"25px"})
         ,
         
         newText("idade", "<b> Olá! Para começar, diga, por favor, quantos anos você tem. Digite o número e, depois, clique em <i>OK</i> para prosseguir.</b>")
         .cssContainer({"margin-bottom":"1em"})
         ,
         
         newTextInput("idadeResposta", "")
         .cssContainer({"margin-bottom":"1em"})
         .css("font-size", "25px")
         .lines(0)
         .size(70, 30)
         .log()
         .print()
         ,
         
         newButton("botao1", "OK")
         .cssContainer({"margin-bottom":"3em"})
         .css("font-size", "20px")
         .print()
         .wait()
         )

.log("ParticipantID", subjID)
;

// Instrucao1

newTrial("instrucao1",
         defaultText
         .css("font-size", "25px")
         .print()
         ,
         newText("<b>Bem-vindo(a) ao experimento!</b>")
         .center()
         ,
         newText("<p>Caro(a) aluno(a),</p>")
         .cssContainer({"text-align":"justify"})
         ,
         newText("<p>A tarefa que você vai realizar é simples: você vai ler frases e responder questões sobre elas.</p>")
         .cssContainer({"text-align":"justify"})
         ,
         newText("<p>As frases que você vai ler estão divididas em segmentos: você vai ler uma palavra de cada vez. Para ler a frase completa, é necessário apertar a barra de espaço no teclado, pois assim você vai passar de um segmento a outro.</p>")
         .cssContainer({"text-align":"justify"})
         ,
         newText("<p>Após cada frase, vai aparecer na tela a questão “Qual imagem melhor representa a interpretação que você deu para a frase lida?” com duas imagens abaixo. Para responder, você deve clicar na imagem que melhor representa o que você entendeu ao ler a frase.</p>")
         .cssContainer({"text-align":"justify"})
         ,
         newText("<p>Após responder a questão, vai aparecer na tela o símbolo '+' e você deve apertar a barra de espaço para começar a ler a sentença seguinte.</p>")
         .cssContainer({"text-align":"justify"})
         ,
         newText("<p>Por fim, sugiro que você leia a frase em um ritmo natural, nem muito rápido, nem muito devagar.</p>")
         .cssContainer({"text-align":"justify"})
         ,
         newText("<p>Mas antes de passarmos para o experimento em si, vamos fazer uma prática para garantir que você compreendeu a tarefa, tudo bem?</p>")
         .cssContainer({"text-align":"justify"})
         ,
         newText("<p><i>Muito obrigada,</p></i>")
         .center()
         ,
         newText("<p><i>A pesquisadora.</p></i>")
         .center()
         ,
         newButton("Clique para ir para a prática")
         .cssContainer({"margin-top":"3em","margin-bottom":"6em"})
         .css("font-size", "20px")
         .center()
         .print()
         .wait()
)

.log("ParticipantID", subjID)
;

// Pratica

Template("pratica.csv", row =>
           newTrial("praticaSentences",
                    newController("DashedSentence", {
                      s: row.estimulo,
                      display: "in place",
                      blankText: "+"})
                    .css("font-size", "35px")
                    .cssContainer({"margin-top":"10em","margin-bottom":"10em"})
                    .center()    
                    .print()
                    .log()
                    .wait()
                    .remove()
                    ,
                    newText("perguntaPratica","Qual imagem é mais compatível com a sua interpretação para essa sentença?")
                    .css("font-size", "35px")
                    .cssContainer({"margin-top":"10em","margin-bottom":"5em"})
                    .center()
                    .print()
                    ,
                    newImage("image1", row.imagemA) 
                    .size(400, 400)
                    ,
                    newImage("image2", row.imagemB)
                    .size(400, 400)
                    ,
                    newCanvas("ladaAlado", 900, 450)
                    .add(0, 0, getImage("image1"))
                    .add(500, 0, getImage("image2"))
                    .center()
                    .print()
                    .log() 
                    ,
                    newSelector("respostaPratica")
                    .add(getImage("image1"), getImage("image2"))
                    .frame("solid 3px blue")
                    .log()
                    ,
                    newButton("botaoPratica", "Continuar")
                    .css("font-size", "20px")
                    .cssContainer({"margin-top":"3em","margin-bottom":"6em"})
                    .center()
                    .print()
                    .wait((getSelector("respostaPratica")
                           .test.selected()
                           .failure(newText("failure", "Por favor, selecione uma imagem antes de continuar.")
                                    .cssContainer({"margin-top": "1em", "color":"red"})
                                    .center()
                                    .print()
                           )
                    )
                    ))
      
         .log("ParticipantID", subjID)
         .log("grupo", row.group)
         .log("virgula", row.virgula)
         .log("tiposujeito", row.tiposujeito)
         .log("condicao", row.condicao)
         .log("item", row.item) 
         
)
;

// Instrucao2

newTrial("instrucao2",         
         defaultText
         .css("font-size", "25px")
         .print()
         ,
         newText("<b>Simples, não é?!</b>")
         .cssContainer({"margin-top":"10em","margin-bottom":"1em"})
         .center()
         .print()
         ,
         newText("<b>Agora sim, vamos começar o experimento!</b>")
         .cssContainer({"margin-top":"1em","margin-bottom":"10em"})
         .center()
         .print()
        ,
        newButton("Clique para começar.")
         .css("font-size", "20px")
         .cssContainer({"margin-top":"3em","margin-bottom":"6em"})
         .center()
         .print()
         .wait()
 ) 

.log("ParticipantID", subjID)
;

// Sentencas experimentais

Template("target.csv", row =>
           newTrial("targetSentences",
                    newController("DashedSentence", {
                      s: row.estimulo,
                      display: "in place",
                      blankText: "+"})
                    .css("font-size", "35px")
                    .cssContainer({"margin-top":"10em","margin-bottom":"10em"})
                    .center()    
                    .print()
                    .log()
                    .wait()
                    .remove()
                    ,
                    newText("perguntaTarget","Qual imagem é mais compatível com a sua interpretação para essa sentença?")
                    .css("font-size", "35px")
                    .cssContainer({"margin-top":"10em","margin-bottom":"5em"})
                    .center()
                    .print()
                    ,
                    newImage("image1", row.imagemA) 
                    .size(400, 400)
                    ,
                    newImage("image2", row.imagemB)
                    .size(400, 400)
                    ,
                    newCanvas("ladaAlado", 900, 450)
                    .add(0, 0, getImage("image1"))
                    .add(500, 0, getImage("image2"))
                    .center()
                    .print()
                    .log() 
                    ,
                    newSelector("respostaTarget")
                    .add(getImage("image1"), getImage("image2"))
                    .frame("solid 3px blue")
                    .log()
                    ,
                    newButton("botaoTarget", "Continuar")
                    .css("font-size", "20px")
                    .cssContainer({"margin-top":"3em","margin-bottom":"6em"})
                    .center()
                    .print()
                    .wait((getSelector("respostaTarget")
                           .test.selected()
                           .failure(newText("failure", "Por favor, selecione uma imagem antes de continuar.")
                                    .cssContainer({"margin-top": "1em", "color":"red"})
                                    .center()
                                    .print()
                           )
                    )
                    ))
                   
         
         .log("ParticipantID", subjID)
         .log("grupo", row.group)
         .log("virgula", row.virgula)
         .log("tiposujeito", row.tiposujeito)
         .log("condicao", row.condicao)
         .log("item", row.item) 
    
)
;

// Sentencas distratoras

Template("filler.csv", row =>
           newTrial("fillerSentences",
                    newController("DashedSentence", {
                      s: row.estimulo,
                      display: "in place",
                      blankText: "+"})
                    .css("font-size", "35px")
                    .cssContainer({"margin-top":"10em","margin-bottom":"10em"})
                    .center()    
                    .print()
                    .log()
                    .wait()
                    .remove()
                    ,
                    newText("perguntaFiller","Qual imagem é mais compatível com a sua interpretação para essa sentença?")
                    .css("font-size", "35px")
                    .cssContainer({"margin-top":"10em","margin-bottom":"5em"})
                    .center()
                    .print()
                    ,
                    newImage("image1", row.imagemA) 
                    .size(400, 400)
                    ,
                    newImage("image2", row.imagemB)
                    .size(400, 400)
                    ,
                    newCanvas("ladaAlado", 900, 450)
                    .add(0, 0, getImage("image1"))
                    .add(500, 0, getImage("image2"))
                    .center()
                    .print()
                    .log() 
                    ,
                    newSelector("respostaFiller")
                    .add(getImage("image1"), getImage("image2"))
                    .frame("solid 3px blue")
                    .log()
                    ,
                    newButton("botaoFiller", "Continuar")
                    .css("font-size", "20px")
                    .cssContainer({"margin-top":"3em","margin-bottom":"6em"})
                    .center()
                    .print()
                    .wait((getSelector("respostaFiller")
                           .test.selected()
                           .failure(newText("failure", "Por favor, selecione uma imagem antes de continuar.")
                                    .cssContainer({"margin-top": "1em", "color":"red"})
                                    .center()
                                    .print()
                           )
                    )
                    ))
         
         .log("ParticipantID", subjID)
         .log("grupo", row.group)
         .log("virgula", row.virgula)
         .log("tiposujeito", row.tiposujeito)
         .log("condicao", row.condicao)
         .log("item", row.item) 
         
)

;

// Enviar os dados 

SendResults("send"); 

// Tela final

newTrial("telafinal" ,
         defaultText
         .cssContainer({"font-size":"25px"})
         ,
         
         newText("<p> Obrigada por sua participação! </p>")
         .center()
         .print()
         ,
         newText("<p><b>O seu código de participante é: </b></p>")
         .center()
         .print()
        ,
          newText(subjID)
         .center()
         .print()
         ,
         newText("<p><b> Por favor, guarde esse código para o caso de precisarmos identificar os seus dados. </b></p>")
         .center()
         .print()
         ,   
         
         newText("<p> Você já pode fechar a janela. </p>")
         .center()
         .print()
         ,
         newText("<p><i>A pesquisadora.</p></i>")
         .center()
         .print()
         ,        
         // Stay on this page forever
         newButton().wait()
);
