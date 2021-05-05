import {openDatabase} from 'react-native-sqlite-storage';

export default class ConsultaRepository {

  DBNAME = 'app.db';
  CREATE =
    'CREATE TABLE IF NOT EXISTS consulta(id INTEGER PRIMARY KEY AUTOINCREMENT, id_paciente INTEGER, id_medico INTEGER, dataConsulta VARCHAR(40) ,FOREIGN KEY(id_paciente) REFERENCES paciente(id), FOREIGN KEY(id_medico) REFERENCES medico(id))';

  SELECT = 'SELECT * FROM consulta';

  INSERT = 'INSERT INTO consulta (id_paciente, id_medico, dataConsulta) values (?, ?, ?)';

  DELETE = 'DELETE FROM consulta WHERE id = ?';

  Retrieve(onSuccess, onError) {

    var db = openDatabase({name: this.DBNAME});
    
    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(this.SELECT, [], onSuccess, onError);
    });

  }

  Save(consulta, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(
        this.INSERT,
        [consulta.id_paciente, consulta.id_medico, consulta.dataConsulta],
        onSuccess,
        onError,
      );
    });
  }

  Delete(consulta, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(this.DELETE, [consulta.id], onSuccess, onError);
    });
  }
}
