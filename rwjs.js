//***************************** Variáveis Globais *****************************//

var fs = require("fs"); // file system
let a = 3; // Contador para navegação nos argumentos de linha de comando
let i = 0; // Contador do vetor do path
let path = []; // Vetor para armazenar o path
var root; // Armazena a raiz do arquivo
var out; // Armazena o campo indicado no path a ser acessado
var file; //  Armazena o Nome do arquivo a ser lido/salvo
let verbose = false // Ativa (true) e desativa (false) o modo verboso

//***************************** Funções *****************************//

//Função para exibir o manual:
function help() {

console.log("RWJS v0.1.0")
console.log("")
console.log("RWJS is a command line JSON reader and editor")
console.log("")
console.log("Usage:")
console.log("    node rwjs.js <file> init <start>")
console.log("    node rwjs.js <file> <path>... <mode> <op>")
console.log("    node rwjs.js help")
console.log("")
console.log("Help:")
console.log("    Displays this manual")
console.log("")
console.log("File:")
console.log("    Filename")
console.log("")
console.log("Start:")
console.log("    {}    Starts with an empty object")
console.log("    |")
console.log("    []    Starts with an empty array")
console.log("")
console.log("Path:")
console.log("    field <fld>    Indicates the field to be accessed")
console.log("    |")
console.log("    index <idx>    Indicates the index of the accessed field, if it is an array type field")
console.log("")
console.log("Mode:")
console.log("    read           Enables read mode, in which case it is not necessary to include operations")
console.log("    |")
console.log("    write          Enables editor mode, it is necessary to include the desired operation (<op>)")
console.log("")
console.log("Ops:")
console.log("    object ins <fld>:<value>      Inserts a field with value in the object accessed by path")
console.log("    object set <fld>:<value>      Modifies a field with value in the object accessed by path")
console.log("    object del <fld>              Delete a field with value in the object accessed by path")
console.log("    |")
console.log("    array ins <idx>,<value>       Inserts a value at the indicated index of the array accessed by path ")
console.log("    array set <idx>,<value>       Modifies a value at the indicated index of the array accessed by path")
console.log("    array del <idx>               Delete a value at the indicated index of the array accessed by path")
console.log("")
console.log("    Value:")
console.log("        object                  an empty object (dictionary)")
console.log("        array                   an empty array (list)")
console.log("        string <str>            a string <str>")
console.log("        number <num>            a number <num>")
console.log("        bool (true | false)     a boolean")
console.log("        null                    a null value")
console.log("")
console.log("More Information:")
console.log("")
console.log("    https://github.com/fabiobosisio/rwjs")
console.log("")
console.log("    Please report bugs at <https://github.com/fabiobosisio/rwjs/blob/master/README.md>")
console.log("")
}

// Função de salvar/sobrescrever arquivo local
function save(file,value){
  // Verifica se o arquivo passado no argumento não possui a extensão json
  if(file.split('.').pop()!="json"){ 
    file = file + file.split('.').slice(0, -1).join('.')+".json"
  }
  fs.writeFileSync(file, JSON.stringify(value), {encoding: null});
  console.log("Arquivo salvo com sucesso");
  return;
}

// Função de leitura do arquivo json e recomposição do path
function recompose(path){
  file = process.argv[2];  
  // Verifica se o arquivo passado no argumento não possui a extensão json
  if(file.split('.').pop()!="json"){ 
    file = file + file.split('.').slice(0, -1).join('.')+".json"
  }
  // Verifica se o arquivo existe localmente
  if(!fs.existsSync(file)) {
    console.log("Arquivo inexistente");
    out = ''
  }
  else {
    // Carrega o arquivo e converte para JSON
    root = out = JSON.parse(fs.readFileSync(file, "utf8"));
  }
  // recompoe o path
  for(let c=1; c<=i; c++){
    out = out[path[c]];
  };
  return;
}

// Função de exclusão de elementos
function del(type, fieldname) {
  console.log("Arquivo anterior:")
  show(root);
  if (type == 'object'){
    delete out[fieldname];
  }else if (type == 'array'){ 
    out.splice(fieldname, 1)
  }
  console.log("Arquivo atualizado:")
  show(root);	
  // Salva o arquivo local .json
  save(file,root);
  return;
}

// Função de inserção/edição de valores
function insert(type, fieldname, valuetype, value) {
  if (type == 'object'){
    if(verbose) console.log("em Objeto")
    if(verbose) console.log("Arquivo:")
    if(verbose) show(root);
    switch(valuetype) {
	case 'object':
	  if(verbose) console.log("object")
	  out[fieldname] = {}
	break;
	case 'array':
	  if(verbose) console.log("array")
	  out[fieldname] = []
	break;
	case 'string':
	  if(verbose) console.log("string:"+value)
	  out[fieldname] = value
	break;
	case 'number':
	  if(verbose) console.log("number:"+value)
	  out[fieldname] = Number(value)
	break;
	case 'bool':
	  if(verbose) console.log("bool:"+value)
	  out[fieldname] = JSON.parse(value)
	break;
	case 'null':
	  if(verbose) console.log("null")
	  out[fieldname] = null;
	default:
      }
    
  }else if (type == 'array'){ 
    if(verbose) console.log("em Vetor")
    if(verbose) console.log("Arquivo:")
    if(verbose) show(root);
    switch(valuetype) {
	case 'object':
	  if(verbose) console.log("object")
	  out[fieldname] = {}
	break;
	case 'array':
	  if(verbose) console.log("array")
	  out[fieldname] = []
	break;
	case 'string':
	  if(verbose) console.log("string:"+value)
	  out[fieldname] = value
	break;
	case 'number':
	  if(verbose) console.log("number:"+value)
	  out[fieldname] = Number(value)
	break;
	case 'bool':
	  if(verbose) console.log("bool:"+value)
	  out[fieldname] = JSON.parse(value)
	break;
	case 'null':
	  if(verbose) console.log("null")
	  out[fieldname] = null;
	default:
      }
  }
  console.log("Arquivo atualizado:")
  show(root);	
  // Salva o arquivo local .json
  save(file,root)
  return;
}

// Função de exibição do JSON formatado
function show(out){
  console.dir(out, { depth: null} );
  return;
}

//***************************** Módulo Principal *****************************//
// Exibe o manual
if (process.argv[2] == 'help' || process.argv[2] == 'Help' || process.argv[2] == 'h' || process.argv[2] == null){
  help();
}
// Main
while (process.argv[a]){
  if (process.argv[a] == 'init'){ // inicializa o arquivo JSON com as opçôes {} ou []
      const tempinit = JSON.parse(process.argv[a+1]);
      if (JSON.stringify(tempinit) == "{}" || JSON.stringify(tempinit) == "[]"){
	  save(process.argv[2], tempinit)
	  if(verbose) console.log(tempinit);
      }else{
	  console.log("Formato minimo de inicializacao invalido");
      }	
  }else if (process.argv[a] == 'field' || process.argv[a] == 'index'){ // constroi o vetor com o path
      i++;
      path[i] = process.argv[a+1];
  }else if (process.argv[a] == 'read'){ // habilita o modo leitura e exibe o json
      recompose(path);
      show(out);// exibe o json na tela
  }else if (process.argv[a] == 'write'){ // habilita o modo edicao
      recompose(path); // Le o arquivo e recompoe o path
      switch(process.argv[a+2]) {
	  case 'ins':
	      if(verbose) console.log("ins");
	      insert(process.argv[a+1], process.argv[a+3],process.argv[a+4],process.argv[a+5]);
	  break;
	  case 'set':
	      if(verbose) console.log("set");
	      insert(process.argv[a+1], process.argv[a+3],process.argv[a+4],process.argv[a+5]);
	  break;
	  case 'del':
	      if(verbose) console.log("del")
	      del(process.argv[a+1], process.argv[a+3]);
	  break;
	  default:
      }
  }  
  a++; // Avança no path
}
