var verFal = true;
var numAleatorioInicio, pit1, pit2, pit3, gold, monster, hero, estadoAtual, estadoFuturo, estado='0';
var estadoAnterior,heroGold=0;countWalk=0;ganharJogo=false; temp="";

function iniciarJogo(){
  if (verFal == true ){
    numAleatorioInicio = Math.floor(Math.random() * 16);
    console.log("Inicio: " + numAleatorioInicio);
    if (numAleatorioInicio != '5' && numAleatorioInicio != '6' && 
        numAleatorioInicio != '9' && numAleatorioInicio != '10'){          
          document.getElementById(numAleatorioInicio).innerHTML = "Entrada";
          hero = numAleatorioInicio;
          startTheGame();
    }  
      else{
        iniciarJogo();                  
      }        
        verFal = false;              
  }
    else {alert("O jogo já foi iniciado")
    }
} 

function startTheGame(){
  geraMonster();
  geraGold();
  geraPit1(); geraPit2(); geraPit3();
  geraVerEntradaPit();
  geraFedor();
  geraBreeze();
  heroStart();
  //moverHeroi();
  mundoInterno();
  verificaMundo();
}

function heroStart(){
  estado = document.getElementById(numAleatorioInicio).innerText;
  console.log("hero: ", hero, "\n estado: ", estado);
  if(hero == 0 || hero == 1 || hero == 2 || hero == 3){
    return document.getElementById(hero).innerHTML = "v";
  }
  document.getElementById(numAleatorioInicio).innerHTML = "Entrada";
  if(hero == 12 || hero == 13 || hero == 14 || hero == 15){
    return document.getElementById(hero).innerHTML = "^"
  }
  document.getElementById(numAleatorioInicio).innerHTML = "Entrada";
  if (hero == 4 || hero == 8){
    return document.getElementById(hero).innerHTML = ">";
  }
  document.getElementById(numAleatorioInicio).innerHTML = "Entrada";
  if(hero == 7 || hero == 11){
    return document.getElementById(hero).innerHTML = "<";
  }
  document.getElementById(numAleatorioInicio).innerHTML = "Entrada";
  
}

function guardarEstado(guardar){
  estado = document.getElementById(guardar).innerText;
}

function seguirEmFrente(){
  countWalk -= 1;
  console.log("Pontos: ", countWalk);
  switch(document.getElementById(hero).innerText){
      case ">":
        if(hero == 3 || hero == 7 || hero == 11 || hero == 15){
          console.log("Bateu a testa na parede");
          document.getElementById(303).innerHTML = "|";
          document.getElementById(307).innerHTML = "|";
          document.getElementById(311).innerHTML = "|";
          document.getElementById(315).innerHTML = "|";
        }
          else{
            document.getElementById(hero).innerHTML = estado;
            hero += 1;
            guardarEstado(hero);
            document.getElementById(hero).innerHTML=">";
          }       
      break;

      case "v":
        if(hero == 12 || hero == 13 || hero == 14 || hero == 15){
          console.log("Bateu a testa na parede");
          document.getElementById(212).innerHTML = "_";
          document.getElementById(213).innerHTML = "_";
          document.getElementById(214).innerHTML = "_";
          document.getElementById(215).innerHTML = "_";
        }
          else{
            document.getElementById(hero).innerHTML = estado;
            hero += 4;
            guardarEstado(hero);
            document.getElementById(hero).innerHTML="v";
          }        
      break;

      case "<":
        if(hero == 0 || hero == 4 || hero == 8 || hero == 12){
          console.log("Bateu a testa na parede");
          document.getElementById(300).innerHTML = "|";
          document.getElementById(304).innerHTML = "|";
          document.getElementById(308).innerHTML = "|";
          document.getElementById(312).innerHTML = "|";
        }
          else{
            document.getElementById(hero).innerHTML = estado;
            hero -= 1;
            guardarEstado(hero);
            document.getElementById(hero).innerHTML="<";
            countWalk -= 1;
          }      
      break;

      case "^":
      if(hero == 0 || hero == 1 || hero == 2 || hero == 3){
        console.log("Bateu a testa na parede");
        document.getElementById(200).innerHTML = "_";
        document.getElementById(201).innerHTML = "_";
        document.getElementById(202).innerHTML = "_";
        document.getElementById(203).innerHTML = "_";
        countWalk -= 1;
      }
        else{
          document.getElementById(hero).innerHTML = estado;
          hero -= 4;
          guardarEstado(hero);
          document.getElementById(hero).innerHTML="^";
        }         
      break;
  }
  if(hero == monster || hero == pit1 || hero == pit2 || hero == pit3){
    countWalk -= 1000;
    console.log("Pontos: ", countWalk);
    alert("Você morreu");
    document.getElementById(hero).innerHTML = estado;
    hero = numAleatorioInicio;
    heroStart();
  }
  if(hero == gold){
    countWalk += 1000;
    console.log("Pontos: ", countWalk);
    alert("Você encontrou o tesouro!");
  }
  mundoInterno();
 // mostrarPontuacao();
}
/*
function moverHeroi(){
  //verificar primeiro sempre a casa da direita
  
}*/
/*
function verificarPosicaoSegura(){
  
}*/
/*
function custoAcao(posicaoHeroi){
  if(document.getElementById(heroi).innerText == ">"){

  }
}*/

function virarDireita(heroi){
  countWalk -= 1;
  console.log("Pontos: ", countWalk);
  if(document.getElementById(heroi).innerText == ">")
    return document.getElementById(heroi).innerHTML = "v";

  else if(document.getElementById(heroi).innerText == "v")
    return document.getElementById(heroi).innerHTML = "<"; 

  else if(document.getElementById(heroi).innerText == "<")
    return document.getElementById(heroi).innerHTML = "^"; 

  else if(document.getElementById(heroi).innerText == "^")
    return document.getElementById(heroi).innerHTML = ">";
    mostrarPontuacao()
}

function virarEsquerda(heroi){
  countWalk -= 1;
  console.log("Pontos: ", countWalk);
  if(document.getElementById(heroi).innerText == ">")
  return document.getElementById(heroi).innerHTML = "^";

else if(document.getElementById(heroi).innerText == "^")
  return document.getElementById(heroi).innerHTML = "<"; 

else if(document.getElementById(heroi).innerText == "<")
  return document.getElementById(heroi).innerHTML = "v"; 

else if(document.getElementById(heroi).innerText == "v")
  return document.getElementById(heroi).innerHTML = ">";
mostrarPontuacao()
}

function geraMonster(){
  monster = Math.floor(Math.random() * 16); 
  //console.log("M: " + monster);
    while(document.getElementById(monster).innerText === "Entrada"){
      monster = Math.floor(Math.random() * 16);
      //console.log("Gerou monstro em outro bloco: " + monster);
    }
    document.getElementById(monster).innerHTML="M";
    console.log("M: " + monster);
}
      // Switch Case
function geraFedor(){
  switch(monster){
    case 0:
      verificarfedor(monster + 1);
      verificarfedor(monster + 4);
    break;
        
    case 1:
      verificarfedor(monster - 1);
      verificarfedor(monster + 1);
      verificarfedor(monster + 4);
    break;

    case 2:
      verificarfedor(monster - 1);
      verificarfedor(monster + 1);
      verificarfedor(monster + 4);
    break;

    case 3:
      verificarfedor(monster - 1);
      verificarfedor(monster + 4);
    break;

    case 4:
      verificarfedor(monster + 1);
      verificarfedor(monster + 4);
      verificarfedor(monster - 4);
    break;

    case 5:
      verificarfedor(monster + 1);
      verificarfedor(monster - 1);
      verificarfedor(monster + 4);
      verificarfedor(monster - 4);
    break;

    case 6:
      verificarfedor(monster + 1);
      verificarfedor(monster - 1);
      verificarfedor(monster + 4);
      verificarfedor(monster - 4);
    break;

    case 7:
      verificarfedor(monster - 1);
      verificarfedor(monster + 4);
      verificarfedor(monster - 4);
    break;

    case 8:
      verificarfedor(monster + 1);
      verificarfedor(monster + 4);
      verificarfedor(monster - 4);
    break;

    case 9:
      verificarfedor(monster + 1);
      verificarfedor(monster - 1);
      verificarfedor(monster + 4);
      verificarfedor(monster - 4);
    break;

    case 10:
      verificarfedor(monster + 1);
      verificarfedor(monster - 1);
      verificarfedor(monster + 4);
      verificarfedor(monster - 4);
    break;

    case 11:
      verificarfedor(monster - 1);
      verificarfedor(monster + 4);
      verificarfedor(monster - 4);
    break;

    case 12:
      verificarfedor(monster + 1);
      verificarfedor(monster - 4);
    break;

    case 13:
      verificarfedor(monster - 1);
      verificarfedor(monster + 1);
      verificarfedor(monster - 4);
      break;

    case 14:
      verificarfedor(monster - 1);
      verificarfedor(monster + 1);
      verificarfedor(monster - 4);
    break;

    case 15:
      verificarfedor(monster - 1);
      verificarfedor(monster - 4);
    break;
  }
}

function geraGold(){
  gold = Math.floor(Math.random() * 16);
  //console.log("Gold: " + gold);
    while(document.getElementById(gold).innerText == "Entrada" ||
      document.getElementById(gold).innerText == "M"){
      gold = Math.floor(Math.random() * 16);
      //console.log("Gold mudou para : " + gold);
    }
      document.getElementById(gold).innerHTML="G";
      console.log("Gold: " + gold);
}

function geraPit1(){
  pit1 = Math.floor(Math.random() * 16);
   /* Compare pit1 */ 
  //console.log("P1: " + pit1);
  while(document.getElementById(pit1).innerText == "Entrada" ||
        document.getElementById(pit1).innerText == "M" ||
        document.getElementById(pit1).innerText == "G"){
    pit1 = Math.floor(Math.random() * 16);
    //console.log("Pit1 mudou para : " + pit1);
  }
  document.getElementById(pit1).innerHTML="P1";
  console.log("P1: " + pit1);

}

function geraPit2(){
  pit2 = Math.floor(Math.random() * 16);
  /* Compare pit2 */
  //console.log("P2: " + pit2);     
  while(document.getElementById(pit2).innerText == "Entrada" ||
        document.getElementById(pit2).innerText == "M" ||
        document.getElementById(pit2).innerText == "G" ||
        document.getElementById(pit2).innerText == "P1"){
          pit2 = Math.floor(Math.random() * 16);
          //console.log("Pit2 mudou para : " + pit2);
        }
  document.getElementById(pit2).innerHTML="P2";
  console.log("P2: " + pit2);
}

function geraPit3(){
  pit3 = Math.floor(Math.random() * 16);
  /* Compare pit3 */
  //console.log("P3: " + pit3);
  while(document.getElementById(pit3).innerText == "Entrada" ||
        document.getElementById(pit3).innerText == "M" ||
        document.getElementById(pit3).innerText == "G" ||
        document.getElementById(pit3).innerText == "P1" ||
        document.getElementById(pit3).innerText == "P2"){
          pit3 = Math.floor(Math.random() * 16);
          //console.log("Pit3 mudou para : " + pit3);
        }
  document.getElementById(pit3).innerHTML="P3";
  console.log("P3: " + pit3);  
}

function geraBreeze(){
  preencherBrisa(pit1);
  preencherBrisa(pit2);
  preencherBrisa(pit3);
}

function verificarfedor(teste){
  if(document.getElementById(teste).innerText === "P1"){
    //console.log("Teste se " + teste + " = P1");
    return document.getElementById(teste).innerHTML = "P1";
  }
  if(document.getElementById(teste).innerText === "P2"){
    //console.log("Teste se " + teste + " == P2");
    return document.getElementById(teste).innerHTML = "P2";
  }
  if(document.getElementById(teste).innerText === "P3"){
    //console.log("Teste se " + teste + "== P3");
    return document.getElementById(teste).innerHTML = "P3";
  }  
  if(document.getElementById(teste).innerText === "Entrada"){
    //console.log("Teste se " + teste + " == EntradaF");
    return document.getElementById(teste).innerHTML = "EntradaF";
  }
  if(document.getElementById(teste).innerText === "G"){
    //console.log("Teste se " + teste + " == Gold");
    return document.getElementById(teste).innerHTML = "Gf";
  }
  if(document.getElementById(teste).innerText === "~~"){
    //console.log("Teste se " + teste + " == ~~");
    return document.getElementById(teste).innerHTML = "f~~";
  }
  //console.log("Teste se " + teste + " == f");
  return document.getElementById(teste).innerHTML = "f"; 
}
    // Switch Case 
function preencherBrisa(nPit){
  switch(nPit){

    case 0:
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit + 4);
        break;
      
    case 1:
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit + 4);
        break;

    case 2:
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit + 4);
        break;

    case 3:
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 4);
        break;

    case 4:
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit + 4);
        verificarBrisa(nPit - 4);
        break;

    case 5:
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 4);
        verificarBrisa(nPit - 4);
        break;

    case 6:
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 4);
        verificarBrisa(nPit - 4);
        break;

    case 7:
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 4);
        verificarBrisa(nPit - 4);
        break;

    case 8:
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit + 4);
        verificarBrisa(nPit - 4);
        break;

    case 9:
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 4);
        verificarBrisa(nPit - 4);
        break;

    case 10:
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 4);
        verificarBrisa(nPit - 4);
        break;

    case 11:
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 4);
        verificarBrisa(nPit - 4);
        break;

    case 12:
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit - 4);
        break;

    case 13:
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit - 4);
        break;

    case 14:
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit + 1);
        verificarBrisa(nPit - 4);
        break;

    case 15:
        verificarBrisa(nPit - 1);
        verificarBrisa(nPit - 4);
        break;
 }
}
    // Condicional IF/Return
function verificarBrisa(teste1){

  if(document.getElementById(teste1).innerText === "M"){
    //console.log("teste1 se " + teste1 + " = M");
    return document.getElementById(teste1).innerHTML = "M";
  }
  if(document.getElementById(teste1).innerText === "P1"){
    //console.log("teste1 se " + teste1 + " = P1");
    return document.getElementById(teste1).innerHTML = "P1";
  }
  if(document.getElementById(teste1).innerText === "P2"){
    //console.log("teste1 se " + teste1 + " == P2");
    return document.getElementById(teste1).innerHTML = "P2";
  }
  if(document.getElementById(teste1).innerText === "P3"){
    //console.log("teste1 se " + teste1 + "== P3");
    return document.getElementById(teste1).innerHTML = "P3";
  }  
  if(document.getElementById(teste1).innerText === "Entrada"){
    //console.log("teste1 se " + teste1 + " == Entrada");
    return document.getElementById(teste1).innerHTML = "Entrada~~";    
    }
  if(document.getElementById(teste1).innerText === "EntradaF"){
    //console.log("teste1 se " + teste1 + " == Entrada");
    return document.getElementById(teste1).innerHTML = "EntradaF~~";
    }
    // G para G~~
  if(document.getElementById(teste1).innerText === "G"){

    return document.getElementById(teste1).innerHTML = "G~~";  
  }
  if(document.getElementById(gold).innerText === "~~"){

    return document.getElementById(gold).innerHTML = "G~~";  
  }
  if(document.getElementById(teste1).innerText === "Gf"){
    return document.getElementById(teste1).innerHTML = "Gf~~"; 
  } 
  if(document.getElementById(teste1).innerText === "f"){
    //console.log("teste1 se " + teste1 + " == Fedor");
    return document.getElementById(teste1).innerHTML = "f~~";  
  }
  return document.getElementById(teste1).innerHTML = "~~";
  
}

function reiniciarJogo(){

  location.reload();
}

function geraVerEntradaPit(){
  verificarEntPit(numAleatorioInicio);
}

function verificarEntPit(nEntrada){

  switch(nEntrada){

    case 0:
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada + 4);
        break;
      
    case 1:
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada + 4);
        break;

    case 2:
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada + 4);
        break;

    case 3:
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 4);
        break;

    case 4:
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada + 4);
        verificarEntradaPit(nEntrada - 4);
        break;

   case 5:
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 4);
        verificarEntradaPit(nEntrada - 4);
        break;

    case 6:
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 4);
        verificarEntradaPit(nEntrada - 4);
        break;

    case 7:
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 4);
        verificarEntradaPit(nEntrada - 4);
        break;

    case 8:
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada + 4);
        verificarEntradaPit(nEntrada - 4);
        break;

    case 9:
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 4);
        verificarEntradaPit(nEntrada - 4);
        break;

    case 10:
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 4);
        verificarEntradaPit(nEntrada - 4);
        break;

    case 11:
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 4);
        verificarEntradaPit(nEntrada - 4);
        break;

    case 12:
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada - 4);
        break;

    case 13:
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada - 4);
        break;

    case 14:
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada + 1);
        verificarEntradaPit(nEntrada - 4);
        break;

    case 15:
        verificarEntradaPit(nEntrada - 1);
        verificarEntradaPit(nEntrada - 4);
        break;

  }
}

function verificarEntradaPit(ePit){
  if(document.getElementById(ePit).innerText === "P1"){
    //console.log("EntradaTest1 " + ePit + " = P1");
    geraPit1(document.getElementById(pit1).innerHTML = "P1");
    return document.getElementById(ePit).innerHTML = ePit;
  }

  if(document.getElementById(ePit).innerText === "P2"){
    //console.log("EntradaTest2 " + ePit + " == P2");
    geraPit2(document.getElementById(pit2).innerHTML = "P2");
    return document.getElementById(ePit).innerHTML = ePit;
  }
  if(document.getElementById(ePit).innerText === "P3"){
    //console.log("EntradaTest3 se " + ePit + "== P3");
    geraPit3(document.getElementById(pit3).innerHTML = "P3");
    return document.getElementById(ePit).innerHTML = ePit;
  }    
 // console.log("teste1 se " + ePit + " == Entrada");
//  return document.getElementById(ePit).innerHTML = "Entrada"; 
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function mundoInterno(){
  switch(estado){
    case("Entrada"):
    console.log("Me sinto seguro aqui!");
      temp="S?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="ENT S";
      break;
    case("EntradaF"):
    console.log("Está fedido aqui!");
      temp="M?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="ENT F";
      break; 
    case("Entrada~~"):
    console.log("Senti uma brisa");
      temp="p?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="ENT b";
      break; 
    case("EntradaF~~"):
    console.log("Senti uma brisa");
    console.log("Está fedido aqui!");
      temp="pM?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="S";
      break;
    case("~~"):
      console.log("Senti uma brisa"); 
      temp="p?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="S";
      break;   
    case("f"):
    console.log("Está fedido aqui!");
      temp="M?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="S";
      break;
    case ("f~~"):
    console.log("Senti uma brisa");
    console.log("Está fedido aqui!");
      temp="pM?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="S";
      break; 
    case ("G"): 
      console.log("Percebi o brilho do tesouro");  
      temp="S?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="G";
      break;
    case ("G~~"):   
    console.log("Percebi o brilho do tesouro"); 
    console.log("Senti uma brisa");
      temp="p?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="G";
      break; 
    case ("Gf"):
    console.log("Percebi o brilho do tesouro");
    console.log("Está fedido aqui!");    
      temp="M?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="G";
      break;
    case ("Gf~~"):
    console.log("Percebi o brilho do tesouro");
    console.log("Está fedido aqui!");
    console.log("Senti uma brisa");   
      temp="pM?";
      descobrir(hero);
      document.getElementById(hero+100).innerHTML="G";
      break;     
    default:
      console.log("Me sinto seguro aqui!");
      document.getElementById(hero+100).innerHTML="S";
      temp="S?";
      descobrir(hero);
      break; 
  }
}


// Switch Case 
function descobrir(nPit){
  
  switch(nPit){

    case 0:
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 200).innerText !== "S" && document.getElementById(nPit + 200).innerText !== "_") 
          document.getElementById(nPit + 200).innerHTML=temp;
        if((document.getElementById(nPit + 300).innerText !== "S") && (document.getElementById(nPit + 300).innerText !== "|")) 
          document.getElementById(nPit + 300).innerHTML=temp;
        break;
      
    case 1:
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if((document.getElementById(nPit + 200).innerText !== "S") && (document.getElementById(nPit + 200).innerText !== "_")) 
          document.getElementById(nPit + 200).innerHTML=temp;
        break;

    case 2:
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if((document.getElementById(nPit + 200).innerText !== "S") && (document.getElementById(nPit + 200).innerText !== "_"))
          document.getElementById(nPit + 200).innerHTML=temp;
        break;

    case 3:
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if((document.getElementById(nPit + 200).innerText !== "S") && (document.getElementById(nPit + 200).innerText !== "_")) 
          document.getElementById(nPit + 200).innerHTML=temp;
        if((document.getElementById(nPit + 300).innerText !== "S") && (document.getElementById(nPit + 300).innerText !== "|"))
          document.getElementById(nPit + 300).innerHTML=temp;
        break;

    case 4:
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        if((document.getElementById(nPit + 300).innerText !== "S") && (document.getElementById(nPit + 300).innerText !== "|"))
          document.getElementById(nPit + 300).innerHTML=temp;
        break;

    case 5:
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        break;

    case 6:
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        break;

    case 7:
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        if((document.getElementById(nPit + 300).innerText !== "S") && (document.getElementById(nPit + 300).innerText !== "|"))
          document.getElementById(nPit + 300).innerHTML=temp;
        break;

    case 8:
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        if((document.getElementById(nPit + 300).innerText !== "S") && (document.getElementById(nPit + 300).innerText !== "|")) 
          document.getElementById(nPit + 300).innerHTML=temp;
        break;

    case 9:
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        break;

    case 10:
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        break;

    case 11:
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 4 + 100).innerText !== "S") document.getElementById(nPit + 4 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 300).innerText !== "S" && document.getElementById(nPit + 300).innerText !== "|")
          document.getElementById(nPit + 300).innerHTML=temp;
        break;

    case 12:
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        if((document.getElementById(nPit + 200).innerText !== "S") && (document.getElementById(nPit + 200).innerText !== "_"))
          document.getElementById(nPit + 200).innerHTML=temp;
        if((document.getElementById(nPit + 300).innerText !== "S") && (document.getElementById(nPit + 300).innerText !== "|"))
          document.getElementById(nPit + 300).innerHTML=temp;
        break;

    case 13:
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        if((document.getElementById(nPit + 200).innerText !== "S") && (document.getElementById(nPit + 200).innerText !== "_"))
          document.getElementById(nPit + 200).innerHTML=temp;
        break;

    case 14:
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit + 1 + 100).innerText !== "S") document.getElementById(nPit + 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        if((document.getElementById(nPit + 200).innerText !== "S") && (document.getElementById(nPit + 200).innerText !== "_"))
          document.getElementById(nPit + 200).innerHTML=temp;
        break;

    case 15:
        if(document.getElementById(nPit - 1 + 100).innerText !== "S") document.getElementById(nPit - 1 + 100).innerHTML=temp;
        if(document.getElementById(nPit - 4 + 100).innerText !== "S") document.getElementById(nPit - 4 + 100).innerHTML=temp;
        if((document.getElementById(nPit + 200).innerText !== "S") && (document.getElementById(nPit + 200).innerText !== "_"))
          document.getElementById(nPit + 200).innerHTML=temp;
        if((document.getElementById(nPit + 300).innerText !== "S") && (document.getElementById(nPit + 300).innerText !== "|"))
          document.getElementById(nPit + 300).innerHTML=temp;
        break;
  }
}  

function verificaMundo(){
  for (var i=100; i<=115;i++){
    if(document.getElementById(i).innerText=="*")
      continue;
    else if(document.getElementById(i).innerText=="p?"){
      verificaMundoSeguro(i);
      continue;
    }
    else if(document.getElementById(i).innerText=="M?"){
      verificaMundoSeguro(i);
      continue;
    }
    else if(document.getElementById(i).innerText=="pM?"){
      verificaMundoSeguro(i);
      continue;    
    }
  }
}
function verificaMundoSeguro(nSeguro){
  count = 0;
  switch(nSeguro){
    case 100:
        if(document.getElementById(nSeguro + 1).innerText == "S"){
          count +=1;
          if(document.getElementById(nSeguro + 4).innerText == "S") 
          count +=1;
        } 
        if(count <= 2){
          if(document.getElementById(nSeguro).innerText == "M?")
            document.getElementById(nSeguro).innerHTML = "M";
          else if(document.getElementById(nSeguro).innerText == "p?")
          document.getElementById(nSeguro).innerHTML = "P";
        }
        break;
      
    case 101:
      if(document.getElementById(nSeguro + 1).innerText == "S")
        count +=1;
      if(document.getElementById(nSeguro - 1).innerText == "S") 
        count +=1;
      if(document.getElementById(nSeguro + 4).innerText == "S") 
          count +=1;
      
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";
      }
    break;

    case 102:
      if(document.getElementById(nSeguro + 1).innerText == "S")
        count +=1;
      if(document.getElementById(nSeguro - 1).innerText == "S") 
        count +=1;
      if(document.getElementById(nSeguro + 4).innerText == "S") 
        count +=1;
      
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";  
      }  
      break;

    case 103:
      if(document.getElementById(nSeguro - 1).innerText == "S"){
        count +=1;
        if(document.getElementById(nSeguro + 4).innerText == "S") 
        count +=1;
      } 
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";
      }
      break;   

    case 104:
      if(document.getElementById(nSeguro + 1).innerText == "S")
        count +=1;
      if(document.getElementById(nSeguro + 4).innerText == "S") 
        count +=1;
      if(document.getElementById(nSeguro - 4).innerText == "S") 
        count +=1;
      
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";  
      }  
      break;

    case 105:
      if(document.getElementById(nSeguro + 1).innerText == "S")
        count +=1;
      if(document.getElementById(nSeguro - 1).innerText == "S") 
        count +=1;
      if(document.getElementById(nSeguro + 4).innerText == "S") 
        count +=1;
      if(document.getElementById(nSeguro - 4).innerText == "S") 
        count +=1;
       
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";  
      }  
      break;    

    case 106:
      if(document.getElementById(nSeguro + 1).innerText == "S")
        count +=1;
      if(document.getElementById(nSeguro - 1).innerText == "S") 
          count +=1;
      if(document.getElementById(nSeguro + 4).innerText == "S") 
            count +=1;
      if(document.getElementById(nSeguro - 4).innerText == "S") 
              count +=1;
       
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
          document.getElementById(nSeguro).innerHTML = "P";  
      }  
      break;   

    case 107:

      if(document.getElementById(nSeguro - 1).innerText == "S") 
        count +=1;
      if(document.getElementById(nSeguro + 4).innerText == "S") 
          count +=1;
      if(document.getElementById(nSeguro - 4).innerText == "S") 
            count +=1;

      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";  
      }  
      break;      
    
    case 108:
      if(document.getElementById(nSeguro + 1).innerText == "S") 
      count +=1;
      if(document.getElementById(nSeguro + 4).innerText == "S") 
        count +=1;
      if(document.getElementById(nSeguro - 4).innerText == "S") 
          count +=1;
      
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";  
      } 
      break; 

    case 109:
    if(document.getElementById(nSeguro + 1).innerText == "S")
      count +=1;
    if(document.getElementById(nSeguro - 1).innerText == "S") 
        count +=1;
    if(document.getElementById(nSeguro + 4).innerText == "S") 
          count +=1;
    if(document.getElementById(nSeguro - 4).innerText == "S") 
            count +=1;
     
    if(count >= 2){
      if(document.getElementById(nSeguro).innerText == "M?")
        document.getElementById(nSeguro).innerHTML = "M";
      else if(document.getElementById(nSeguro).innerText == "p?")
      document.getElementById(nSeguro).innerHTML = "P";  
    }  
    break;   

    case 110:
      if(document.getElementById(nSeguro + 1).innerText == "S")
        count +=1;
      if(document.getElementById(nSeguro - 1).innerText == "S") 
        count +=1;
      if(document.getElementById(nSeguro + 4).innerText == "S") 
        count +=1;
      if(document.getElementById(nSeguro - 4).innerText == "S") 
        count +=1;
      
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";  
      }  
      break;  
       
    case 111:
       
      if(document.getElementById(nSeguro - 1).innerText == "S")
        count +=1;
      if(document.getElementById(nSeguro + 4).innerText == "S") 
          count +=1;
      if(document.getElementById(nSeguro - 4).innerText == "S") 
            count +=1;
       
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";  
      }  
      break; 

    case 112:
      if(document.getElementById(nSeguro + 1).innerText == "S"){
        count +=1;
        if(document.getElementById(nSeguro - 4).innerText == "S") 
        count +=1;
      } 
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";
      }
      break;

    case 113:
      if(document.getElementById(nSeguro + 1).innerText == "S")
        count +=1;
        if(document.getElementById(nSeguro - 1).innerText == "S") 
        count +=1;
        if(document.getElementById(nSeguro - 4).innerText == "S") 
          count +=1;
       
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";  
      }  
      break;

    case 114:
      if(document.getElementById(nSeguro + 1).innerText == "S")
        count +=1;
        else if(document.getElementById(nSeguro - 1).innerText == "S") 
        count +=1;
        if(document.getElementById(nSeguro - 4).innerText == "S") 
          count +=1;
       
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";  
      }  
      break;

    case 115:
      if(document.getElementById(nSeguro - 1).innerText == "S"){
        count +=1;
        if(document.getElementById(nSeguro - 4).innerText == "S") 
        count +=1;
      } 
      if(count >= 2){
        if(document.getElementById(nSeguro).innerText == "M?")
          document.getElementById(nSeguro).innerHTML = "M";
        else if(document.getElementById(nSeguro).innerText == "p?")
        document.getElementById(nSeguro).innerHTML = "P";
      }
      break;
  } 
}   
 