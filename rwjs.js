var fs = require("fs");

let a = 3;
let i = 0;
let path = [];
var root, out, file;

function save(file, value){
 
  // Verifica se o arquivo passado no argumento não possui a extensão json
  if(file.split('.').pop()!="json"){ 
    file = file + file.split('.').slice(0, -1).join('.')+".json"
  }
  fs.writeFileSync(file, JSON.stringify(value), {encoding: null});

  return;
}

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

function del(type, fieldname) {
  console.log("Arquivo:")
  console.log(root)
  if (type == 'object'){
    delete out[fieldname]
    
  }else if (type == 'array'){ 

  out.splice(fieldname, 1)
}
  console.log("Arquivo atualizado:")
  console.log(root)	
  // Salva o arquivo local .json
  fs.writeFileSync(file, JSON.stringify(root), {encoding: null});
  return;
}

function insert(type, fieldname, valuetype, value) {
  if (type == 'object'){
    console.log("em Objeto")
    console.log("Arquivo:")
    console.log(root)
    switch(valuetype) {
	case 'object':
	  console.log("object")
	  out[fieldname] = {}
	break;
	case 'array':
	  console.log("array")
	  console.log(root)
	  out[fieldname] = []
	break;
	case 'string':
	  console.log("string:"+value)
	  console.log(root)
	  out[fieldname] = value
	break;
	case 'number':
	  console.log("number:"+value)
	  out[fieldname] = Number(value)
	break;
	case 'bool':
	console.log("bool:"+value)
	  console.log("number:"+value)
	  out[fieldname] = JSON.parse(value)
	break;
	case 'null':
	  console.log("null")
	  out[fieldname] = null;
	default:
	// code block
      }
    
  }else if (type == 'array'){ 
    console.log("em Vetor")
    console.log("Arquivo:")
    console.log(root)
    switch(valuetype) {
	case 'object':
	  console.log("object")
	  out[fieldname] = {}
	break;
	case 'array':
	  console.log("array")
	  console.log(root)
	  out[fieldname] = []
	break;
	case 'string':
	  console.log("string:"+value)
	  console.log(root)
	  out[fieldname] = value
	break;
	case 'number':
	  console.log("number:"+value)
	  out[fieldname] = Number(value)
	break;
	case 'bool':
	console.log("bool:"+value)
	  console.log("number:"+value)
	  out[fieldname] = JSON.parse(value)
	break;
	case 'null':
	  console.log("null")
	  out[fieldname] = null;
	default:
	// code block
      }
  }
  console.log("Arquivo atualizado:")
  console.log(root)	
  // Salva o arquivo local .json
  fs.writeFileSync(file, JSON.stringify(root), {encoding: null});
  return;
}




while (process.argv[a]){
  
  if (process.argv[a] == 'init'){ // inicializa o arquivo JSON com as opçôes {} ou []
  
  
  if (process.argv[a+1] == {} || process.argv[a+1] == []){
    save(process.argv[2], process.argv[a+1])
    console.log(process.argv[a+1]);
  }else{
    console.log("Formato minimo de inicialização invalido");
  }


  }else if (process.argv[a] == 'field' || process.argv[a] == 'index'){ // constroi o vetor com o path
		i++;
		path[i] = process.argv[a+1];
	}else if (process.argv[a] == 'read'){ // habilita o modo leitura e exibe o json
	/* for(let c=1; c<=i; c++){
		out = out[path[c]];
		};*/
		recompose(path);
		console.log(out);// exibe o json na tela
		}else if (process.argv[a] == 'write'){ // habilita o modo edicao
			recompose(path);
			switch(process.argv[a+2]) {
				case 'ins':
				console.log("ins");
				insert(process.argv[a+1], process.argv[a+3],process.argv[a+4],process.argv[a+5]);
				break;
				case 'set':
				console.log("set");
				insert(process.argv[a+1], process.argv[a+3],process.argv[a+4],process.argv[a+5]);
				break;
				case 'del':
				console.log("del")
				del(process.argv[a+1], process.argv[a+3]);
				break;
				default:
				// code block
			}
       
		}
  a++;
}
