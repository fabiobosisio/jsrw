var fs = require("fs");

if (process.argv[2]){
  var jsonData = fs.readFileSync(process.argv[2]+'.json', "utf8");
}else{
    console.log("Inclua o nome do arquivo logo apos o comando\n");
    return;
  }

let a = 3;
let i = 0;
let path = [];
var out = JSON.parse(jsonData);

function recompose(path) {
  for(let c=1; c<=i; c++){
    out = out[path[c]];
  };
  return;
}


function insert(type, fieldname, valuetype, value) {
  if (type == 'object'){
    console.log("em Objeto")
    switch(valuetype) {
	case 'object':
	  console.log("object")
	break;
	case 'array':
	console.log("array")
	break;
	case 'string':
	console.log("string:"+value)
	var newData = {[fieldname]:value}
	console.log(newData)
	console.log(out)
	break;
	case 'number':
	console.log("number:"+value)
	break;
	case 'bool':
	console.log("bool:"+value)
	break;
	case 'null':
	console.log("null")
	default:
	// code block
      }
    
  }else if (type == 'array'){ 
    console.log("em Vetor")
    switch(valuetype) {
	case 'object':
	console.log("object")
	break;
	case 'array':
	console.log("array")
	break;
	case 'string':
	console.log("string:"+value)
	break;
	case 'number':
	console.log("number:"+value)
	break;
	case 'bool':
	console.log("bool:"+value)
	break;
	case 'null':
	console.log("null")
	default:
	// code block
      }
  }
  return;
}




while (process.argv[a]){
  if (process.argv[a] == 'field' || process.argv[a] == 'index'){ // constroi o vetor com o path
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
	console.log("ins")
	insert(process.argv[a+1], process.argv[a+3],process.argv[a+4],process.argv[a+5])
	break;
	case 'set':
	console.log("set")
	break;
	case 'del':
	console.log("del")
	break;
	default:
	// code block
      }
       
  }
  a++;
}
