import {openDatabase} from 'react-native-sqlite-storage';

export default class PacienteRepository {

  DBNAME = 'app.db';
  CREATE =
    'CREATE TABLE IF NOT EXISTS paciente(id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(100), sobrenome VARCHAR(100), cpf VARCHAR(11),  dataNascimento VARCHAR(10))';

  SELECT = 'SELECT * FROM paciente';

  INSERT = 'INSERT INTO paciente (nome, sobrenome, cpf, dataNascimento) values (?, ?, ?, ?)';

  DELETE = 'DELETE FROM paciente WHERE id = ?';

  Retrieve(onSuccess, onError) {

    var db = openDatabase({name: this.DBNAME});
    
    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(this.SELECT, [], onSuccess, onError);
    });

  }

  Save(paciente, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(
        this.INSERT,
        [paciente.nome, paciente.sobrenome, paciente.cpf, paciente.dataNascimento],
        onSuccess,
        onError,
      );
    });
  }

  Delete(paciente, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});
    console.log("iniciando transaction")
    db.transaction((transaction) => {
      console.log("dentro da transaction")
      transaction.executeSql(this.DELETE, [paciente.id], onSuccess, onError);
    });

    console.log("finalizando delete")
  }
}
