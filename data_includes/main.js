PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff();

var progressBarText = "progresso";

var sendingResultsMessage = "Aguarde enquanto salvamos suas respostas. Isso pode levar alguns segundos. Por favor, não feche a janela ainda.";

Sequence("preload", "praticaSentences", 
         "send");

// carregar imagens

CheckPreloaded("preload");

// Código para tarefa com imagens

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
                    .size(400,400)
                    ,
                    newImage("image2", row.imagemB)
                    .size(400,400)
                    ,
                    newCanvas("ladaAlado", 450, 250)
                    .add(0, 0, getImage("image1"))
                    .add(400, 0, getImage("image2"))
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
                    )))
;

SendResults("send");


