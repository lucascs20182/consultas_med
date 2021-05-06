import {openDatabase} from 'react-native-sqlite-storage';

export default class MedicoRepository {

  DBNAME = 'app.db';
  CREATE =
    'CREATE TABLE IF NOT EXISTS medico(id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(100), sobrenome VARCHAR(100), especialidade VARCHAR(100), crm VARCHAR(100))';

  SELECT = 'SELECT * FROM medico';

  INSERT = 'INSERT INTO medico (nome, sobrenome, especialidade, crm) values (?, ?, ?, ?)';

  UPDATE = 'UPDATE medico SET nome = ?, sobrenome = ?, especialidade = ?, crm = ? WHERE id = ?';

  DELETE = 'DELETE FROM medico WHERE id = ?';

  Retrieve(onSuccess, onError) {

    var db = openDatabase({name: this.DBNAME});
    
    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(this.SELECT, [], onSuccess, onError);
    });

  }

  Save(medico, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(
        this.INSERT,
        [medico.nome, medico.sobrenome, medico.especialidade, medico.crm],
        onSuccess,
        onError,
      );
    });
  }

  Edit(medico, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(
        this.UPDATE,
        [medico.nome, medico.sobrenome, medico.especialidade, medico.crm, medico.id],
        onSuccess, 
        onError
      );
    });
  }

  Delete(medico, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(this.DELETE, [medico.id], onSuccess, onError);
    });
  }
}
