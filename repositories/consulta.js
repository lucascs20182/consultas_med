import {openDatabase} from 'react-native-sqlite-storage';

export default class ConsultaRepository {

  DBNAME = 'app.db';
  CREATE =
    'CREATE TABLE IF NOT EXISTS consulta(id INTEGER PRIMARY KEY AUTOINCREMENT, idPaciente INTEGER, idMedico INTEGER, dataConsulta VARCHAR(40) ,FOREIGN KEY(idPaciente) REFERENCES paciente(id), FOREIGN KEY(idMedico) REFERENCES medico(id))';

  SELECT = 'SELECT * FROM consulta';

  INSERT = 'INSERT INTO consulta (idPaciente, idMedico, dataConsulta) values (?, ?, ?)';

  UPDATE = 'UPDATE consulta SET idPaciente = ?, idMedico = ?, dataConsulta = ? WHERE id = ?';

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
        [consulta.idPaciente, consulta.idMedico, consulta.dataConsulta],
        onSuccess,
        onError,
      );
    });
  }

  Edit(consulta, onSuccess, onError) {
    var db = openDatabase({name: this.DBNAME});

    db.transaction((transaction) => {
      transaction.executeSql(this.CREATE, []);
      transaction.executeSql(
        this.UPDATE,
        [consulta.idPaciente, consulta.idMedico, consulta.dataConsulta, consulta.id], 
        onSuccess, 
        onError
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
